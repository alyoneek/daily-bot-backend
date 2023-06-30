import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashService } from 'src/user/hash.service';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.getUserByEmail(email);
    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async login(email: string) {
    const payload = {
      email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    return this.login(createdUser.email);
  }
}
