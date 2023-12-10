import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { cloudinary, db } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { validate } from '../../utils/validate';
import { StudentProfile } from '@prisma/client';
import { uploadImageToCloudinary } from '../../utils/helpers';
import { sendContactFormMail } from '../../utils/emails';

const studentProfileDataIncludeSchema = {
  profileImage: true,
  student: {
    select: {
      email: true,
      registrationDate: true
    }
  }
};

/**
 * ________________________________________________________________
 * @route api/v1/student/:studentsIds
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findStudentsByIds(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const studentIdsParam: string = req.params.studentsIds;
  const studentsIds: string[] = studentIdsParam.split(',');

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Students Ids', studentsIds);

  const studentsProfiles = await db.studentProfile.findMany({
    where: { studentId: { in: studentsIds } },
    include: studentProfileDataIncludeSchema
  });

  if (!studentsProfiles) {
    throw new NotFoundError('Keine Studenten gefunden');
  }

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, '', studentsProfiles));
}

/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateStudent(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { name, courseOfStudy, location, xingUrl, linkedinUrl } = req.body;

  const student = await db.student.findUnique({
    where: { id: studentId }
  });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const updateData: Partial<StudentProfile> = {};

  validate.max('Name', name, 20);
  updateData.name = validate.min('Name', name, 2);
  updateData.location = validate.max('Ort', location, 20, false);
  updateData.courseOfStudy = courseOfStudy;
  updateData.linkedinUrl = validate.url('linkedin', linkedinUrl);
  updateData.xingUrl = validate.url('xing', xingUrl);

  const updatedStudent = await db.studentProfile.update({
    where: { studentId: studentId },
    data: updateData,
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Änderungen gespeichert', updatedStudent));
}

/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function deleteStudent(req: Request, res: Response) {
  const studentId = req.auth?.studentId;

  const studentProfile = await db.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const profileImagePublicId = studentProfile?.profileImage?.publicId;

  if (profileImagePublicId) {
    await cloudinary.uploader.destroy(profileImagePublicId);
  }

  await db.student.delete({
    where: { id: studentId }
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Schade, dass Sie gehen! Wir vermissen Sie bereits'
      )
    );
}

/**
 * ________________________________________________________________
 * @route api/v1/student/image
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function uploadStudentProfileImage(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const profileImage = req.file;

  const studentProfile = await db.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  if (!profileImage) {
    throw new BadRequestError('Kein Bild zum Hochladen');
  }

  const imageId = studentProfile?.profileImage?.publicId;

  if (imageId) {
    await cloudinary.uploader.destroy(imageId);
  }

  const { secure_url, public_id } = await uploadImageToCloudinary(profileImage.buffer);

  if (!studentProfile.profileImage) {
    await db.profileImage.create({
      data: {
        profileId: studentProfile.id,
        url: '',
        publicId: ''
      }
    });
  }

  const updatedStudent = await db.studentProfile.update({
    where: { studentId: studentId },
    data: {
      profileImage: {
        update: {
          publicId: public_id,
          url: secure_url
        }
      }
    },
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Profilbild erfolgreich hochgeladen',
        updatedStudent
      )
    );
}

/**
 * ________________________________________________________________
 * @route api/v1/student/image
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function deleteStudentProfileImage(req: Request, res: Response) {
  const studentId = req.auth?.studentId;

  const studentProfile = await db.studentProfile.findFirst({
    where: { studentId: studentId },
    include: {
      profileImage: true
    }
  });

  if (!studentProfile) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const publicId = studentProfile?.profileImage?.publicId;

  if (!publicId) {
    throw new BadRequestError('Kein Bild zum Löschen');
  }

  await cloudinary.uploader.destroy(publicId);

  const updatedStudent = await db.studentProfile.update({
    where: { studentId: studentId },
    data: {
      profileImage: {
        update: {
          publicId: '',
          url: ''
        }
      }
    },
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(StatusCodes.OK, 'Profilbild erfolgreich gelöscht', updatedStudent)
    );
}

/**
 * ________________________________________________________________
 * @route api/v1/student/send-email
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function sendContactEmail(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { subject, description } = req.body;

  const student = await db.student.findUnique({
    where: { id: studentId }
  });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const senderEmail = student.email;

  await sendContactFormMail({
    senderEmail: senderEmail,
    subject: subject,
    description: description
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Bug Report Email wurde versendet'));
}

export {
  findStudentsByIds,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage,
  sendContactEmail
};
