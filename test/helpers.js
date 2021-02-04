const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeKnexInstance() {
    return knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
}

function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'test-user-1',
            name: 'Test user 1',
            password: 'password',
        },
        {
            id: 2,
            username: 'test-user-2',
            name: 'Test user 2',
            password: 'password',
        },
    ]
}

// make workday info
function makeWorkdays() {

    const workdays = [
        {
            id: 1,
            hours: '5',
            downs: '8',
            tokes: '160',
            date: '2021-2-2',
            notes: 'test notes',
            user_id: 1
        },
        {
            id: 1,
            hours: '5',
            downs: '8',
            tokes: '160',
            date: '2021-2-4',
            notes: 'test notes',
            user_id: 1
        },
        {
            id: 1,
            hours: '5',
            downs: '8',
            tokes: '160',
            date: '2021-2-3',
            notes: 'test notes',
            user_id: 1
        },
        {
            id: 1,
            hours: '5',
            downs: '8',
            tokes: '160',
            date: '2021-2-2',
            notes: 'test notes',
            user_id: 2
        },
        {
            id: 1,
            hours: '5',
            downs: '8',
            tokes: '160',
            date: '2021-2-3',
            notes: 'test notes',
            user_id: 2
        },
    ]

    return [workdays]
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}


function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
        "workdays",
        "user"`
        )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.transaction(async trx => {
        await trx.into('user').insert(preppedUsers)

        await trx.raw(
            `SELECT setval('user_id_seq', ?)`,
            [users[users.length - 1].id],
        )
    })
}

async function seedUsersWorkdays(db, users, workdays) {
    await seedUsers(db, users)

    await db.transaction(async trx => {
        await trx.into('workdays').insert(workdays)

        await Promise.all([
            trx.raw(
                `SELECT setval('workdays_id_seq', ?)`,
                [workdays[workdays.length - 1].id],
            ),
        ])
    })
}

module.exports = {
    makeKnexInstance,
    makeUsersArray,
    makeWorkdays,
    makeAuthHeader,
    cleanTables,
    seedUsers,
    seedUsersWorkdays,
}