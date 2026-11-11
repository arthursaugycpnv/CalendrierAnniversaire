// db/db-birthdays.js

// Requêtes sql pour anniversaire
// Note : à voir si faire un db-XXX par objet + un db-connection pour avoir une seule pool
// Ou simplement faire un db-XXX par objet avec son pool

import mysql from 'mysql2/promise'

process.loadEnvFile();

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_PORT, process.env.DB_DATABASE)

const poolConn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})

const db = {
    
}
/*
// rapide test poolConn
const test = async () => {
    const ans = await poolConn.execute("SELECT * FROM birthdays")
    return ans
}
const rows = await test()
console.log(rows)
*/
export default db