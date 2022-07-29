import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { UpdatePokemonDto } from 'src/pokemon/dto/update-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db`);
    }
    throw new InternalServerErrorException();
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon) {
      if (isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findById(term);
      } else {
        pokemon = await this.pokemonModel.findOne({
          name: term.toLowerCase().trim(),
        });
      }
    }
    if (!pokemon) {
      throw new NotFoundException(`Pokemon not found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error) {
      this.handleException(error);
    }
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }
}
