import { createDatabase, importDataFromFile, dropDatabase } from "./db/scaffold";
const { PGDATABASE } = process.env;

const seed = './data/recipe-store.json';

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => {
        console.log(`[INFO] Database ${PGDATABASE} dropped`)
    })
    .then(() => createDatabase())
    .then(() => {
        console.log(`[INFO] Database ${PGDATABASE} created`)
    })
    .then(() => importDataFromFile(seed))    
    .then(() => {
        console.log(`[INFO] Database ${PGDATABASE} seeded with data from ${seed}`)
    })
    .catch(e => console.log(`[ERROR] ${e}`));