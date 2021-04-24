import express, { Request, Response, NextFunction, Router } from 'express';

import { BaseController } from './BaseController';
import Task from '../Models/Task';

export class TaskController extends BaseController {
  public constructor() {
    super();
    this.router = express.Router();
  }

  private router: Router;

  createRouter(): Router {
    this.router.route('/').get(this.getTasks).post(this.createTask);
    this.router.route('/:id').get(this.getTaskById).put(this.updateTask).delete(this.deleteTask);

    return this.router;
  }

  /**
   * A method for fetching a collection of Task resources.
   */
  private async getTasks(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const tasks = await Task.find();

      return response.status(200).json({ success: true, data: tasks });
    } catch (e) {
      return BaseController.BadRequest(response);
    }
  }

  /**
   * A method for creating a Task resources.
   */
  private async createTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const { type, description } = request.body;

      if (!type || !description) {
        return BaseController.BadRequest(response);
      }

      const task = await Task.create({ type, description });

      return response.status(201).json({ success: true, data: task });
    } catch (e) {
      return BaseController.BadRequest(response);
    }
  }

  /**
   * A method for fetch a single Task resource with the corresponding identifier.
   */
  private async getTaskById(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = request.params;

      const task = await Task.findById(id);

      if (!task) {
        return BaseController.NotFound(response);
      }

      return response.status(200).json({ success: true, data: task });
    } catch (e) {
      return BaseController.BadRequest(response);
    }
  }

  /**
   * A method for updating a Task resource with the corresponding identifier.
   */
  private async updateTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = request.params;
      const { type, description } = request.body;

      const beforeUpdateTask = await Task.findByIdAndUpdate(id, { type, description });

      if (!beforeUpdateTask) {
        return BaseController.NotFound(response);
      }

      const task = await Task.findById(beforeUpdateTask.id);

      if (!task) {
        return BaseController.NotFound(response);
      }

      return response.status(200).json({ success: true, data: task });
    } catch (e) {
      return BaseController.BadRequest(response);
    }
  }

  /**
   * A method for destroy a Task resource with the corresponding identifier.
   */
  private async deleteTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = request.params;

      const task = await Task.findByIdAndRemove(id);

      if (!task) {
        return BaseController.NotFound(response);
      }

      return response.status(200).json({ success: true, data: null });
    } catch (e) {
      return BaseController.BadRequest(response);
    }
  }
}
