import {Account, Client, Databases} from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DB_PRODUCTION_ID;
export const COLLECTION_ID_GALLERY = import.meta.env.VITE_COLLECTION_GALLERY;


const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_END_POINT)
    .setProject(PROJECT_ID);

export const database = new Databases(client);
export const account = new Account(client);

export default client;
