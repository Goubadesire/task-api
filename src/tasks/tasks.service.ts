import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';

const tasks = [
    { id: 1, title: 'Titre 1', done: true },
    { id: 2, title: 'Titre 2', done: false },
    { id: 3, title: 'Titre 3', done: true },
]


@Injectable()
export class TasksService {
    constructor(private readonly createTaskDto: CreateTaskDto){}

    findAll(){
        return tasks
    }

    findOne(id: number){
        const tacheRetrouver = tasks.find((task) => task.id === id)

        if(!tacheRetrouver){
            throw new NotFoundException(`Aucune tache ne correspond a l'id ${id}`)
        }
        return tacheRetrouver
    }

    create(createTaskDto: CreateTaskDto){
        const ids = tasks.map((task) => task.id)
        const plusGrandId = Math.max(...ids)
        const nouvelleId = ids.length === 0 ? 1 : plusGrandId + 1

        const nouvelleTache = {
            id: nouvelleId,
            title: createTaskDto.title,
            done: false
        }

        tasks.push(nouvelleTache)
        return tasks
    }
}
