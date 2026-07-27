import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return rss({
    title: 'Trooper\'s Portfolio',
    description: 'Trooper\'s projects, blog, and more.',
    site: context.site ?? 'https://stormtrooper720.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: withBase(`/blog/${post.id}/`),
      categories: post.data.tags,
    })),
  });
}
