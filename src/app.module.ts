import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { SeedModule } from 'src/seed/seed.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    CommonModule,
    SeedModule,
    PokemonModule,
  ],
})
export class AppModule {}
