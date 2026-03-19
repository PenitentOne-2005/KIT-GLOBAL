import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) throw new NotFoundException('User not found');

    return { message: 'User deleted' };
  }
}

export default UsersService;
