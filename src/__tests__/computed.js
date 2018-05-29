const createComputed = require("../createComputed")
const Variable = require("../Variable")

test("it should be a function", () => {
  expect(typeof createComputed).toBe("function")
})

test("it should cache the result", () => {
  const reaction = jest.fn(() => {
    return 42
  })

  const computed = createComputed(reaction)

  expect(reaction.mock.calls.length).toBe(0)

  const result = computed()

  expect(result).toBe(42)
  expect(reaction.mock.calls.length).toBe(1)

  const result2 = computed()

  expect(result2).toBe(42)
  expect(reaction.mock.calls.length).toBe(1)
})

test("it should cache the result when depending on other Variable", () => {
  const variable = new Variable(1)

  const reaction = jest.fn(() => {
    return variable.get() + 1
  })

  const computed = createComputed(reaction)

  expect(reaction.mock.calls.length).toBe(0)

  expect(computed()).toBe(2)
  expect(reaction.mock.calls.length).toBe(1)

  expect(computed()).toBe(2)
  expect(reaction.mock.calls.length).toBe(1)

  variable.set(2)

  expect(computed()).toBe(3)
  expect(reaction.mock.calls.length).toBe(2)
})

test("it can depend on other computed values", () => {
  const reaction1 = jest.fn(() => 1)
  const computed1 = createComputed(reaction1)

  const reaction2 = jest.fn(() => computed1())
  const computed2 = createComputed(reaction2)

  expect(reaction1.mock.calls.length).toBe(0)
  expect(reaction2.mock.calls.length).toBe(0)

  expect(computed2()).toBe(1)
  expect(computed1()).toBe(1)

  expect(reaction1.mock.calls.length).toBe(1)
  expect(reaction2.mock.calls.length).toBe(1)
})
