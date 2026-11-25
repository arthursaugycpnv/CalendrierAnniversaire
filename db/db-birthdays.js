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
        // TODO: Vérifier si check aussi user_id
        const [rows] = await pool.execute("INSERT INTO birthdays(name, type, is_anonymous, users_id, locations_id, dates_month, dates_day) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, type, is_anonymous, users_id, locations_id, dates_month, dates_day])
        // TODO: Renvoyer toute la ligne
        return { sql_answer: rows.affectedRows === 1, birthday: { name, type, is_anonymous, locations_id, dates_month, dates_day } }
    },
    updateBirthday: async (id, name, type, is_anonymous, user_id, locations_id, month, day) => {
        // TODO: Vérifier si check aussi user_id
        const [rows] = await pool.execute("UPDATE birthdays SET name = ?, type = ?, is_anonymous = ?, locations_id = ?, dates_month = ?, dates_day = ? WHERE id = ?", [name, type, is_anonymous, user_id, locations_id, month, day, id])
        return { sql_answer: rows.affectedRows === 1, birthday: { id, name, type, is_anonymous, user_id, locations_id, month, day } }
    },
    deleteBirthday: async (id, user_id) => {
        const [rows] = await pool.execute("DELETE FROM birthdays WHERE id = ? AND users_id = ?", [id, user_id])
        // Vérifier qu'une ligne a bien été modifiée
        return { sql_answer: rows.affectedRows === 1 }
    }
}

export default db