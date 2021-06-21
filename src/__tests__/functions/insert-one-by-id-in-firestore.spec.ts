import { insertOneByIdInFirestore } from '@/functions/insert-one-by-id-in-firestore'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  insertOneByIdArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('InsertOneByIdInFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: insertOneByIdInFirestore(db()),
      collectionName,
      payload,
      id: value,
      args: insertOneByIdArgs,
    }
  }

  it('should insert one', async () => {
    const { sut, collectionName, payload, id, args } = makeSut()

    const response = await sut(args)

    const data = await db().collection(collectionName).doc(id).get()
    const fromDb = data.data()

    const result = isTruthy(fromDb) && equals(payload, fromDb) && data.id === id
    expectToBeTrue(result, {
      printIfNotTrue: { response, fromDb, id, dataId: data.id },
    })
  })
})
