/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,  // Import ConfigModule so ConfigService can be injected
    JwtModule.registerAsync({
      imports: [ConfigModule], // ensure ConfigModule is imported here
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        secret: configService.get<string>('JWT_SECRET'),  // read secret from env
        signOptions: { expiresIn: '1h' },  // optional token expiry
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
