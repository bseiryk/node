export const isAuth = (req, res, next) => {
  if (req.user) next();
  else res.status(401).json({ error: 'User is unauthorized' })
}

export const AEH = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error)
  }
};