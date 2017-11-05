import Chance from 'chance'
import { range } from 'lodash'

const chance = new Chance()

export default {
  users: range(1, 11).map(id => {
    return { id, name: chance.name() }
  }),

  posts: range(1, 6).map(id => {
    return {
      id,
      title: chance.word(),
      body: chanceText()
    }
  }),

  comments: range(1, 3).map(id => {
    return {
      id,
      body: chance.paragraph()
    }
  })
}


function chanceText() {
  const numPars = chance.integer({min: 2, max: 8});
  return _.range(0, numPars).map(par => chance.paragraph()).join('\n\n')
}
