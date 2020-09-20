const pool = require('../db/database');

module.exports = {
    save: async (hospital) => {
        try {
            const res = await pool.query({
                text: 'INSERT INTO hospitals (user_id, name, location, contact_number) VALUES ($1, $2, $3, $4) RETURNING *',
                values: [hospital.user_id, hospital.name, hospital.location, hospital.contact_number]
            })

            return res.rows[0]
        } catch (err) {
            console.error("Error performing save for hospitals table", err)
            return err
        }
    }
}