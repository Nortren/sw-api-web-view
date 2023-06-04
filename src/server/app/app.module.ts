import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';
import { CharacterModule } from './character/character.module';
import { GoogleSearchModule } from './googleSearch/googleSearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsoleModule,
    CharacterModule,
    GoogleSearchModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('init app module');
  }
}
