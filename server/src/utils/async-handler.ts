import { Request, Response, NextFunction, RequestHandler } from "express";

// interface AsyncRequestHandler {
//   (req: Request, res: Response, next: NextFunction): Promise<any> | any;
// }

// interface RequestHandlerWrapper {
//   (req: Request, res: Response, next: NextFunction): void;
// }

// export const asyncHandler =
//   (requestHandler: AsyncRequestHandler): RequestHandlerWrapper =>
//   (req: Request, res: Response, next: NextFunction): void => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err: Error) =>
//       next(err)
//     );
//   };

export const asyncHandler =
  (
    requestHanler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(requestHanler(req, res, next)).catch((err) => next(err));
  };
