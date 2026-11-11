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

birthdaysRouter.get('', async(req, res) => {
    try {

        const birthdays = await db.findAll()

        return res.json({birthdays})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Une erreur interne est survenue."})
    }
})

// TODO : Authentification + récupérer l'id du user
birthdaysRouter.get('/me', async(req, res) => {
    try {
        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test

        const birthdays = await db.findByUserId(user_id)

        return res.json({birthdays})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Une erreur interne est survenue."})
    }
})

birthdaysRouter.post('', async(req, res) => {
    try {
        const name = req.body.name
        const month = req.body.month
        const day = req.body.day

        let type = req.body.type
        let is_anonymous = req.body.is_anonymous

        // Traitement valeur par défaut
        if (type(type) === undefined) type = "person"
        if (type(is_anonymous) === undefined) is_anonymous = 0

        if (!name || !month || !day) {
            return res.status(400).json({ error: 'Champs obligatoires : name, type, month, day' })
        }

        // TODO : Récupérer l'id du user via auth
        const user_id = 1 // seulement pour test
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Une erreur interne est survenue."})
    }
})

export default birthdaysRouter