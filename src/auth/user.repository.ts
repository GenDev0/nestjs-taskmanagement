import {
  ConflictException,
  InternalServerErrorException,
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
    // initiate new User entity
    const user = new User();
    // isert username
    user.username = username;
    // prepare unique salt per user
    user.salt = await bcrypt.genSalt();
    // hash password with unique salt
    user.password = await this.hashPassword(password, user.salt);

    try {
      // insert user into DB
      await user.save();
    } catch (error) {
      // throw error in case of duplicate or else...
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
    // find user from DB
    const user = await this.userRepository.findOneBy({ username });
    // check if user exist and the password is valid
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  // Hash user Password
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
