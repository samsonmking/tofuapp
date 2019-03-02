import express from 'express';
import bodyParser from 'body-parser';
import { RecipeRoutes } from './recipe/recipe-routes';
import { RecipeController } from './recipe/recipe-controller';
import { seedRepo } from './recipe/memory-repo-seed';

const app: express.Application = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const recipeRepo = seedRepo();
const recipeController = new RecipeController(recipeRepo);
const recipeRoutes = new RecipeRoutes(recipeController);
recipeRoutes.contributeRoutes(app);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});