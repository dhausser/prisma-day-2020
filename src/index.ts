import { PrismaClient, PostGetPayload, UserGetPayload } from '@prisma/client'

const prisma = new PrismaClient()

type PostWithAuthor = PostGetPayload<{
  include: { author: true }
}>

type UserWithPosts = UserGetPayload<{
  include: { posts: true }
}>

type MostRecentPost = {
  'most-recent-post': String
}

function uppercaseNameAndTitle(postWithAuthor: PostWithAuthor) {
  postWithAuthor.title = postWithAuthor.title.toUpperCase()
  if (postWithAuthor.author) {
    postWithAuthor.author.name =
      postWithAuthor.author?.name?.toUpperCase() || null
  }
  return postWithAuthor
}

function getUserWithPostSentence(userWithPosts: UserWithPosts) {
  const sentence = `User ${userWithPosts.email} has written ${userWithPosts.posts.length} posts.`
  return sentence
}

async function main() {
  // Chapter 2

  // // task 1
  // const allPosts = await prisma.post.findMany({
  //   include: { categories: true }
  // });
  // console.dir(allPosts, { depth: null })

  // // task 2
  // const post0 = await prisma.post.create({
  //   data: {
  //     title: 'Hello World!'
  //   }
  // })
  // console.log(post0)

  // // task 3
  // const user0 = await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io"
  //   }
  // })
  // console.log(user0)

  // // task 4
  // const post1 = await prisma.post.update({
  //   where: { id: 1 },
  //   data: {
  //     author: {
  //       connect: { email: "alice@prisma.io" }
  //     }
  //   }
  // })
  // console.log(post1);

  // // task 5
  // const post2 = await prisma.post.findOne({
  //   where: { id: 1 },
  //   include: { author: true }
  // })
  // console.dir(post2, { depth: null });

  // // task 6
  // const post3 = await prisma.post.findOne({
  //   where: { id: 1 },
  //   include: { author: true }
  // })
  // console.log(post3)

  // // task 8
  // const user1 = await prisma.user.create({
  //   data: {
  //     name: 'Davy',
  //     email: 'davy@prisma.io',
  //     profile: {
  //       create: { bio: "..." }
  //     },
  //     posts: {
  //       create: [{ title: "This is my first post" }, { title: "Here comes a second post" }]
  //     }
  //   }
  // })
  // console.log(user1)

  // // task 9
  // const postWithAuthor = await prisma.post.findOne({
  //   where: { id: 1 },
  //   include: { author: true }
  // })
  // console.log(postWithAuthor);

  // const userWithPosts = await prisma.user.findOne({
  //   where: { id: 1 },
  //   include: { posts: true }
  // })
  // console.log(userWithPosts)

  // if (postWithAuthor) console.log(uppercaseNameAndTitle(postWithAuthor))
  // if (userWithPosts) console.log(getUserWithPostSentence(userWithPosts))

  // // task 10
  // const sql = `
  // SELECT MAX ("createdAt") AS "most-recent-post" 
  // FROM "public"."Post";
  // `

  // const users: [MostRecentPost] = await prisma.queryRaw(sql)
  // console.log(users[0]["most-recent-post"])

  // Chapter 3

  // task 2
  // const postWithCategories = await prisma.post.update({
  //   where: { id: 1 },
  //   data: {
  //     categories: {
  //       create: [{ name: 'Random' }, { name: 'Greetings' }]
  //     }
  //   }
  // })
  // console.log(postWithCategories);

  // task 3
  // const cat3 = await prisma.category.create({
  //   data: {
  //     name: 'Diary'
  //   }
  // })
  // const post = await prisma.categoryToPost.create({
  //   data: {
  //     Category: {
  //       connect: { id: 1 }
  //     },
  //     Post: {
  //       connect: { id: 1 }
  //     },
  //     User: {
  //       connect: { email: "alice@prisma.io" }
  //     }
  //   }
  // })
  // console.log(post)

  // const result = await prisma.categoryToPost.findMany()
  // const result = await prisma.categoryToPost.deleteMany({})
  // console.log(result);

}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect())
