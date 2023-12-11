import { Readable } from 'stream';
import { cloudinary } from '../configs';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError } from '../errors';

async function uploadImageToCloudinary(image: Buffer): Promise<UploadApiResponse> {
  const bufferStream = new Readable();
  bufferStream.push(image);
  bufferStream.push(null);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'iu-quiz-app',
        unique_filename: true,
        allowed_formats: ['png', 'jpg'],
        resource_type: 'image'
      },
      (error, result) => {
        if (error || !result) {
          reject(new BadRequestError('Upload fehlgeschlagen'));
        } else {
          resolve(result);
        }
      }
    );

    bufferStream.pipe(uploadStream);
  });
}

export { uploadImageToCloudinary };
