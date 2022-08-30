import { Dexie } from "dexie";

Dexie.debug = false;
// eslint-disable-next-line import/prefer-default-export
export const db = new Dexie("lucilleDB");
db.version(1).stores({
  boards: "++id, name, archived, deleted, taskscount",
  tasks: "++id, boardid, task, completed",
  helpers: "++id, name, email, profilepicture",
  settings: "++id, fontsize, brightness, volume, vibration",
});

db.open();

async function addDefaultSettings() {
  try {
    await db.settings.add({
      fontsize: 30,
      brightness: 100,
      volume: 20,
      vibration: 1,
    });
  } catch (error) { // eslint-disable-next-line
    console.log(`Failed to add default settings ${error}`);
  }
}

db.settings
  .toArray()
  .then((setting) => {
    if (setting.length === 0) {
        addDefaultSettings();
    }
  })
  .catch((error) => error);
