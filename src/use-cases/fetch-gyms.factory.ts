import { FetchGymsUseCase } from './fetch-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new FetchGymsUseCase(gymsRepository)
}
