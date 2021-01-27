const express = require('express');
const WorkdayService = require('./workday-service');
const path = require('path');
const jsonParser = express.json();
const xss = require('xss');
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
        const { hours, downs, tokes, notes, date, user_id } = req.body;
        const newWorkday = { hours, downs, tokes, notes, date, user_id };

        for (const [key, value] of Object.entries(newWorkday))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                });

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
                    .location(path.posix.join(req.originalUrl, `/${entryid}`))
                    .json(serializeWorkday(entry))
            })
            .catch(next)
    })


module.exports = workdayRouter;