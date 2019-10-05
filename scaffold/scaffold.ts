import { createDatabase, importDataFromFile, dropDatabase } from "../app/db/create-schema";
import { dispose } from "../app/db/index";
import { UserRepoPS } from "../app/user/user-repo-ps";
const { PGDATABASE } = process.env;

const seed = './scaffold/recipe-store.json';
const defaultUser = 'sam';

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => console.log(`[INFO] Database ${PGDATABASE} dropped`))
    .then(() => createDatabase())
    .then(() => console.log(`[INFO] Database ${PGDATABASE} created`))
    .then(() => importDataFromFile(seed))    
    .then(() => console.log(`[INFO] Database ${PGDATABASE} seeded with data from ${seed}`))
    .then(() => (new UserRepoPS().addUser(defaultUser)))
    .then(() => console.log(`[INFO] Default user ${defaultUser} created`))
    .then(() => dispose())
    .catch(e => console.log(`[ERROR] ${e}`));