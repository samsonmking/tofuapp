import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Route } from './route';
import { StaticResource } from './static-resource';
import Boom from 'boom';
import boom from 'boom';

export const buildApp = (routes: Route[], staticResources: StaticResource[]): express.Application => {
    const app: express.Application = express();
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    if(process.env.NODE_ENV === 'dev') {
        console.log('[WARNING] Cross origin requests enabled in dev mode');
        app.use(cors());
    }
    routes.forEach(r => r.contributeRoutes(app));
    staticResources.forEach(r => r.contributeStatic(app));
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const boomError: Boom = (err.isBoom) ? err : boom.badImplementation();
        res.status(boomError.output.statusCode).json(boomError.output.payload);
        if(boomError.isServer) {
            console.log(`[ERROR] ${err}`);
        }
        next();
    });
    return app;
}
