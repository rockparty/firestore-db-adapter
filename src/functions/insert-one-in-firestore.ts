import type { InsertOneFn, InsertOneFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function insertOneInFirestore(db: firestore.Firestore): InsertOneFn {
  return async function <T>(args: InsertOneFnArgs<T>): Promise<T> {
    const { in: collectionName, as: payload } = args

    await db.collection(collectionName).add(payload)

    return payload
  }
}
