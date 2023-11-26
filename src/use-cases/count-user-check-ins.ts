import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CountUserCheckInsUseCaseRequest {
  userId: string
}

interface CountUserCheckInsUseCaseResponse {
  checkInsCount: number
}

export class CountUserCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: CountUserCheckInsUseCaseRequest): Promise<CountUserCheckInsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
