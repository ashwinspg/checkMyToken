const pool = require('../db/database');
const userDTO = require('../dtos/users');
const hospitalDTO = require('../dtos/hospitals');

module.exports = {
    findById: async (id) => {
        try {
            const res = await pool.query({
                text: `SELECT u.*, h.id as hospital_id, h.name, h.location, h.contact_number from users u 
                            LEFT JOIN hospitals h ON u.id = h.user_id 
                            WHERE u.id = $1`,
                values: [id]
            })
            
            if (res.rows.length == 0) {
                return null
            }

            user = new userDTO(res.rows[0].id, res.rows[0].credits)
            user._hospital = new hospitalDTO(res.rows[0].hospital_id, res.rows[0].id, res.rows[0].name, res.rows[0].location, res.rows[0].contact_number)
            return user
        } catch (err) {
            console.error("Error findById for users table: ", err)
            return err
        }
    },

    save: async (user) => {
        try {
            const res = await pool.query({
                text: 'INSERT INTO users (id, credits) VALUES ($1, $2) RETURNING *',
                values: [user.id, user.credits]
            })

            return res.rows[0]
        } catch (err) {
            console.error("Error save for users table: ", err)
            return err
        }
    },

    updateCredit: async (client, userId, newCreditsValue) => {
        try {
            const res = await client.query({
                text: 'UPDATE users SET credits = $1 WHERE id = $2 RETURNING *',
                values: [newCreditsValue, userId]
            })

            return res.rows[0]
        } catch (err) {
            console.error("Error update credits for users table: ", err)
            return err
        }
    }
}