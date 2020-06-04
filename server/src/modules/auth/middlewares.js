
import { User } from './models';

export const googleAuthCallback = async (accessToken, refreshToken, profile, next) => {
  // TODO validate with joi
  const pprofile = profile._json;
  const user = {
    email: pprofile.email,
    googleId: pprofile.sub,
    name: pprofile.name,
    surname: pprofile.given_name,
  };
  let result;
  try {
    result = await User.findOne({ email: user.email });
    if (!result) result = await User.create(user);
    result = result.toObject();

    next(null, result);
  } catch (error) {
    next(error);
  }
};