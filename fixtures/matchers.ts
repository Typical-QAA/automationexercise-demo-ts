import { expect as expectBase } from '@playwright/test'
import Ajv from 'ajv'

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeValidSchema(schema: object): R
      toBeAnyOf<T>(...possibilities: T[]): R
    }
  }
}

export const expect = expectBase.extend({
  toBeValidSchema(received: object, schema: object) {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, received)

    const message = () => {
      const matcherName = 'toBeValidSchema'
      const hint = this.utils.matcherHint(matcherName, undefined, 'schema', { isNot: this.isNot })

      if (this.isNot) {
        return `${hint}\n\nExpected: not to be a valid schema\nReceived: a valid schema`
      }

      const errors = ajv.errorsText()
      return `${hint}\n\nSchema validation failed:\n\n${errors}`
    }

    return { message, pass: valid }
  },

  toBeAnyOf(received, ...possibilities) {
    const pass = possibilities.some(possibility => {
      try {
        expectBase(received).toEqual(possibility)
        return true
      } catch {
        return false
      }
    })

    const message = () => {
      const matcherName = 'toBeAnyOf'
      const receivedStr = this.utils.printReceived(received)
      const expectedStr = possibilities.map(p => this.utils.printExpected(p)).join(', ')

      const hint = this.utils.matcherHint(matcherName, undefined, undefined, { isNot: this.isNot })

      if (this.isNot) {
        return `${hint}\n\nExpected: not any of [${expectedStr}]\n` + `Received: ${receivedStr}`
      }

      return `${hint}\n\nExpected: any of [${expectedStr}]\n` + `Received: ${receivedStr}`
    }

    return { message, pass }
  }
})
