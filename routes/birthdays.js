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

export default birthdaysRouter