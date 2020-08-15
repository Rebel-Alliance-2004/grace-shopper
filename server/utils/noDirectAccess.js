const noDirectAccess = (req, res, next) => {
  if (!req.headers.referer) {
    // boring
    // res.sendStatus(401);
    // more fun
    res.redirect('https://youtu.be/RZ1pQZXK3dM?t=181');
  } else {
    next();
  }
}

module.exports = noDirectAccess;