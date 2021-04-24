import express, { Request, Response, NextFunction, Router } from 'express';
import { BaseController } from './BaseController';

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
    return response.status(200).json({
      success: true,
      data: [],
    });
  }

  /**
   * A method for creating a Task resources.
   */
  private async createTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.status(201).json({
      success: true,
      data: [],
    });
  }

  /**
   * A method for fetch a single Task resource with the corresponding identifier.
   */
  private async getTaskById(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.status(200).json({
      success: true,
      data: [],
    });
  }

  /**
   * A method for updating a Task resource with the corresponding identifier.
   */
  private async updateTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.status(200).json({
      success: true,
      data: [],
    });
  }

  /**
   * A method for destroy a Task resource with the corresponding identifier.
   */
  private async deleteTask(request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.status(200).json({
      success: true,
      data: [],
    });
  }
}
