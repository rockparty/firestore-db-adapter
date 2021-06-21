import { getAllFromFirestore } from '@/functions/get-all-from-firestore'
import {
  expectToBeTrue,
  collectionName,
  payload,
  getAllArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetAllFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getAllFromFirestore(db()),
      collectionName,
      payload,
      args: getAllArgs,
    }
  }

  it('should return all', async () => {
    const { sut, collectionName, payload, args } = makeSut()

    await db().collection(collectionName).add(payload)

    const data = await db().collection(collectionName).get()
    const fromDb = data.docs

    const response = await sut(args)

    const result = response.length === 1 && fromDb.length === 1
    expectToBeTrue(result, { printIfNotTrue: { response, fromDb } })
  })
})
