import { beforeEach, describe, expect, it } from 'vitest'
import { FetchGymsUseCase } from './fetch-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Fetch Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchGymsUseCase(gymsRepository)
  })

  it('should be able to fetch gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Typescript gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Typescript gym ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript gym 21' }),
      expect.objectContaining({ title: 'Typescript gym 22' }),
    ])
  })
})
