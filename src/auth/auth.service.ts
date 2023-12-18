import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('InformationRateService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {

      const {password, ...userData} = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password : bcypt.hashSync(password, 10)
      });
      console.log(user)
      await this.userRepository.save(user);
      return {
        ...userData,
        token: this.getJwtToken({ email: user.email }),
      };
    } catch (error) {
      this.handleExceptionsBD(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    if (!user) throw new UnauthorizedException('Credenciales no validas');

    if (!bcypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no validas');
    return {
      ...user,
      token: this.getJwtToken({ email: user.email }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  private handleExceptionsBD(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!',
    );
  }
}
