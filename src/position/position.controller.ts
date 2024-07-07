import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Res } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.createPosition(createPositionDto);
  }

  @Get()
  findAll() {
    return this.positionService.findAllPositions();
  }

  @Get(':id')
  findPositionDetail(@Param('id') id: string) {
    return this.positionService.findPositionDetail(id);
  }

  @Get('children/:parId')
  findPositionChildren(@Param('parId') parId: string) {
    return this.positionService.findPositionChildren(parId);
  }

  @Patch(':parId/:id')
  updatePosition(
    @Param('parId') parId: string,
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.updatePositionDetail(parId, id, updatePositionDto);
  }

  @Delete(':parId/:id')
  remove(@Param('parId') parId: string, @Param('id') id: string) {
    return this.positionService.removePosition(parId, id);
  }
}
