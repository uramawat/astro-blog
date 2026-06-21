import { cp, rm } from "node:fs/promises";

const source = new URL("../dist/pagefind/", import.meta.url);
const target = new URL("../public/pagefind/", import.meta.url);

await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });

