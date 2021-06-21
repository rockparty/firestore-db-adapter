import type { GetAllFn, GetAllFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function getAllFromFirestore(db: firestore.Firestore): GetAllFn {
  return async function <T>(args: GetAllFnArgs<T>): Promise<T[]> {
    const { from: collectionName } = args

    const result = await db.collection(collectionName).get()

    const founded = result.docs

    const mapped = founded.map((d) => d.data() as T)

    return mapped
  }
}
