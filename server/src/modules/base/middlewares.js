export const isAuth = (req, res, next) => {
  if (req.user) next();
  else res.status(401).json({ error: 'User is unauthorized' })
}