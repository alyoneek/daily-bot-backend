import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(`/login`)
  async login(@Body() req: LoginDTO) {
    const user = await this.authService.validateUser(req.email, req.password);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return this.authService.login(req.email);
  }

  @Post(`/register`)
  async register(@Body() req: CreateUserDto) {
    return this.authService.register(req);
  }
}
