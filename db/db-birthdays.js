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
    }
}

export default db