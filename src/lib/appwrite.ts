import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('661980c114773d5d2dbf');

export default client;

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID: string = '66198116ce1b9a846b38';
export const MESSAGES_COLLECTION_ID: string = '661981246d1c22fa378a';

export { ID } from 'appwrite';
