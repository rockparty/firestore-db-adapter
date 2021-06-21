import type {
  InsertOneByIdFn,
  InsertOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function insertOneByIdInFirestore(
  db: firestore.Firestore,
): InsertOneByIdFn {
  return async function <T>(args: InsertOneByIdFnArgs<T>): Promise<T> {
    const { in: collectionName, as: payload, idKey } = args

    const idKeyValue = payload[idKey]

    const id =
      typeof idKeyValue === 'string' ? idKeyValue : JSON.stringify(idKeyValue)

    await db.collection(collectionName).doc(id).set(payload)

    return payload
  }
}
