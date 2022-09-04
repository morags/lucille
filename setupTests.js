/* eslint-disable prefer-arrow-callback */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import Dexie from "dexie";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

Dexie.dependencies.indexedDB = require("fake-indexeddb");
Dexie.dependencies.IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

const db = new Dexie("lucilleDBTestDB", {
  indexedDB: indexedDB,
  IDBKeyRange: IDBKeyRange,
});

db.version(1).stores({
  settings: "++id",
});

db.open().then(function () {
  return db.settings.add({
    fontsize: 30,
    brightness: 100,
    volume: 20,
    vibration: 1
  });
});
