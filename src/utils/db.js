/* eslint-disable no-console */
import { Dexie } from "dexie";

Dexie.debug = false;
// eslint-disable-next-line import/prefer-default-export
export const db = new Dexie("lucilleDB"); // Create new DB in the browser
db.version(1).stores({
  // Create 4 different tables and define what needs to be indexed
  boards: "++id, name, archived, deleted, taskscount",
  tasks: "++id, boardid, task, completed",
  helpers: "++id, name, email, profilepicture",
  settings: "++id, fontsize, brightness, volume, vibration",
});

db.open(); // Open a connection with the DB to perform actions

// Add default settings only at the first start
async function addDefaultSettings() {
  try {
    await db.settings.add({
      fontsize: 30,
      brightness: 100,
      volume: 20,
      vibration: 1,
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log(`Failed to add default settings ${error}`);
  }
}

async function checkIdemPotent() {
  try {
    await db.settings.toArray().then((setting) => {
      if (setting.length === 0) {
        addDefaultSettings();
      }
    });
  } catch (error) {
    console.log("Failed to add default settings values");
  }
}

checkIdemPotent();
