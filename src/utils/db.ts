// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL!,
// });
// export default prisma;



import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prismaClientSingleton = () => {
    return new PrismaClient({adapter})
}

 
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma



// import { PrismaClient } from '@prisma/client'
// import { Console } from 'console'

// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }

// declare global {
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// console.log(prisma);

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// console.log("ENV CHECK:", process.env.DATABASE_URL);