import { Dexie } from 'dexie';

Dexie.debug = false;
// eslint-disable-next-line import/prefer-default-export
export const db = new Dexie('lucilleDB');
db.version(1).stores({
  boards: '++id, name, archived, deleted, taskscount',
  tasks: '++id, boardid, task, completed',
  helpers: '++id, name, email, profilepicture'
});