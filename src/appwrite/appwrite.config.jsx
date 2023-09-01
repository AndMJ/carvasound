import {Account, Client, Databases, Storage } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DB_PRODUCTION_ID;
export const COLLECTION_GALLERY_ID = import.meta.env.VITE_COLLECTION_GALLERY;
export const STORAGE_BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID;

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_END_POINT)
    .setProject(PROJECT_ID);

export const database = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export default client;
