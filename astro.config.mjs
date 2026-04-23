// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import vercel from '@astrojs/vercel';

import icon from "astro-icon";

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://ramawat.fyi',
    adapter: vercel({}),
    integrations: [icon(), mdx(), sitemap()],
    markdown: {
        syntaxHighlight: {
            type: 'shiki',
            // Do not highlight Mermaid diagrams
            excludeLangs: ['mermaid'],
        },
    },
});