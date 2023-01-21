import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { HeroById, Hero } from '@heavyrisem/msa-grpc-example-proto';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HeroController {
  // GrpcMethod의 인지가 없다면 클래스 이름, 메소드 이름을 카멜 케이스로 변환하여 사용됨
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
