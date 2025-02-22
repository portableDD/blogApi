import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, //convert strings to number
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The API description for the Blog ')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT LICENSE',
      'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
