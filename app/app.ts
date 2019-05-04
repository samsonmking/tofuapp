import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Route } from './route';
import { StaticResource } from './static-resource';

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
    return app;
}