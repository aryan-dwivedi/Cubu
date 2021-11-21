import { createWriteStream } from 'fs';
import * as shortid from 'shortid';

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  const extension = mimetype.split('/')[1];
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return await new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject)
  );
};

export const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
  return id;
};
