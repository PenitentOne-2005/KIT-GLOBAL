import { Test, TestingModule } from '@nestjs/testing';
import CommentsService from '../comments.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CommentsService', () => {
  let service: CommentsService;
  const mockCommentModel = {
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getModelToken('Comment'), useValue: mockCommentModel },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call create on model', async () => {
    mockCommentModel.create.mockResolvedValue({ text: 'Test comment' });
    const comment = await service.create('user1', {
      taskId: 'task1',
      text: 'Test comment',
    });
    expect(comment.text).toEqual('Test comment');
  });

  it('findByTask should call find on model', async () => {
    mockCommentModel.find.mockResolvedValue([{ text: 'comment1' }]);
    const comments = await service.findByTask('task1');
    expect(comments[0].text).toEqual('comment1');
  });
});
