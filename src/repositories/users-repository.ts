import { Prisma, User } from '@prisma/client'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(data: Prisma.UserCreateInput): Promise<User>
}
