// db/db-birthdays.js

// Requêtes sql pour anniversaire

import pool from "./db-connection.js"

const db = {
    findAll: async () => {
        const [rows] = await pool.execute("SELECT * FROM birthdays")
        return rows
    },
    findByUserId: async (user_id) => {
        const [rows] = await pool.execute("SELECT * FROM birthdays WHERE users_id=?", [user_id])
        return rows
    },
    createBirthday: async (name, type, is_anonymous, users_id, locations_id, dates_month, dates_day) => {
        const [rows] = await pool.execute("INSERT INTO birthdays(name, type, is_anonymous, users_id, locations_id, dates_month, dates_day VALUES (?, ?, ?, ?, ?, ?, ?", [name, type, is_anonymous, users_id, locations_id, dates_month, dates_day])
        // TODO: Verifier qu'une ligne a bien été ajoutée
        return { sql_answer: 1, birthday: rows }
    }
}

export default db