import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  findMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: {
    latitude: number
    longitude: number
  }): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
