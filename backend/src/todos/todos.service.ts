import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        scheduled: dayjs(createTodoDto.scheduled).toDate()
      }
    });
  }

  async findAll(date: Date) {
    return await this.prisma.todo.findMany({
      where: {
        scheduled: dayjs(date).toDate()
      }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.prisma.todo.update({
      where: {
        id
      },
      data: {
        ...updateTodoDto,
        scheduled: dayjs(updateTodoDto.scheduled).toDate()
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: {
        id
      }
    });
  }
}
