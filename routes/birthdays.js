// routes/birthdays.js
// Route birthdays

import { Router } from "express"

import db from "../db/db-birthdays.js";

const birthdaysRouter = Router()

/**
 * @openapi
 * /api/activities:
 *   get:
 *     summary: Retourne la liste des anniversaires.
 *     description: X
 *     parameters: 
 *  
 *     responses:
 *       200:
 *         description: Retourne une liste d'anniversaires
 *         content:
 *             application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/birthday"
 *       500:
 *         description: system exception describing the error.
 */

birthdaysRouter.get('', async (req, res) => {
    try {

        const birthdays = await db.findAll()

        return res.json({ birthdays })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue." })
    }
})

// TODO : Authentification + récupérer l'id du user
birthdaysRouter.get('/me', async (req, res) => {
    try {
        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test

        const birthdays = await db.findByUserId(user_id)

        return res.json({ birthdays })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue." })
    }
})

birthdaysRouter.post('', async (req, res) => {
    try {
        const name = req.body.name
        const month = req.body.month
        const day = req.body.day

        let type = req.body.type
        let is_anonymous = req.body.is_anonymous
        let locations_id = req.body.locations_id

        // Traitement valeur par défaut
        if (typeof type === "undefined") type = "person"
        if (typeof is_anonymous === "undefined") is_anonymous = 0
        if (typeof locations_id === "undefined") locations_id = null

        if (!name || !month || !day) {
            return res.status(400).json({ error: 'Champs obligatoires : name, month, day' })
        }

        if (!['person', 'event'].includes(type)) {
            return res.status(400).json({ error: "type doit valoir 'person' ou 'event'" })
        }

        if (typeof name !== 'string' || name.length > 45) {
            return res.status(400).json({ error: 'name invalide (45 caractères max)' })
        }

        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test

        const { sql_answer, birthday } = await db.createBirthday(name, type, is_anonymous, user_id, locations_id, month, day)

        if (sql_answer) {
            return res.json({ birthday: birthday })
        } else {
            // TODO: Spécifier l'erreur
            return res.status(400).json({ error: 'Erreur SQL' })
        }
    } catch (error) {
        // TODO : Si date entré pas dans tables date erreur 500 au lieu de erreur 400 !
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue." })
    }
})

birthdaysRouter.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'id invalide' })
        }

        const name = req.body.name
        const month = req.body.month
        const day = req.body.day

        let type = req.body.type
        let is_anonymous = req.body.is_anonymous
        let locations_id = req.body.locations_id

        // Traitement valeur par défaut
        if (typeof type === "undefined") type = "person"
        if (typeof is_anonymous === "undefined") is_anonymous = 0
        if (typeof locations_id === "undefined") locations_id = null

        if (!name || !month || !day) {
            return res.status(400).json({ error: 'Champs obligatoires : name, month, day' })
        }

        if (!['person', 'event'].includes(type)) {
            return res.status(400).json({ error: "type doit valoir 'person' ou 'event'" })
        }

        if (typeof name !== 'string' || name.length > 45) {
            return res.status(400).json({ error: 'name invalide (45 caractères max)' })
        }

        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test

        const { sql_answer, birthday } = await db.updateBirthday(id, name, type, is_anonymous, user_id, locations_id, month, day)

        if (sql_answer) {
            return res.json({ birthday: birthday })
        } else {
            return res.status(404).json({ error: 'Anniversaire introuvable' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue." })
    }
})

birthdaysRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'id invalide' })
        }

        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test

        const { sql_answer } = await db.deleteBirthday(id)

        if (sql_answer) {
            return res.status(200).json({ message: `L'anniversaire ${id} a bien été supprimé` })
        } else {
            return res.status(404).json({ error: 'Anniversaire introuvable' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur interne est survenue." })
    }
})

export default birthdaysRouter