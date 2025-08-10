/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { TodosService } from './todos/todos.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TodosModule, AuthModule, ],
  controllers: [AppController, TodosController],
  providers: [AppService,TodosService],
})
export class AppModule {}
