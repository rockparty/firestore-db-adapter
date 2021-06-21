import { getManyFromFirestore } from '@/functions/get-many-from-firestore'
import {
  expectToBeTrue,
  collectionName,
  payload,
  key,
  value,
  getManyArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetManyFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getManyFromFirestore(db()),
      collectionName,
      payload,
      key,
      value,
      args: getManyArgs,
    }
  }

  it('should return many', async () => {
    const { sut, collectionName, payload, args, key, value } = makeSut()

    await db().collection(collectionName).add(payload)

    const data = await db()
      .collection(collectionName)
      .where(key, '==', value)
      .get()
    const fromDb = data.docs

    const response = await sut(args)

    const result = response.length === 1 && fromDb.length === 1
    expectToBeTrue(result, { printIfNotTrue: { response, fromDb } })
  })
})
