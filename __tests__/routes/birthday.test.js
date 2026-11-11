// __tests__/routes/birthday.test.js
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import app from '../../app.js'

vi.mock('../../db/db-birthdays.js', () => ({
    default: { findAll: vi.fn() },
}))

describe('GET /api/birthdays', () => {
    it.todo('renvoie la liste des anniversaires')
})