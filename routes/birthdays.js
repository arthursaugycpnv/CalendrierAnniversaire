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

// TODO : Authentification + récupérer l'id du user
birthdaysRouter.get('', async(req, res) => {
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

export default birthdaysRouter