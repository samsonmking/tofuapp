import { createDatabase, dropDatabase } from "../app/db/create-schema";
import { dispose } from "../app/db/index";
import { userScaffold } from "../app/user";
import { createUser } from "../app/user/scaffold";
const { PGDATABASE } = process.env;

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => console.log(`[INFO] Database ${PGDATABASE} dropped`))
    .then(() => createDatabase())
    .then(() => console.log(`[INFO] Database ${PGDATABASE} created`))
    .then(() => userScaffold.createUser(`samson@samsonmking.com`))
    .then(user => { 
        console.log(`[INFO] Default user '${user}' created`); 
        return user; 
    })
    .then(() => createUser('user@gmail.com', 'password'))
    .then(() => dispose())
    .catch(e => console.log(`[ERROR] ${e}`));