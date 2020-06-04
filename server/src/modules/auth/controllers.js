export const logout = (req, res) => {
  req.session.destroy(
    () => res.json()
  );
}