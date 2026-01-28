// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import vercel from '@astrojs/vercel';

import icon from "astro-icon";

export default defineConfig({
    adapter: vercel({}),
    integrations: [icon()]
});
