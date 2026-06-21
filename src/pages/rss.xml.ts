import { getCollection } from "astro:content";

const escapeXml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");

export async function GET({ site }: { site: URL }) {
	const posts = (await getCollection("blog"))
		.filter((post) => !post.data.draft && !post.data.hideBlogLink)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const items = posts
		.map((post) => {
			const url = new URL(`/blog/${post.id}/`, site).toString();
			const tags =
				post.data.tags
					?.map((tag) => `<category>${escapeXml(tag)}</category>`)
					.join("") ?? "";

			return `
		<item>
			<title>${escapeXml(post.data.title)}</title>
			<link>${url}</link>
			<guid>${url}</guid>
			<description>${escapeXml(post.data.description)}</description>
			<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
			${tags}
		</item>`;
		})
		.join("");

	const latestPost = posts[0]?.data.pubDate ?? new Date();

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>Udit Ramawat</title>
		<link>${site.toString()}</link>
		<description>Personal blog and portfolio of Udit Ramawat.</description>
		<language>en-us</language>
		<lastBuildDate>${latestPost.toUTCString()}</lastBuildDate>
		${items}
	</channel>
</rss>`,
		{
			headers: {
				"Content-Type": "application/rss+xml; charset=utf-8",
			},
		}
	);
}
