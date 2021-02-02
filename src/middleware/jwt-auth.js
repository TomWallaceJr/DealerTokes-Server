const { JsonWebTokenError } = require('jsonwebtoken')
const AuthService = require('../auth/auth-service')
const WorkdayService = require('../workday/workday-service')

async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''

  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken)

    const user = await AuthService.getUserWithUserName(
      req.app.get('db'),
      payload.sub,
    )

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized request' })
    }

    // get user workdays and send them here
    // const user_id = user.user_id
    // const workdays = WorkdayService.getWorkdaysById(
    //   req.app.get('db'),
    //   user_id
    // )


    req.user = user
    // req.workdays = workdays
    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      return res.status(401).json({ error: 'Unauthorized request' })

    next(error)
  }
}

module.exports = {
  requireAuth,
}
