import { getRecipeRoute } from './recipe';
import { buildApp } from './app';
import { getImageRoutes, getImageResources } from './recipe-image';
import { getIngredientRoutes } from './ingredient';
import { getShoppingListRoutes } from './shopping-list';
const { NODE_ENV } = process.env;

const routes = [
    getRecipeRoute(),
    getImageRoutes(),
    getIngredientRoutes(),
    getShoppingListRoutes()
];

const staticResources = NODE_ENV == 'dev' ? [ getImageResources() ] : [];

const app = buildApp(routes, staticResources);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
