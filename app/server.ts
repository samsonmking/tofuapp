import { getRecipeRoute } from './recipe';
import { buildApp } from './app';
import { getImageRoutes, getImageResources } from './recipe-image';

const routes = [
    getRecipeRoute(),
    getImageRoutes()
];
const staticResources = [
    getImageResources()
]
const app = buildApp(routes, staticResources);

const server = app.listen(app.get('port'), () => {
     console.log(`Listening on port ${app.get('port')}`);
 });