import { GymsRepository } from '../gyms-repository'
import { Gym } from '@prisma/client'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((g) => g.id === gymId)
    return gym ?? null
  }
}
