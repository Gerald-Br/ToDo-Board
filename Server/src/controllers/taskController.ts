import { Request, Response } from 'express';
import Task from '../models/task';

export const createTask = async (req: any, res: any) => {
    try {
        console.log("Creating new Task...")        
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        console.log("Updating Task");
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        console.log("Delete Data: ", req.body)
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};