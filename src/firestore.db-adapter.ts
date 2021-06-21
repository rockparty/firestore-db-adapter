import type {
  InsertOneAdapter,
  GetOneAdapter,
  UpdateOneAdapter,
  DeleteOneAdapter,
  GetAllAdapter,
  GetManyAdapter,
} from '@rockparty/db-adapter'
import {
  deleteOneFromFirestore,
  getAllFromFirestore,
  getManyFromFirestore,
  getOneFromFirestore,
  insertOneInFirestore,
  updateOneInFirestore,
} from './functions'
import type { AppOptions } from 'firebase-admin'
import { initializeApp } from 'firebase-admin'

type FirestoreDbAdapter = InsertOneAdapter &
  GetOneAdapter &
  UpdateOneAdapter &
  DeleteOneAdapter &
  GetAllAdapter &
  GetManyAdapter

export async function firestoreDbAdapter(
  opts: {
    appOpts?: AppOptions
    appName?: string
  } = {},
): Promise<FirestoreDbAdapter> {
  const { appOpts, appName } = opts

  const admin = initializeApp(appOpts, appName)
  const db = admin.firestore()

  return {
    insertOne: insertOneInFirestore(db),
    getOne: getOneFromFirestore(db),
    updateOne: updateOneInFirestore(db),
    deleteOne: deleteOneFromFirestore(db),
    getAll: getAllFromFirestore(db),
    getMany: getManyFromFirestore(db),
  }
}
