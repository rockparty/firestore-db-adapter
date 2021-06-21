import {
  DeleteOneByIdFnArgs,
  DeleteOneFnArgs,
  GetAllFnArgs,
  GetManyFnArgs,
  GetOneByIdFnArgs,
  GetOneFnArgs,
  InsertOneByIdFnArgs,
  InsertOneFnArgs,
  UpdateOneByIdFnArgs,
  UpdateOneFnArgs,
} from '@rockparty/db-adapter'

interface Foo {
  foo: string
}

export const collectionName = 'test'
export const payload: Foo = { foo: 'bar' }
export const modified: Partial<Foo> = { foo: 'foo' }
export const key: keyof Foo = 'foo'
export const value = payload[key]
export const modifiedValue = modified[key]

export const insertOneArgs: InsertOneFnArgs<Foo> = {
  in: collectionName,
  as: payload,
}

export const getOneArgs: GetOneFnArgs<Foo> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const updateOneArgs: UpdateOneFnArgs<Foo, Partial<Foo>> = {
  from: collectionName,
  by: key,
  matching: value,
  as: modified,
}

export const deleteOneArgs: DeleteOneFnArgs<Foo> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const getAllArgs: GetAllFnArgs<Foo> = {
  from: collectionName,
}

export const getManyArgs: GetManyFnArgs<Foo> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const insertOneByIdArgs: InsertOneByIdFnArgs<Foo> = {
  in: collectionName,
  as: payload,
  idKey: key,
}

export const getOneByIdArgs: GetOneByIdFnArgs = {
  from: collectionName,
  id: value,
}

export const updateOneByIdArgs: UpdateOneByIdFnArgs<Foo, Partial<Foo>> = {
  from: collectionName,
  id: value,
  as: modified,
}

export const deleteOneByIdArgs: DeleteOneByIdFnArgs = {
  from: collectionName,
  id: value,
}
