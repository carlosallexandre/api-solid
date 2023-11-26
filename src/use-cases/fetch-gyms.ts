import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchGymsUseCaseRequest {
  query: string
  page: number
}

interface FetchGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: FetchGymsUseCaseRequest): Promise<FetchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany(query, page)

    return {
      gyms,
    }
  }
}
