import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputRoots = ["dist", ".vercel/output/static"];
const cdata = (value) => value.replaceAll("]]>", "]]]]><![CDATA[>");

const absolutizeUrls = (html, siteUrl) =>
	html
		.replaceAll('href="/', `href="${siteUrl}/`)
		.replaceAll('src="/', `src="${siteUrl}/`);

const extractPostContent = async (root, slug, siteUrl) => {
	const postPath = join(root, "blog", slug, "index.html");
	const html = await readFile(postPath, "utf8");
	const match = html.match(/<div class="prose">([\s\S]*?)<\/div>\s*<\/article>/);

	if (!match) {
		throw new Error(`Could not find rendered post content in ${postPath}`);
	}

	return absolutizeUrls(match[1].trim(), siteUrl);
};

const addContentToFeed = async (root) => {
	const rssPath = join(root, "rss.xml");
	let rss = await readFile(rssPath, "utf8");
	const siteUrl = rss.match(/<link>(.*?)<\/link>/)?.[1]?.replace(/\/$/, "");

	if (!siteUrl) {
		throw new Error(`Could not find channel link in ${rssPath}`);
	}

	rss = rss.replace(
		"<rss version=\"2.0\">",
		'<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">'
	);

	const items = [...rss.matchAll(/<item>[\s\S]*?<\/item>/g)];

	for (const item of items) {
		const itemXml = item[0];
		const postUrl = itemXml.match(/<link>(.*?)<\/link>/)?.[1];
		const slug = postUrl?.match(/\/blog\/([^/]+)\//)?.[1];

		if (!slug) continue;

		const content = await extractPostContent(root, slug, siteUrl);
		const contentXml = `\n\t\t\t<content:encoded><![CDATA[${cdata(content)}]]></content:encoded>`;
		const updatedItem = itemXml.replace(
			/(<description>[\s\S]*?<\/description>)/,
			`$1${contentXml}`
		);

		rss = rss.replace(itemXml, updatedItem);
	}

	await writeFile(rssPath, rss, "utf8");
};

for (const root of outputRoots) {
	await addContentToFeed(root);
}

