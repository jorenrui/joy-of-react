import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = React.lazy(() => import('@/components/DivisionGroupsDemo'));
const CircularColorsDemo = React.lazy(() => import('@/components/CircularColorsDemo'));

const COMPONENTS = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
}

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) return notFound();

  return {
    title: `${post.frontmatter.title} • ${BLOG_TITLE}`,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) notFound();

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={COMPONENTS}
          lazy
        />
      </div>
    </article>
  );
}

export default BlogPost;
