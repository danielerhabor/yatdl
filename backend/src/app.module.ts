import { Module } from '@nestjs/common';

import { TodosModule } from './todos/todos.module';
// import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TodosModule],
  providers: []
})
export class AppModule {}
