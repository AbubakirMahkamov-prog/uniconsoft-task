import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'basic-auth';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = basicAuth(req);
    const username = 'unicon';
    const password = '123';

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm="Swagger"');
      return res.status(401).send('Authentication required.');
    }

    next();
  }
}
