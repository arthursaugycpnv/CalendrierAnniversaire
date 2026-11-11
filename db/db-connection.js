// db/db-connection.js

import mysql from 'mysql2/promise'
import { existsSync } from 'node:fs'

if (existsSync('.env')) process.loadEnvFile()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})

export default pool