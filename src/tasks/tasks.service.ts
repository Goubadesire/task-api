import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

const tasks = [
    { id: 1, title: 'Titre 1', done: true },
    { id: 2, title: 'Titre 2', done: false },
    { id: 3, title: 'Titre 3', done: true },
]

@Injectable()
export class TasksService {
    constructor(private readonly createTaskDto: CreateTaskDto, private readonly updateTaskDto: UpdateTaskDto){}

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

    update( id: number, updateTaskDto: UpdateTaskDto){
        const tache =  this.findOne(id) //findOne lève une 404 si la tache n'existe pas

        if(updateTaskDto.title !== undefined){
            tache.title = updateTaskDto.title
        }
        if(updateTaskDto.done !== undefined){
            tache.done = updateTaskDto.done
        }

        return tache
    }

    remove(id: number){
        this.findOne(id) //lève une 404 en cas d'absence de la tache

        const index = tasks.findIndex((task) => task.id === id)
        tasks.splice(index, 1) 
    }
}
