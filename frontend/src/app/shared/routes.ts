export enum RoutePaths {
    Recipes = 'recipes',
    Login = '',
    Lists = 'lists'
  }
  
  export function getRouteUrl(route: RoutePaths) {
    return `/${route}`;
  }