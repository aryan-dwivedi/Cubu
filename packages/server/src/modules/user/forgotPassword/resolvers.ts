import bcrypt from 'bcrypt';
import { FORGET_PASSWORD_PREFIX } from '../../../constants';
import { User } from '../../../entities/User';
import { ResolverMap } from '../../../types/graphql-utils';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { formatYupError } from '../../../utils/formatYupError';
import { sendEmail } from '../../../utils/sendEmail';
import { changePasswordSchema } from '../../../utils/userValidator';
import { expiredKeyError, mailSent, userNotFoundError } from './errorMessages';

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (_, { email }, { redis }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return userNotFoundError;
      }
      const url = await createForgotPasswordLink(process.env.FRONTEND_HOST as string, user.id, redis);
      await sendEmail(email, url, 'Reset Password');
      return mailSent;
    },
    forgotPasswordChange: async (_, { newPassword, key }, { redis }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const redisKey = `${FORGET_PASSWORD_PREFIX}${key}`;

      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: 'newPassword',
            message: expiredKeyError
          }
        ];
      }

      try {
        await changePasswordSchema.validate({ newPassword }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
