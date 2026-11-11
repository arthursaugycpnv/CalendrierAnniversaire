// db/db-birthdays.js

// Requêtes sql pour anniversaire

import pool from "./db-connection.js"

const db = {
    findAll: async () => {
        const [rows] = await pool.execute("SELECT * FROM birthdays")
        return rows
    }
}

export default db