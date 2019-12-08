export interface Route {
    contributeRoutes(app: Express.Application): void;
}