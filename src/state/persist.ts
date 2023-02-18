import {openDB} from 'idb'

/**
 * Wrapping class for persisting data to various idb stores.
 */
// @TODO as well as T, or maybe in place of, we should pass in the DBSchema, although this might be a little trickier as we only pass in a dbName multiple of these persistence classes could access the same db
export class PersistData<T> {
  dbName: string
  storeName: string
  index: string

  constructor(dbName: string, storeName: string, index: string = 'id') {
    this.dbName = dbName
    this.storeName = storeName
    this.index = index
  }

  // We will likely need to handle upgrades at some point, probably in the constructor and force consumers to deal with their changes to data
  private async openDB() {
    const storeName = this.storeName
    const idx = this.index
    const db = await openDB(this.dbName, 1, {
      async upgrade(db) {
        const store = db.createObjectStore(storeName, {
          keyPath: idx,
          autoIncrement: true,
        })
        store.createIndex(idx, idx)
      },
    })
    return db
  }

  async get(key: string): Promise<T | undefined> {
    const db = await this.openDB()
    return await db.get(this.storeName, key)
  }

  async getAll(idx: string = this.index): Promise<Array<T>> {
    const db = await this.openDB()
    return await db.getAllFromIndex(this.storeName, idx)
  }

  // With an key path IDB will use the key from the object to set, so no need to pass it here. If using put instead then key will be required.
  async set(value: T) {
    const db = await this.openDB()
    await db.put(this.storeName, value)
  }
}
