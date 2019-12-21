import { getRecipeRoute } from './recipe';
import { buildApp } from './app';
import { getImageRoutes, getImageResources } from './recipe-image';
import { getIngredientRoutes } from './ingredient';
import { getShoppingListRoutes } from './shopping-list';
import { getUserRoutes } from './user';
import { StaticResource } from './static-resource';
import express from 'express';


class StaticRoot implements StaticResource {
    contributeStatic(app: express.Application): void {
        app.use(express.static('dist'));
        app.get('/', (req, res) => res.sendFile('dist/index.html'))
    }
}

const routes = [
    getRecipeRoute(),
    getImageRoutes(),
    getIngredientRoutes(),
    getShoppingListRoutes(),
    getUserRoutes()
];

const staticResources = [
    getImageResources(),
    new StaticRoot()
];

const app = buildApp(routes, staticResources);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
