import { faker } from '@faker-js/faker'

export class TextDataFactory {
  static getSentence(): string {
    return faker.lorem.sentence()
  }

  static getParagraph(): string {
    return faker.lorem.paragraph()
  }
}

