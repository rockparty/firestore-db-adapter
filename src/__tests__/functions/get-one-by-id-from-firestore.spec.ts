import { getOneByIdFromFirestore } from '@/functions/get-one-by-id-from-firestore'
import { equals, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  getOneByIdArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetOneByIdFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getOneByIdFromFirestore(db()),
      collectionName,
      payload,
      id: value,
      args: getOneByIdArgs,
    }
  }

  it('should return one', async () => {
    const { sut, collectionName, payload, args, id } = makeSut()

    await db().collection(collectionName).doc(id).set(payload)

    const data = await db().collection(collectionName).doc(id).get()
    const fromDb = data?.exists ? data.data() : null

    const response = await sut(args)

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(response, fromDb) &&
      data.id == id
    expectToBeTrue(result, {
      printIfNotTrue: { response, fromDb, id, dataId: data.id },
    })
  })
})
