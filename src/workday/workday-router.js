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


module.exports = workdayRouter;