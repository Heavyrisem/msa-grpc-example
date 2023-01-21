import { getProtoPath } from '@heavyrisem/msa-grpc-example-proto';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MSA_SERVER_URL,
          package: 'hero',
          protoPath: getProtoPath('hero/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
