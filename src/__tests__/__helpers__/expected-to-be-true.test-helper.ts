export const expectToBeTrue = (
  expected: boolean,
  opts: { printIfNotTrue?: any } = {},
) => {
  const { printIfNotTrue } = opts
  !expected && printIfNotTrue && console.dir(printIfNotTrue, { depth: null })
  expect(expected).toBe(true)
}
