import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('661980c114773d5d2dbf');

export const account = new Account(client);
export { ID } from 'appwrite';
