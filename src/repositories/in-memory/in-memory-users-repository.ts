import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    created_at: Date
  } | null> {
    const user = this.items.find((u) => u.email === email)

    return user ?? null
  }

  async create(data: Prisma.UserCreateInput): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    created_at: Date
  }> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
