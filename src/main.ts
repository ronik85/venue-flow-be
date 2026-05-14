import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/allexceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
