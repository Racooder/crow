import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient()
    .$extends(withAccelerate());

export default prisma;
