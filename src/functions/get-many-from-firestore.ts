import type { GetManyFn, GetManyFnArgs } from '@rockparty/db-adapter'
import type { firestore } from 'firebase-admin/lib/firestore'

export function getManyFromFirestore(db: firestore.Firestore): GetManyFn {
  return async function <T>(args: GetManyFnArgs<T>): Promise<T[]> {
    const { from: collectionName, by: key, matching: value } = args

    const result = await db
      .collection(collectionName)
      .where(key, '==', value)
      .get()

    const founded = result.docs

    const mapped = founded.map((d) => d.data() as T)

    return mapped
  }
}
