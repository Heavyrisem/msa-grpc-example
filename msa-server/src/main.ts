import { getProtoPath } from '@heavyrisem/msa-grpc-example-proto';

import { NestFactory } from '@nestjs/core';
import { GrpcOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3001',
    package: 'hero',
    protoPath: getProtoPath('hero/hero.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcOptions);
  await app.listen();
}
bootstrap();
