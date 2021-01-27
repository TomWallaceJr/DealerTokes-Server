const WorkdayService = {
    getAllWorkdays(knex) {
        return knex.select('*')
            .from('workdays')
    },

    insertNewWorkday(knex, newEntry) {
        return knex
            .insert(newEntry)
            .into('workdays')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = WorkdayService;