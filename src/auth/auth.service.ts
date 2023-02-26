import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
}
