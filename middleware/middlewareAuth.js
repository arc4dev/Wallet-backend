import passport from '../config/config-passport.js';
import User from '../service/schemas/user.js';

export const auth = async (req, res, next) => {
  try {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      const allUsers = await User.find();
      const isToken = allUsers.some(user => user.token === token);
      if (!isToken) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          data: 'No Authorization',
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'An error occurred during authentication.',
    });
  }
};
