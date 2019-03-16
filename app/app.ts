import express from 'express';
import bodyParser from 'body-parser';
import { Route } from './route';

export const buildApp = (...routes: Route[]): express.Application => {
    const app: express.Application = express();
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    routes.forEach(r => r.contributeRoutes(app));

    return app;
}