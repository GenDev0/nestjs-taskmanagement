import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // Sign up new user
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  //sign In User : Promise<string>
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    // validate user Password
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    // Throw exception if user is not valid/exist
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials !');
    }
    // payload for token
    const payload = { username };
    // create an access token for user
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
