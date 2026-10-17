import { Injectable, NotFoundException } from '@nestjs/common';

const tasks = [
    { id: 1, title: 'Titre 1', done: true },
    { id: 2, title: 'Titre 2', done: false },
    { id: 3, title: 'Titre 3', done: true },
]

@Injectable()
export class TasksService {
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
}
