import { insertOneInFirestore } from '@/functions'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  key,
  value,
  insertOneArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('InsertOneInFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: insertOneInFirestore(db()),
      collectionName,
      payload,
      key,
      value,
      args: insertOneArgs,
    }
  }

  it('should insert one', async () => {
    const { sut, collectionName, payload, key, value, args } = makeSut()

    const response = await sut(args)

    const data = await db()
      .collection(collectionName)
      .where(key, '==', value)
      .get()
    const fromDb = data.docs[0]?.exists ? data.docs[0].data() : null

    const result = isTruthy(fromDb) && equals(payload, fromDb)
    expectToBeTrue(result, { printIfNotTrue: { response, fromDb } })
  })
})
