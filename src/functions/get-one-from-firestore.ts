import type { GetOneFn, GetOneFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function getOneFromFirestore(db: firestore.Firestore): GetOneFn {
  return async function <T>(args: GetOneFnArgs<T>): Promise<T | null> {
    const { from: collectionName, by: key, matching: value } = args

    const result = await db
      .collection(collectionName)
      .where(key, '==', value)
      .get()

    const founded = result.docs[0]?.exists ? (result.docs[0].data() as T) : null

    return founded
  }
}
