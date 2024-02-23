import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepositoy.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepositoy.save(user);
      delete user.password;

      return user;

      //TODO: return JWT the access
    } catch (error) {
      this.handelDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userRepositoy.findOne({
        where: { email },
        select: { email: true, password: true },
      });

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid (email)');
      }

      if (bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid (password)');
      }

      return user;
      //TODO: return JWT
    } catch (error) {
      this.handelDBErrors(error);
    }
  }

  private handelDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Plase check server logs');
  }
}
