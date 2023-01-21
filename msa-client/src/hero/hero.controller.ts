import { HeroesServiceClient } from '@heavyrisem/msa-grpc-example-proto';

import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('hero')
export class HeroController implements OnModuleInit {
  private herosService: HeroesServiceClient;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.herosService = this.client.getService<HeroesServiceClient>('HeroesService');
  }

  @Get('')
  getHero() {
    return this.herosService.findOne({ id: 2 });
  }
}
