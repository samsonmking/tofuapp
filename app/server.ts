import { getRecipeRoute } from './recipe';
import { buildApp } from './app';
import { getImageRoutes, getImageResources } from './recipe-image';
import { getIngredientRoutes } from './ingredient';
import { getShoppingListRoutes } from './shopping-list';
import { getUserRoutes } from './user';

const routes = [
    getRecipeRoute(),
    getImageRoutes(),
    getIngredientRoutes(),
    getShoppingListRoutes(),
    getUserRoutes()
];
const staticResources = [
    getImageResources(),
];

const app = buildApp(routes, staticResources);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
