import { CountUserCheckInsUseCase } from './count-user-check-ins'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCountUserChekInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new CountUserCheckInsUseCase(checkInsRepository)
}
