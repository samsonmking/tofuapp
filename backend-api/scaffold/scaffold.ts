import { createDatabase, dropDatabase } from "../app/db/create-schema";
import { dispose } from "../app/db/index";
const { PGDATABASE } = process.env;

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => console.log(`[INFO] Database ${PGDATABASE} dropped`))
    .then(() => createDatabase())
    .then(() => console.log(`[INFO] Database ${PGDATABASE} created`))
    .then(() => dispose())
    .catch(e => console.log(`[ERROR] ${e}`));