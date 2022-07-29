import { Module } from '@nestjs/common';
import { SeedService } from 'src/seed/seed.service';
import { SeedController } from 'src/seed/seed.controller';
import { CommonModule } from 'src/common/common.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CommonModule, PokemonModule],
})
export class SeedModule {}
