const pool = require('../db/database');

module.exports = {
    save: async (client, doctor) => {
        try {
            const res = await client.query({
                text: 'INSERT INTO doctors (hospital_id, name, status) VALUES ($1, $2, $3) RETURNING *',
                values: [doctor.hospital_id, doctor.name, doctor.status]
            })

            return res.rows[0]
        } catch (err) {
            throw "Error performing save for doctors table:" +  err
        }
    },

    findById: async (doctorId) => {
        try {
            const res = await pool.query({
                text: `SELECT d.id as _id, d.name, d.status, d.token_number, h.id as hospital_id, h.name as hospital_name, h.location, h.contact_number from hospitals h 
                            INNER JOIN doctors d on h.id = d.hospital_id 
                            WHERE d.id = $1`,
                values: [doctorId]
            })

            if (res.rows.length == 0) {
                return null
            }

            return {
                _id: res.rows[0]._id,
                name: res.rows[0].name,
                status: res.rows[0].status,
                token_number: res.rows[0].token_number,
                _hospital: {
                    _id: res.rows[0].hospital_id,
                    name: res.rows[0].hospital_name,
                    location: res.rows[0].location,
                    contact_number: res.rows[0].contact_number
                }
            }
        } catch (err) {
            throw "Error performing findById for doctors table:" + err
        }
    },

    listDoctors: async (userId) => {
        try {
            const res = await pool.query({
                text: `SELECT d.id as _id, d.name, d.status, d.token_number, h.id as _hospital from users u 
                            INNER JOIN hospitals h ON u.id = h.user_id 
                            INNER JOIN doctors d on h.id = d.hospital_id 
                            WHERE u.id = $1`,
                values: [userId]
            })

            return res.rows
        } catch (err) {
            throw "Error performing listDoctors for doctors table:" + err
        }
    },

    updateStatus: async (doctorId, status, tokenNumber) => {
        try {
            const res = await pool.query({                
                text: `UPDATE doctors
                            SET status = $2, token_number = $3
                            WHERE id = $1 
                            RETURNING *`,
                values: [doctorId, status, tokenNumber]
            })

            return res.rows[0]
        } catch (err) {
            throw "Error performing updateStatus for doctors table:" + err
        }
    }
}