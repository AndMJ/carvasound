import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.END_POINT)
    .setProject(import.meta.env.PROJECT);

export default client;
