import { createDatabase, importDataFromFile, dropDatabase } from "../app/db/scaffold";
import { dispose } from "../app/db/index";
const { PGDATABASE } = process.env;

const seed = './scaffold/recipe-store.json';

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => console.log(`[INFO] Database ${PGDATABASE} dropped`))
    .then(() => createDatabase())
    .then(() => console.log(`[INFO] Database ${PGDATABASE} created`))
    .then(() => importDataFromFile(seed))    
    .then(() => console.log(`[INFO] Database ${PGDATABASE} seeded with data from ${seed}`))
    .then(() => dispose())
    .catch(e => console.log(`[ERROR] ${e}`));