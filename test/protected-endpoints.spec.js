// const app = require('../src/app')
// const helpers = require('./helpers')

// describe('Protected Endpoints', function () {
//     let db

//     const testUsers = helpers.makeUsersArray()
//     const [testUser] = testUsers
//     const [testWorkdays] = helpers.makeWorkdays()

//     before('make knex instance', () => {
//         db = helpers.makeKnexInstance()
//         app.set('db', db)
//     })

//     after('disconnect from db', () => db.destroy())

//     before('cleanup', () => helpers.cleanTables(db))

//     afterEach('cleanup', () => helpers.cleanTables(db))

//     beforeEach('insert users, and workdays', () => {
//         return helpers.seedUsersWorkdays(
//             db,
//             testUsers,
//             testWorkdays,
//         )
//     })

//     const protectedEndpoints = [
//         // {
//         //     name: 'GET /api/workday',
//         //     path: '/api/workday',
//         //     method: supertest(app).get,
//         // },
//         {
//             name: 'GET /api/workday/user_id',
//             path: '/api/workday/user_id',
//             method: supertest(app).get,
//         },
//         {
//             name: 'POST /api/workday',
//             path: '/api/language/guess',
//             method: supertest(app).post,
//         },
//     ]

//     protectedEndpoints.forEach(endpoint => {
//         describe(endpoint.name, () => {
//             it(`responds 401 'Missing bearer token' when no bearer token`, () => {
//                 return endpoint.method(endpoint.path)
//                     .expect(401, { error: `Missing bearer token` })
//             })

//             it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
//                 const validUser = testUsers[0]
//                 const invalidSecret = 'bad-secret'
//                 return endpoint.method(endpoint.path)
//                     .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
//                     .expect(401, { error: `Unauthorized request` })
//             })

//             it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
//                 const invalidUser = { username: 'user-not-existy', id: 1 }
//                 return endpoint.method(endpoint.path)
//                     .set('Authorization', helpers.makeAuthHeader(invalidUser))
//                     .expect(401, { error: `Unauthorized request` })
//             })
//         })
//     })
// })