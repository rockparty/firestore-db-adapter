import { updateOneByIdInFirestore } from '@/functions/update-one-by-id-in-firestore'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  modified,
  value,
  modifiedValue,
  updateOneByIdArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('UpdateOneByIdInFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: updateOneByIdInFirestore(db()),
      collectionName,
      payload,
      modified,
      id: value,
      modifiedValue,
      args: updateOneByIdArgs,
    }
  }

  it('should update one', async () => {
    const { sut, collectionName, payload, id, args, modified } = makeSut()

    await db().collection(collectionName).doc(id).set(payload)

    const response = await sut(args)

    const data = await db().collection(collectionName).doc(id).get()
    const fromDb = data?.exists ? data.data() : null

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(response, modified) &&
      data.id === id
    expectToBeTrue(result, {
      printIfNotTrue: {
        payload,
        modified,
        response,
        fromDb,
        id,
        dataId: data.id,
      },
    })
  })
})
