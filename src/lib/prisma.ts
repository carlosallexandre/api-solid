import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  datasourceUrl:
    'postgresql://my_user:password123@api-solid-db:5432/apisolid?schema=public',
})
