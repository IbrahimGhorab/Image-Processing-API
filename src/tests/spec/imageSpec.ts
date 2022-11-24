import path from 'path';
import { createResizedImage } from '../../utils/helperFunction';

describe('test image resize', () => {
  it('it should return image path', () => {
    expect(async () => {
      await createResizedImage(
        path.resolve('./') + '/public/images/1.jpg',
        400,
        400,
        path.resolve('./') + '/public/thumbnail/1-400x400.jpg'
      );
    }).not.toThrow();
  });
});
