import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { GoogleSearchController } from './googleSearch.controller';
import { GoogleSearchService } from './googleSearch.service';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsoleModule,
  ],
  providers: [GoogleSearchService],
  controllers: [GoogleSearchController],
})
export class GoogleSearchModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('init GoogleSearchModule');
  }
}
