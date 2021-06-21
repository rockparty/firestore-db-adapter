import { deleteOneFromFirestore } from '@/functions'
import { isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  key,
  value,
  deleteOneArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('DeleteOneFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: deleteOneFromFirestore(db()),
      collectionName,
      payload,
      key,
      value,
      args: deleteOneArgs,
    }
  }

  it('should delete one', async () => {
    const { sut, collectionName, payload, key, args, value } = makeSut()

    await db().collection(collectionName).add(payload)

    const response = await sut(args)

    const data = await db()
      .collection(collectionName)
      .where(key, '==', value)
      .get()
    const fromDb = data.docs[0]?.exists ? data.docs[0].data() : null

    const result = response === true && !isTruthy(fromDb)
    expectToBeTrue(result, {
      printIfNotTrue: { payload, response, fromDb },
    })
  })
})
