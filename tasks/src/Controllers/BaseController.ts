import { Response } from 'express';

export class BaseController {
  public constructor() {}

  /**
   * Issues a response that the`request was malformed.
   */
  public static BadRequest(response: Response): Response {
    return response.status(400).json({
      success: false,
      message: `Malformed Request.`,
    });
  }

  /**
   * Issues a response that a resource could not be found.
   */
  public static NotFound(response: Response): Response {
    return response.status(404).json({
      success: false,
      message: 'Not Found.',
    });
  }
}
