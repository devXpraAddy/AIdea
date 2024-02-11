import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient(); // we are doing this coz in Next13 it may be possible that there are many prisma client initialzed when we hot reload (this will save us from the warning of multiple prisma client active)
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
