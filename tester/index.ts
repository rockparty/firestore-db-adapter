import firestoreDbAdapter from '@rockparty/firestore-db-adapter'

firestoreDbAdapter().then(async (db) => {
  const inserted = await db.insertOne({
    in: 'test',
    as: {
      foo: 'bar',
    },
  })

  const all = await db.getAll({
    from: 'test',
  })

  console.log(inserted, all)
})
