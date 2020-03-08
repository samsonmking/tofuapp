export enum RoutePaths {
    Recipes = 'recipes',
    Login = 'login',
    Lists = 'lists'
  }
  
  export function getRouteUrl(route: RoutePaths) {
    return `/${route}`;
  }