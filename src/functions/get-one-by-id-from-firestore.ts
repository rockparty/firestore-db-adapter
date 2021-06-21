import type { GetOneByIdFn, GetOneByIdFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function getOneByIdFromFirestore(db: firestore.Firestore): GetOneByIdFn {
  return async function <T>(args: GetOneByIdFnArgs<T>): Promise<T | null> {
    const { from: collectionName, id: idValue } = args

    const id = typeof idValue === 'string' ? idValue : JSON.stringify(idValue)

    const doc = await db.collection(collectionName).doc(id).get()

    const founded = doc?.exists ? (doc.data() as T) : null

    return founded
  }
}
