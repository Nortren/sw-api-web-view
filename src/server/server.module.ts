import { Module } from '@nestjs/common';

import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [AppModule, ViewModule],
  controllers: [],
})
export class ServerModule {}
