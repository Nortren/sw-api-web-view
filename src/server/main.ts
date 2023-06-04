import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());
  console.log(`Application started on PORT: ${port}`);
  await app.listen(port);
}
bootstrap();
