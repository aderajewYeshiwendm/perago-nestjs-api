import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from '../entities/position.entity';

describe('PositionController', () => {
  let positionController: PositionController;
  let positionService: PositionService;

  const mockPosition: Position = {
    id: '1',
    name: 'Test Position',
    description: 'Test Description',
    parentId: null,
    userId: null,
    user: undefined,
    children: [],
    parent: undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
      providers: [
        {
          provide: PositionService,
          useValue: {
            createPosition: jest.fn(),
            findAllPositions: jest.fn(),
            findPositionDetail: jest.fn(),
            findPositionChildren: jest.fn(),
            updatePositionDetail: jest.fn(),
            removePosition: jest.fn(),
          },
        },
      ],
    }).compile();

    positionController = module.get<PositionController>(PositionController);
    positionService = module.get<PositionService>(PositionService);
  });

  describe('createPosition', () => {
    it('should call positionService.createPosition with correct parameters', async () => {
      const createPositionDto: CreatePositionDto = { name: 'Test Position', description: 'Test Description', parentId: null };
      const createPositionSpy = jest.spyOn(positionService, 'createPosition').mockResolvedValue(mockPosition);
      const result = await positionController.createPosition(createPositionDto);
      expect(createPositionSpy).toHaveBeenCalledWith(createPositionDto);
      expect(result).toBe(mockPosition);
    });
  });

  describe('findAll', () => {
    it('should call positionService.findAllPositions', async () => {
      const findAllPositionsSpy = jest.spyOn(positionService, 'findAllPositions').mockResolvedValue([mockPosition]);
      const result = await positionController.findAll();
      expect(findAllPositionsSpy).toHaveBeenCalled();
      expect(result).toEqual([mockPosition]);
    });
  });

  describe('findPositionDetail', () => {
    it('should call positionService.findPositionDetail with correct parameters', async () => {
      const findPositionDetailSpy = jest.spyOn(positionService, 'findPositionDetail').mockResolvedValue(mockPosition);
      const result = await positionController.findPositionDetail('1');
      expect(findPositionDetailSpy).toHaveBeenCalledWith('1');
      expect(result).toBe(mockPosition);
    });
  });

  // describe('findPositionChildren', () => {
  //   it('should return position with children', async () => {
  //     const mockPosition: {} = {
  //       id: 'd301cf65-2dad-412b-9da2-974968ec2f5e',
  //       name: 'ceo',
  //       description: 'chief executive officer',
  //       parentId: null,
  //       userId: null,
  //       children: [
  //         {
  //           id: 'e134ee20-e512-4854-95af-0c6f3b6921a0',
  //           name: 'cfo',
  //           description: 'chief financial executive',
  //           parentId: 'd301cf65-2dad-412b-9da2-974968ec2f5e',
  //           userId: null,
  //           children: [
  //             {
  //               id: '54d9c990-d594-47d8-8855-6e812202bacd',
  //               name: 'pm',
  //               description: 'product manager',
  //               parentId: 'e134ee20-e512-4854-95af-0c6f3b6921a0',
  //               userId: null,
  //               children: [],
  //             },
  //           ],
  //         },
  //         {
  //           id: 'd7aaf333-e8ac-40a9-a8dc-5bac17b77d71',
  //           name: 'CTO',
  //           description: 'chief technology officer',
  //           parentId: 'd301cf65-2dad-412b-9da2-974968ec2f5e',
  //           userId: null,
  //           children: [],
  //         },
  //       ],
  //       user: undefined,
  //       parent: undefined,
  //     };
  
  //     jest.spyOn(positionService, 'findPositionChildren').mockResolvedValue(mockPosition);
  
  //     const result = await positionController.findPositionChildren('d301cf65-2dad-412b-9da2-974968ec2f5e');
  
  //     expect(result).toEqual(mockPosition);
  //   });
  // });
  

  describe('updatePosition', () => {
    it('should call positionService.updatePositionDetail with correct parameters', async () => {
      const updatePositionDto: UpdatePositionDto = { name: 'Updated Position', description: 'Updated Description' };
      const updatePositionDetailSpy = jest.spyOn(positionService, 'updatePositionDetail').mockResolvedValue(mockPosition);
      const result = await positionController.updatePosition('1', '2', updatePositionDto);
      expect(updatePositionDetailSpy).toHaveBeenCalledWith('1', '2', updatePositionDto);
      expect(result).toBe(mockPosition);
    });
  });

  describe('remove', () => {
    it('should call positionService.removePosition with correct parameters', async () => {
      const removePositionSpy = jest.spyOn(positionService, 'removePosition').mockResolvedValue(undefined); // or use string for error scenario
      const result = await positionController.remove('1', '2');
      expect(removePositionSpy).toHaveBeenCalledWith('1', '2');
      expect(result).toBeUndefined(); 
    });
  });
});
