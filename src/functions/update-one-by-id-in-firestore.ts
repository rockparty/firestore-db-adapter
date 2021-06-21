import type {
  UpdateOneByIdFn,
  UpdateOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function updateOneByIdInFirestore(
  db: firestore.Firestore,
): UpdateOneByIdFn {
  return async function <T, U>(
    args: UpdateOneByIdFnArgs<T, U>,
  ): Promise<(T & U) | null> {
    const { from: collectionName, id: idValue, as: payload } = args

    const id = typeof idValue === 'string' ? idValue : JSON.stringify(idValue)

    const doc = await db.collection(collectionName).doc(id).get()

    if (!doc?.exists) return null

    const original = doc.data() as T
    await doc.ref.update(payload)

    const updated = Object.assign({}, original, payload)

    return updated
  }
}
