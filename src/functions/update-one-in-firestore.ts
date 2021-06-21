import type { UpdateOneFn, UpdateOneFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function updateOneInFirestore(db: firestore.Firestore): UpdateOneFn {
  return async function <T, U>(
    args: UpdateOneFnArgs<T, U>,
  ): Promise<(T & U) | null> {
    const { from: collectionName, by: key, matching: value, as: payload } = args

    const result = await db
      .collection(collectionName)
      .where(key, '==', value)
      .limit(1)
      .get()
    const doc = result.docs[0]?.exists ? result.docs[0] : null

    if (!doc) return null

    const original = doc.data()
    await doc.ref.update(payload)

    const updated = Object.assign({}, original, payload)

    return updated as T & U
  }
}
