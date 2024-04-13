import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('661980c114773d5d2dbf');

export default client;

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID: string = '66198116ce1b9a846b38';
export const COLLECTION_ID_MESSAGES: string = '661981246d1c22fa378a';
export const COLLECTION_ID_USERS: string = '661a54819f07554fe6da';

export { ID } from 'appwrite';