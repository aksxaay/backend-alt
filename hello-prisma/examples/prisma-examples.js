const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here

  // console.dir(allUsers);

  // CREATE
  await prisma.user.create({
    data: {
      email: "create@gmail.com",
      name: "sampleName",
    },
  });

  // FINDALL
  const user = await prisma.user.findMany({
    where: { email: "sample@gmail.com" },
  });

  console.dir(user, { depth: null });

  user[0] = {
    email: "create@gmail.com",
  };

  // DELETE
  await prisma.user.delete({
    where: user[0],
  });
  
  // UPDATE ALL
  await prisma.user.update({
    where: {
      email: "sample@gmail.com",
    },
    data: {
      name: "Voila the Magnificent",
      email: "voila@gmail.com",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
