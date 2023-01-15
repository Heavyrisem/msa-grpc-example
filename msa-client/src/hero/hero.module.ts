import { getProtoPath } from 'proto';

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
