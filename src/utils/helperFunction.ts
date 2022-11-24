import sharp, { OutputInfo } from 'sharp';

export const createResizedImage = async (
  imagePath: string,
  width: number,
  height: number,
  resizedImgPath: string
): Promise<OutputInfo> => {
  const resizedImage = await sharp(imagePath)
    .resize(width, height)
    .toFile(resizedImgPath);
  return resizedImage;
};
