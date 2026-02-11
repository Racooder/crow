import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default defineConfig({
    schema: "src/prisma/schema.prisma",
    migrations: {
        path: "src/prisma/migrations",
    },
    engine: "classic",
    datasource: {
        url: env("DATABASE_URL"),
        shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
    },
});
