import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)
    return checkIn ?? null
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startDay = dayjs(date).startOf('date')
    const endDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((c) => {
      const isSameDay =
        dayjs(c.created_at).isAfter(startDay) &&
        dayjs(c.created_at).isBefore(endDay)

      return isSameDay && c.user_id === userId
    })

    return checkInOnSameDate ?? null
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((c) => c.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((c) => c.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const index = this.items.findIndex((c) => c.id === checkIn.id)
    if (index >= 0) this.items[index] = checkIn
    return checkIn
  }
}
