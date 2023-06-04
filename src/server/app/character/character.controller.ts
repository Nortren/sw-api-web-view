import { Controller, Request, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get('/list')
  getList(@Request() req) {
    const { page, search } = req.query;
    return this.characterService.getPersonList(page, search);
  }
  @Get('/person/:id')
  getCharacter(@Request() req, @Param() params) {
    const { id } = req.params;
    return this.characterService.getPerson(id);
  }
}
