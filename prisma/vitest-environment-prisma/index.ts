import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(`The environment variable DATABASE_URL must be defined`)
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',

  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID()
    process.env.DATABASE_URL = generateDatabaseUrl(schema)

    execSync('npx prisma migrate deploy', { stdio: 'inherit' })

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `)
        await prisma.$disconnect()
      },
    }
  },
}
