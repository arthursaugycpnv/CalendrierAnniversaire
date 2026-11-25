import { Router } from "express"
import db from "../db/db-users.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

process.loadEnvFile();

const privateKey = process.env.JWT_SECRET;

const usersRouter = Router()

usersRouter.post('/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            return res.status(400).json({ error: 'Champs obligatoires : username, password' })
        }

        const db_rows = await db.GetUserByName(username)

        if (db_rows.length == 0) {
            return res.status(401).json({ error: "Le mot de passe et l'utilisateur ne correspondent pas." })
        }

        if (!await bcrypt.compare(password, db_rows[0].hashed_password)) {
            return res.status(401).json({ error: "Le mot de passe et l'utilisateur ne correspondent pas." })
        }

        const token = jwt.sign(
            { userId: db_rows[0].id },
            privateKey,
            { expiresIn: '1h' }
        )

        res.status(200).json({ message: "Utilisateur connecté", token: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Une erreur interne est survenue" })
    }
})

usersRouter.post('/create', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const firstname = req.body.firstname
        const lastname = req.body.lastname

        if (!username || !password || !firstname || !lastname) {
            return res.status(400).json({ error: 'Champs obligatoires : username, password, firstname, lastname' })
        }

        const { sql_answer, user } = await db.CreateUser(username, password, firstname, lastname)

        if (!sql_answer) {
            // TODO: Spécifier erreur (duppli, ...)
            return res.status(400).json({ error: "Erreur SQL" })
        }

        const message = `L'user ${username} a bien été créé`

        return res.json({ message: message, user: user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue" })
    }
})

export default usersRouter