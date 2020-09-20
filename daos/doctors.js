const pool = require('../db/database');

module.exports = {
    save: async (client, doctor) => {
        console.log(doctor)
        try {
            const res = await client.query({
                text: 'INSERT INTO doctors (hospital_id, name, status) VALUES ($1, $2, $3) RETURNING *',
                values: [doctor.hospital_id, doctor.name, doctor.status]
            })

            return res.rows[0]
        } catch (err) {
            console.error("Error performing save for hospitals table", err)
            return err
        }
    },

    findById: async (userId, doctorId) => {
        try {
            const res = await pool.query({
                text: `SELECT d.id as _id, d.name, d.status, d.token_number, h.id as _hospital as hospital_id from users u 
                            INNER JOIN hospitals h ON u.id = h.user_id 
                            INNER JOIN doctors d on h.id = d.hospital_id 
                            WHERE u.id = $1 and d.id = $2`,
                values: [userId, doctorId]
            })

            return res.rows
        } catch (err) {
            console.error("Error performing save for hospitals table", err)
            return err
        }
    },

    listDoctors: async (userId) => {
        try {
            const res = await pool.query({
                text: `SELECT d.id as _id, d.name, d.status, d.token_number, h.id as _hospital as hospital_id from users u 
                            INNER JOIN hospitals h ON u.id = h.user_id 
                            INNER JOIN doctors d on h.id = d.hospital_id 
                            WHERE u.id = $1`,
                values: [userId]
            })

            return res.rows
        } catch (err) {
            console.error("Error performing save for hospitals table", err)
            return err
        }
    }
}