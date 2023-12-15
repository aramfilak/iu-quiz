import { Readable } from 'stream';
import { cloudinary } from '../configs';
import { UploadApiResponse } from 'cloudinary';
import { BadRequestError } from '../errors';
import { QuizScore } from '@prisma/client';

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

function getMinScore(scores: QuizScore[]) {
  return scores.reduce(
    (worstScore, currentScore) =>
      currentScore.score < worstScore.score ? currentScore : worstScore,
    scores[0]
  );
}

function calculateScore(numberOfCorrectAnswers: number, takenTimeInSec: number) {
  return (numberOfCorrectAnswers / takenTimeInSec) * 100;
}

export { uploadImageToCloudinary, getMinScore, calculateScore };
