import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HeroModule } from './hero/hero.module';
import { ConfigurationModule } from './modules/config/config.module';
import { LoggerMiddleware } from './modules/logging/logger.middleware';

@Module({
  imports: [ConfigurationModule, HeroModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
