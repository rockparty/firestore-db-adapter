# Firestore database adapter

## Firestore database adapter for javascript/typescript

### Requirements

Node.js

### Install

You can install '@rockparty/firestore-db-adapter' by entering this command

```
npm install @rockparty/firestore-db-adapter
```

### Example

```ts
import firestoreDbAdapter from '@rockparty/firestore-db-adapter'

firestoreDbAdapter({
  ...options,
}).then(async (db) => {
  const inserted = await db.insertOne({
    in: 'test',
    as: {
      foo: 'bar',
    },
  })

  const all = await db.getAll({
    from: 'test',
  })

  console.log(inserted, all) // { foo: 'bar' } [ { foo: 'bar' } ]
})
```

## License

Licensed under [MIT](./LICENSE).
