import { updateOneInFirestore } from '@/functions/update-one-in-firestore'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  modified,
  key,
  value,
  modifiedValue,
  updateOneArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('UpdateOneInFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: updateOneInFirestore(db()),
      collectionName,
      payload,
      modified,
      key,
      value,
      modifiedValue,
      args: updateOneArgs,
    }
  }

  it('should update one', async () => {
    const { sut, collectionName, payload, key, args, modified, modifiedValue } =
      makeSut()

    await db().collection(collectionName).add(payload)

    const response = await sut(args)

    const data = await db()
      .collection(collectionName)
      .where(key, '==', modifiedValue)
      .get()
    const fromDb = data.docs[0]?.exists ? data.docs[0].data() : null

    const result =
      isTruthy(response) && isTruthy(fromDb) && equals(response, modified)
    expectToBeTrue(result, {
      printIfNotTrue: { payload, modified, response, fromDb },
    })
  })
})
