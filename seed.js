const _ = require('lodash')
const db = require('./db')
const Chance = require('chance')
const chance = new Chance()

const seed = async () => {
  try {
    console.log('-------')
    await db.sync({force: true})
    console.log(' Cleared DB')
    const users = await createUsers()
    console.log(` Created ${users.length} users`)
    const posts = await createPosts(users)
    console.log(` Created ${posts.length} posts`)
    const comments = await createComments(posts, users)
    console.log(` Created ${comments.length} comments`)
    console.log(' Done.')
    console.log('-------\n')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = seed;

if (module === require.main) {
  seed();
}

const createUsers = async () => {
  const users = _.range(0, 10).map(x => {
    return db.models.user.create({
      name: chance.name(),
      bio: chance.paragraph()
    })
  })
  return Promise.all(users)
}


const createPosts = async (users) => {
  const userIds = users.map(user => user.id)
  const posts = _.range(0, 100).map(x => {
    return db.models.post.create({
      title: chanceTitle(),
      body: chanceText(),
      authorId: chance.pickone(userIds)
    })
  })
  return Promise.all(posts);
}

const createComments = async (posts, users) => {
  const postIds = posts.map(post => post.id);
  const userIds = users.map(user => user.id);
  const comments = _.range(0, 300).map(x => {
    return db.models.comment.create({
      body: chance.paragraph(),
      authorId: chance.pickone(userIds),
      postId: chance.pickone(postIds)
    })
  })
  return Promise.all(comments)
}

const chanceTitle = () => {
  const words = chance.integer({min: 3, max: 8});
  return chance.sentence({words})
}

const chanceText = () => {
  const numPars = chance.integer({min: 2, max: 8});
  return _.range(0, numPars).map(par => chance.paragraph()).join('\n\n')
}



// })
// .then((users) => {
//   const posts =
// })
// .then(() => {
//   console.log('synced!')
//   process.exit()
// })
// .catch(err => {
//   console.error(err);
//   process.exit()
// })
