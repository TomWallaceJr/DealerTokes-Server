const express = require('express');
const WorkdayService = require('./workday-service');
const path = require('path');
const jsonParser = express.json();
const xss = require('xss');
const UserService = require('../user/user-service');
const workdayRouter = express.Router();

const serializeWorkday = workday => ({
    id: workday.id,
    hours: xss(workday.hours),
    downs: xss(workday.downs),
    tokes: xss(workday.tokes),
    notes: xss(workday.notes),
    date: workday.date,
    user_id: workday.user_id
})


workdayRouter
    .route('/')
    // this get route probably wont be used unless its an admin 
    // implementing now as quick way to test endpoint
    .get((req, res, next) => {
        const knex = req.app.get('db');
        WorkdayService.getAllWorkdays(knex)
            .then(workdays => {
                res.json(workdays.map(serializeWorkday))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { date, downs, tokes, notes, hours, user_id } = req.body;
        const newWorkday = { hours, downs, tokes, notes, date, user_id };

        for (const [key, value] of Object.entries(newWorkday))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                });

        // if date already exists in DB reject

        newWorkday.hours = hours;
        newWorkday.downs = downs;
        newWorkday.tokes = tokes;
        newWorkday.notes = notes;
        newWorkday.date = date;
        newWorkday.user_id = user_id;

        const knex = req.app.get('db');
        WorkdayService.insertNewWorkday(knex, newWorkday)
            .then(entry => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newWorkday.id}`))
                    .json(serializeWorkday(entry))
            })
            .catch(next)
    })

workdayRouter
    .route('/:user_id')
    .all((req, res, next) => {
        const knex = req.app.get('db');
        UserService.getById(
            knex,
            req.params.user_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User does not exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        const knex = req.app.get('db');
        WorkdayService.getWorkdaysById(
            knex,
            req.params.user_id
        )
            .then(workdays => {
                res.json(workdays.map(serializeWorkday))
            })
            .catch(next)
    })
    // WILL DELETE ALL WORKDAYS FOR CURRENT USER
    .delete((req, res, next) => {
        const knex = req.app.get('db');
        WorkdayService.deleteAllWorkdays(
            knex,
            req.params.user_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

// trying endpoint to delete specific workdays but route keeps getting read as 
// '/:user_id' this endpoint '/user_id/workday_id' also not working
// will probably need another router?
workdayRouter
    .route('/:workday_id')
    .all((req, res, next) => {
        const knex = req.app.get('db');
        WorkdayService.getById(
            knex,
            req.params.workday_id
        )
            .then(workday => {
                if (!workday) {
                    return res.status(404).json({
                        error: { message: `Workday does not exist` }
                    })
                }
                res.workday = workday
                next()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const knex = req.app.get('db');
        WorkdayService.deleteWorkday(
            knex,
            req.params.workday_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = workdayRouter;