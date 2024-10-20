import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { PostgresErrorCode } from '../../shared/database/postgres.error.code'
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(data);
    } catch (error: any) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      throw new HttpException(error.message, 500);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      const old = await this.userRepository.findById(id);
      if (!old) {
        throw new HttpException(`User not found`, 404);
      }
      return await this.userRepository.update(id, data);
  
    } catch (error: any) {
      
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      throw new HttpException(error.message, error.status ?? error.code);
    }
  }

  async deleteUser(id: string): Promise<number> {
    return this.userRepository.delete(id);
  }
}
