import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.IPLIST
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
 
  const config = new DocumentBuilder()
  .setTitle('PizzaFresh')
  .setDescription('Aplicação para gestão de mesas')
  .setVersion('1.0.0')
  .addTag('status')
  .addTag('table')
  .addTag('product')
  .addTag('user')
  .addTag('order')
  .addTag('auth')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
