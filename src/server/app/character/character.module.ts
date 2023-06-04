import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';
import { GoogleSearchService } from '../googleSearch/googleSearch.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsoleModule,
  ],
  providers: [CharacterService, GoogleSearchService],
  controllers: [CharacterController],
})
export class CharacterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('init character module');
  }
}
