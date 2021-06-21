import { getOneFromFirestore } from '@/functions/get-one-from-firestore'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  key,
  value,
  getOneArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetOneFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getOneFromFirestore(db()),
      collectionName,
      payload,
      args: getOneArgs,
    }
  }

  it('should return one', async () => {
    const { sut, collectionName, payload, args } = makeSut()

    await db().collection(collectionName).add(payload)

    const data = await db()
      .collection(collectionName)
      .where(key, '==', value)
      .get()
    const fromDb = data.docs[0].data()

    const response = await sut(args)

    const result =
      isTruthy(response) && isTruthy(fromDb) && equals(response, fromDb)
    expectToBeTrue(result, { printIfNotTrue: { response, fromDb } })
  })
})
