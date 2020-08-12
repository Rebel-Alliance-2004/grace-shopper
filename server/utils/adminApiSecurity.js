const adminApiSecurityCheck = (req) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new Error('unauthorized')
  }
}

const accessDeniedResponse = (err, res) => {
  if (err.message === 'unauthorized') {
    res.sendStatus(401)
  } else {
    res.sendStatus(500)
  }
}

module.exports = {
  adminApiSecurityCheck,
  accessDeniedResponse,
};