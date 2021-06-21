import type { ServiceAccount, app, firestore } from 'firebase-admin'
import {
  clearFirestoreData,
  initializeAdminApp,
  apps,
} from '@firebase/rules-unit-testing'

export function firestoreTestHelper() {
  const projectId = 'test-project'

  let credentials: ServiceAccount
  let admin: app.App
  let db: firestore.Firestore

  const doBeforeAll = async (): Promise<void> => {
    credentials = { projectId }
    admin = initializeAdminApp(credentials)
    db = admin.firestore()
  }

  const doBeforeEach = (): Promise<void> => clearFirestoreData({ projectId })

  const doAfterAll = (): Promise<unknown[]> =>
    Promise.all(apps().map((app) => app.delete()))

  return {
    db: () => db,
    doBeforeAll,
    doBeforeEach,
    doAfterAll,
  }
}
