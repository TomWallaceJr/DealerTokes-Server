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
    },

    getWorkdaysById(knex, user_id) {
        return knex
            .from('workdays')
            .select('*')
            .where('user_id', user_id)
            .orderBy('date')
    },

    deleteAllWorkdays(knex, id) {
        return knex
            .from('workdays')
            .where('user_id', id)
            .delete()
    }
}

module.exports = WorkdayService;