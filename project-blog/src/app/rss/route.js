import fs from 'fs';
import RSS from 'rss';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE, SITE_URL } from '@/constants';


const RSS_OPTIONS = {
  title: BLOG_TITLE,
  description: 'Blog site for JavaScript.',
  pubDate: new Date(),
  copyright: `All rights reserved 2023 - ${new Date().getFullYear()}, Joeylene @jorenrui`,
  site_url: SITE_URL,
  image_url: `${SITE_URL}/logo.png`,
  feed_url: `${SITE_URL}/rss.xml`,
};

export async function GET() {
  const posts = await getBlogPostList();
  const feed = new RSS(RSS_OPTIONS);

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `${SITE_URL}/${post.slug}`,
    });
  });

  const data = feed.xml({ indent: true });
  fs.writeFileSync('./public/rss.xml', data);
  
  return new Response(data, {
    headers: {
      'content-type': 'text/xml',
    },
  });
}
