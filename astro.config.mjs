// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import vercel from '@astrojs/vercel';

import icon from "astro-icon";

import mdx from '@astrojs/mdx';

export default defineConfig({
    adapter: vercel({}),
    integrations: [icon(), mdx()]
});