import { PrismaClient, PostGetPayload, UserGetPayload } from '@prisma/client'

const prisma = new PrismaClient()

type PostWithAuthor = PostGetPayload<{
  include: { author: true }
}>

type UserWithPosts = UserGetPayload<{
  include: { posts: true }
}>

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
  // const post = await prisma.post.create({
  //   data: {
  //     title: 'Hello World!'
  //   }
  // });

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io'
  //   }
  // })
  // console.log(user);

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);

  const allPosts = await prisma.post.findMany();
  console.log(allPosts);

  // const postWithAuthor = await prisma.post.findOne({
  //   where: { id: 1 },
  //   include: { author: true }
  // })
  // console.log(postWithAuthor);

  // const userWithPosts = await prisma.user.findOne({
  //   where: { id: 1 },
  //   include: { posts: true }
  // })
  // console.log(userWithPosts);

  // const temp1 = uppercaseNameAndTitle(postWithAuthor!);
  // const temp2 = getUserWithPostSentence(userWithPosts!);

  // console.log({ temp1, temp2 });

  // const sql = `
  // SELECT MAX ("createdAt") AS "most-recent-post" 
  // FROM "public"."Post";
  // `

  // const result = await prisma.queryRaw(sql)
  // console.log(result[0]["most-recent-post"])

  // const result = await prisma.user.create({
  //   data: {
  //     email: 'davy.hausser@gmail.com',
  //     name: 'Davy',
  //     posts: {
  //       create: { title: 'Hello Prisma Day 2020' }
  //     },
  //     profile: {
  //       create: {
  //         bio: 'I like pizza'
  //       }
  //     }
  //   }
  // })
  // const result = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true
  //   }
  // });
  // console.dir(result, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect())
