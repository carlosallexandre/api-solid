// @vitest-environment prisma
import request from 'supertest'
import { afterAll, beforeAll, expect, it, test } from 'vitest'

import { app } from '@/app'

test('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(response.statusCode).toBe(201)
  })
})
