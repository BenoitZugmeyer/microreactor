const batch = require("../batch")
const observe = require("../observe")
const Variable = require("../Variable")

const unobserveFunctions = new Set()

afterEach(() => {
  unobserveFunctions.forEach(fn => fn())
})

test("it is a function", () => {
  expect(typeof batch).toBe("function")
})

test("should batch 'set' calls reactions", () => {
  const variable = new Variable(1)
  const reaction = jest.fn(() => {
    variable.get()
  })

  unobserveFunctions.add(observe(reaction))

  expect(reaction.mock.calls.length).toBe(1)

  batch(() => {
    variable.set(2)
    variable.set(3)
  })

  expect(reaction.mock.calls.length).toBe(2)
})
