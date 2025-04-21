import {drizzle} from "drizzle-orm/libsql";
import {createClient} from "@libsql/client/node";
import {get_env} from "../../config/env.ts";
import {registerAdapter} from "./registry.ts";


registerAdapter("sqlite", async () => {
    const raw = get_env("SQLITE_URL", "./src/qbin_local.db");
    const url = /^(?:file:|https?:)/.test(raw) ? raw : `file:${raw}`;
    const authToken = get_env("SQLITE_AUTH_TOKEN");
    const client = createClient({ url, authToken });
    const db = drizzle(client);
    return {
        db,
        close: () => client.close?.(),
    };
});
