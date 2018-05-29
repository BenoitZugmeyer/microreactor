const observe = require("../observe")
const Variable = require("../Variable")

const unobserveFunctions = new Set()

afterEach(() => {
  unobserveFunctions.forEach(fn => fn())
})

test("observe a Variable", () => {
  const variable = new Variable(42)
  let currentVariable
  const reaction = jest.fn(() => {
    currentVariable = variable.get()
  })

  unobserveFunctions.add(observe(reaction))

  expect(reaction.mock.calls.length).toBe(1)
  expect(currentVariable).toBe(42)

  variable.set(51)

  expect(reaction.mock.calls.length).toBe(2)
  expect(currentVariable).toBe(51)
})

test("unobserve a Variable", () => {
  const variable = new Variable(42)
  let currentVariable
  const reaction = jest.fn(() => {
    currentVariable = variable.get()
  })

  const unobserve = observe(reaction)
  unobserveFunctions.add(unobserve)

  expect(reaction.mock.calls.length).toBe(1)
  expect(currentVariable).toBe(42)

  unobserve()

  variable.set(51)

  expect(reaction.mock.calls.length).toBe(1)
  expect(currentVariable).toBe(42)
})

test("change dependencies according to conditionals", () => {
  const condition = new Variable(false)
  const variable = new Variable(100)

  let value
  const reaction = jest.fn(() => {
    if (condition.get()) {
      value = variable.get()
    } else {
      value = -1
    }
  })

  unobserveFunctions.add(observe(reaction))

  expect(reaction.mock.calls.length).toBe(1)
  expect(value).toBe(-1)

  variable.set(101)

  expect(reaction.mock.calls.length).toBe(1)
  expect(value).toBe(-1)

  condition.set(true)

  expect(reaction.mock.calls.length).toBe(2)
  expect(value).toBe(101)

  variable.set(102)

  expect(reaction.mock.calls.length).toBe(3)
  expect(value).toBe(102)

  condition.set(false)

  expect(reaction.mock.calls.length).toBe(4)
  expect(value).toBe(-1)
})
