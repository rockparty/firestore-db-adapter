import type { DeleteOneFn, DeleteOneFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function deleteOneFromFirestore(db: firestore.Firestore): DeleteOneFn {
  return async function <T>(args: DeleteOneFnArgs<T>): Promise<boolean> {
    const { from: collectionName, by: key, matching: value } = args

    const result = await db
      .collection(collectionName)
      .where(key, '==', value)
      .limit(1)
      .get()
    const doc = result.docs[0]?.exists ? result.docs[0] : null

    if (!doc) return false

    await doc.ref.delete()

    return true
  }
}
