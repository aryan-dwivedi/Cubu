import { User } from '../../../entities/User';
import { ResolverMap } from '../../../types/graphql-utils';
import { formatYupError } from '../../../utils/formatYupError';
import { sendEmail } from '../../../utils/sendEmail';
import { validUserSchema } from '../../../utils/userValidator';
import { createConfirmEmailLink } from './createConfirmEmailLink';
import { duplicateEmail } from './errorMessages';

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args, { redis, url }) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { name, email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ['id']
      });

      if (userAlreadyExists) {
        return [
          {
            path: 'email',
            message: duplicateEmail
          }
        ];
      }

      const user = await User.create({
        name,
        email,
        password
      });

      await user.save();

      if (process.env.NODE_ENV !== 'test') {
        await sendEmail(email, await createConfirmEmailLink(url, user.id, redis), 'Confirm email');
      }

      return [
        {
          path: 'Submit',
          message: 'Confirmation mail sent'
        }
      ];
    }
  }
};
