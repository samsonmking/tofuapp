export interface StaticResource {
    contributeStatic(app: Express.Application): void;
}