import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CountUserCheckInsUseCase } from './count-user-check-ins'

describe('Count User Check-Ins Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CountUserCheckInsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CountUserCheckInsUseCase(checkInsRepository)
  })

  it('should be able count the user check-ins', async () => {
    const NUMBER_OF_USER_CHECK_INS = 10

    for (let i = 0; i < NUMBER_OF_USER_CHECK_INS; i++) {
      await checkInsRepository.create({
        gym_id: 'gym_01',
        user_id: 'user_01',
      })
    }

    const { checkInsCount } = await sut.execute({ userId: 'user_01' })

    expect(checkInsCount).toEqual(NUMBER_OF_USER_CHECK_INS)
  })
})
