import type {
  DeleteOneByIdFn,
  DeleteOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function deleteOneByIdFromFirestore(
  db: firestore.Firestore,
): DeleteOneByIdFn {
  return async function (args: DeleteOneByIdFnArgs): Promise<boolean> {
    const { from: collectionName, id: idValue } = args

    const id = typeof idValue === 'string' ? idValue : JSON.stringify(idValue)

    const doc = await db.collection(collectionName).doc(id).get()

    if (!doc?.exists) return false

    await doc.ref.delete()

    return true
  }
}
