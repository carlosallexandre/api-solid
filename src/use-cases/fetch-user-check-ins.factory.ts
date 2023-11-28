import { FetchUserCheckInsUseCase } from './fetch-user-check-ins'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsuseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new FetchUserCheckInsUseCase(checkInsRepository)
}
