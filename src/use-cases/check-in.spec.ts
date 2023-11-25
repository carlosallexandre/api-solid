import { beforeEach, describe, expect, it, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

describe('Check In Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(-17.8876087),
      longitude: new Decimal(-51.7361469),
    })

    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.8876087,
      userLongitude: -51.7361469,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 10, 25, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.8876087,
      userLongitude: -51.7361469,
    })

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -17.8876087,
        userLongitude: -51.7361469,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2023, 10, 25, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -17.8876087,
      userLongitude: -51.7361469,
    })

    vi.setSystemTime(new Date(2023, 10, 26, 12, 0, 0))

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -17.8876087,
        userLongitude: -51.7361469,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able to check in too much distanct from the gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(-17.884114),
      longitude: new Decimal(-51.706792),
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -17.8876087,
        userLongitude: -51.7361469,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
