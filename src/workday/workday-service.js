const WorkdayService = {
    getAllWorkdays(knex) {
        return knex.select('*')
            .from('workdays')
    },
}

module.exports = WorkdayService;