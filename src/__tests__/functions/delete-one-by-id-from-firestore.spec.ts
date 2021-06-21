import { deleteOneByIdFromFirestore } from '@/functions/delete-one-by-id-from-firestore'
import { isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  deleteOneByIdArgs,
} from '@/__tests__/__helpers__'
import { firestoreTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('DeleteOneByIdFromFirestore', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, db } = firestoreTestHelper()

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: deleteOneByIdFromFirestore(db()),
      collectionName,
      payload,
      id: value,
      args: deleteOneByIdArgs,
    }
  }

  it('should delete one', async () => {
    const { sut, collectionName, payload, args, id } = makeSut()

    await db().collection(collectionName).doc(id).set(payload)

    const response = await sut(args)

    const data = await db().collection(collectionName).doc(id).get()
    const fromDb = data?.exists ? data.data() : null

    const result = response === true && !isTruthy(fromDb)
    expectToBeTrue(result, {
      printIfNotTrue: { payload, response, fromDb, id, dataId: data.id },
    })
  })
})
