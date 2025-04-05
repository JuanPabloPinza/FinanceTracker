import { Controller, Post, Body, UnauthorizedException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  //En esta versión ya no devuelvo en el cuerpo el RT y AT, sino que uso HttpOnly
  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    const { accessToken, refreshToken } = await this.authService.login(user);
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.json({ message: 'Logged in successfully' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.cookie('accessToken', '', { expires: new Date(0) });
    res.cookie('refreshToken', '', { expires: new Date(0) });
    return res.json({ message: 'Logged out' });
  }

  @Post('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedException();
    const { accessToken } = await this.authService.refresh(refreshToken);
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.json({ message: 'Token refreshed' });
  }
}