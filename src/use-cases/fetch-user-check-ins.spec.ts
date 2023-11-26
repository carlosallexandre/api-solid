import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

describe('Fetch User Check-Ins Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: FetchUserCheckInsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsUseCase(checkInsRepository)
  })

  it('should be able to fetch user check-ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({ userId: 'user-01' })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-ins', async () => {
    for (let i = 1; i <= 25; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${String(i).padStart(2, '0')}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(5)
    expect(checkIns).toEqual(
      [21, 22, 23, 24, 25].map((gymId) =>
        expect.objectContaining({
          gym_id: `gym-${gymId.toString().padStart(2, '0')}`,
        }),
      ),
    )
  })
})
