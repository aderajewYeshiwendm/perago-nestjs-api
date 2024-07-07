import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

describe('PhotoController', () => {
  let photoController: PhotoController;
  let photoService: PhotoService;

  const mockCreatePhotoDto: CreatePhotoDto = {
    name: 'Test Photo',
    description: 'Test Description',
    filename: 'test.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [
        {
          provide: PhotoService,
          useValue: {
            createPhoto: jest.fn(),
          },
        },
      ],
    }).compile();

    photoController = module.get<PhotoController>(PhotoController);
    photoService = module.get<PhotoService>(PhotoService);
  });

  describe('createPhoto', () => {
    it('should call photoService.createPhoto with correct parameters', async () => {
      const userId = 'testUserId';
      const createPhotoSpy = jest.spyOn(photoService, 'createPhoto').mockResolvedValue(mockCreatePhotoDto as any); // Adjust mock as per your actual return type
      const result = await photoController.createPhoto(mockCreatePhotoDto, { user: { id: userId } });
      expect(createPhotoSpy).toHaveBeenCalledWith(userId, mockCreatePhotoDto);
      expect(result).toBe(mockCreatePhotoDto as any); // Adjust expectation as per your actual return type
    });
  });
});
