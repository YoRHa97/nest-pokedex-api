import { Controller, Get } from '@nestjs/common';
import { SeedService } from 'src/seed/seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get()
  execute() {
    return this.seedService.execute();
  }
}
