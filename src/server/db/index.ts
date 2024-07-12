
// src/server/db/client.ts
import { type Client, createClient } from "edgedb";
import { env } from "@/env";
declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-redundant-type-constituents
  var edgedb: Client | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const edgedb = 
global.edgedb ?? createClient();

if (env.NODE_ENV !== "production") {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  global.edgedb = edgedb;
}
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// import { env } from "@/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });
