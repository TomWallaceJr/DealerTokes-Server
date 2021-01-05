const express = require('express')
const LanguageService = require('./language-service')
const { LinkedList, toArray } = require("../../linkedList")
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()

languageRouter
  // requires authentication (Bearer token)
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    // implement me
    // want to return nextWord, correctCount, wrongCount, and totalScore as object 
    res.send('implement me!')
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    // implement me
    // user posting a guess
    // want to return nextWord, correctcount, wrongcount, totalScore, answer, and iscorrect as object
    res.send('implement me!')
  })

module.exports = languageRouter
