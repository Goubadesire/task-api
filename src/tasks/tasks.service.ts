import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
    constructor(
        private readonly createTaskDto: CreateTaskDto,
        private readonly updateTaskDto: UpdateTaskDto,
        private readonly prismaService: PrismaService
    ){}

    async findAll(){
        return this.prismaService.task.findMany()
    }

    async findOne(id: number){
        const tache = await this.prismaService.task.findUnique({
            where: { id: id }
        })

        if(!tache){
            throw new NotFoundException(`Aucune tache ne correspond a l'id ${id}`)
        }
        return tache
    }

    create(createTaskDto: CreateTaskDto){
        return this.prismaService.task.create({
            data: { 
                title: createTaskDto.title,
            }
        })
    }

   
    async update( id: number, updateTaskDto: UpdateTaskDto){
        await this.findOne(id) //findOne lève une 404 si la tache n'existe pas
        
        return await this.prismaService.task.update({
            where: { id: id },
            data: {
                title: updateTaskDto.title,
                done: updateTaskDto.done
            }
        })
    }

    async remove(id: number){
        await this.findOne(id) //lève une 404 en cas d'absence de la tache

        await this.prismaService.task.delete({
            where: { id: id }
        })
    }
}
