import { openDB } from 'idb';

const DB_NAME = 'movie-booking-db';
const STORE_NAME = 'bookings';

export async function saveBooking(data:any) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
  await db.add(STORE_NAME, data);
}

export async function getOfflineBookings() {
  const db = await openDB(DB_NAME, 1);
  return await db.getAll(STORE_NAME);
}
