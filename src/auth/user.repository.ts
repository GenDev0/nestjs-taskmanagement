import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  // Custom methods in the repo...
  // Sign Up new user
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists !');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //Password Validation for user
  async validateUserPassword(
    AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = AuthCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
      //throw new UnauthorizedException('invalid Credentials');
    }
  }

  // Hash user Password
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
