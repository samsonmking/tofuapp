import { getRecipeRoute } from './recipe';
import { buildApp } from './app';

const app = buildApp(getRecipeRoute());

const server = app.listen(app.get('port'), () => {
     console.log(`Listening on port ${app.get('port')}`);
 });