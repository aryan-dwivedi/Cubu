import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';
import { genSchema } from '../utils/genSchema';

const typescriptTypes = generateNamespace('GQL', genSchema());

fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), typescriptTypes, err => {
  // eslint-disable-next-line no-console
  console.log(err);
});
