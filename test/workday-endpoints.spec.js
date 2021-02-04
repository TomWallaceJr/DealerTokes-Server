const app = require('../src/app')
const helpers = require('./helpers')

describe('Language Endpoints', function () {
  let db

  const testUsers = helpers.makeUsersArray()
  const [testUser] = testUsers
  const [testWorkdays] = helpers.makeWorkdays()

  before('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))


  describe(`GET /api/workdays`, () => {
    it(`responds with 201 and all workdays`, () => {
      return supertest(app)
        .get(`/api/workdays`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.keys('workdays')

          expect(res.body.language).to.have.property('id', testUser.id)
          expect(res.body.language).to.have.property('hours', testUser.name)
          expect(res.body.language).to.have.property('user_id', testUser.user_id)
          expect(res.body.language).to.have.property('tokes', testUser.tokes)
          expect(res.body.language).to.have.property('downs', testUser.downs)
            .which.is.not.null
          expect(res.body.language).to.have.property('notes', testUser.notes)
        })
    })
  })
})



describe(`POST /api/workdays`, () => {
  const [testWorkdays] = helpers.makeWorkdays()
  const testUsers = helpers.makeUsersArray()
  const [testUser] = testUsers


  before('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  beforeEach('insert users, languages and words', () => {
    return helpers.seedUsersWorkdays(
      db,
      testUsers,
      testWorkdays
    )
  })

  it.skip(`responds with 400 required error when tokes is missing`, () => {
    const postBody = {
      randomField: 'test random field',
    }

    return supertest(app)
      .post(`/api/workdays`)
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .send(postBody)
      .expect(400, {
        error: `Missing 'tokes' in request body`,
      })
  })


  context(`Given correct data`, () => {
    let correctPostBody = {
      date: '2021-1-2',
      downs: '5',
      tokes: '100',
      notes: 'yeehaw',
      hours: '4',
      user_id: 1
    }
    return supertest(app)
      .post(`/api/workdays`)
      .set('Authorization', helpers.makeAuthHeader(testUser))
      .send(correctPostBody)
      .expect(200)
      .expect({
        date: '2021-1-2',
        downs: '5',
        tokes: '100',
        notes: 'yeehaw',
        hours: '4',
        user_id: 1
      })
  })
})


