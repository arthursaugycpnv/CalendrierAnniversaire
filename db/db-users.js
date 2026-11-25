import bcrypt from 'bcrypt'

import pool from "./db-connection.js"

const db = {

    CreateUser: async (username, password, firstname, lastname) => {
        const hashed_password = await bcrypt.hash(password, 10)
        const [rows] = await pool.execute('INSERT INTO users (username, hashed_password, firstname, lastname) VALUES (?,?,?, ?)', [username, hashed_password, firstname, lastname])
        return { sql_answer: rows.affectedRows === 1, user: { username } }
    },

    GetUserByName: async (username) => {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username=?', [username])

        return rows
    }

}

export default db;