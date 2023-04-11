import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { sortedBlogs, sortedTags } from '@/app/content'
import BlogRow from '@/ui/components/blog-row'
import Container from '@/ui/components/container'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return sortedTags.map(tag => tag.slug)
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = sortedTags.find(t => t.slug === params.slug)
  if (!tag) {
    return {
      title: 'Not Found'
    }
  }
  return {
    title: tag.title,
    description: tag.description,
    openGraph: {
      title: tag.title,
      description: tag.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tag.title,
      description: tag.description,
    },
  }
}

export default function Tag({ params }: Props) {
  const tag = sortedTags.find(t => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  const otherTags = sortedTags.filter(t => t._id !== tag._id)
  const blogs = sortedBlogs.filter(b => b.tag?._id === tag._id)

  return (
    <section>
      <Container size='tight' className='mt-[-1.5rem] flex flex-col gap-8 text-center'>
        <h1 className='text-4xl font-extrabold leading-[1.3] text-orange-400'>
          #{tag.title}
        </h1>

        <div className='text-[1.7rem] dark:text-white'>
          {tag.description}
        </div>

        <div>
          <span className='mr-2 mt-2 font-bold text-white'>More:</span>
            {otherTags.map(tag => (
              <Link
                href={`/tag/${tag.slug}`}
                key={tag.slug}
                className='ml-1 break-keep font-bold text-slate-800 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-400'
              >
                #{tag.title}
              </Link>
            ))}
        </div>
      </Container>

      <div className='flex grow py-[6rem]'>
        <Container size='tight' className='divide-y divide-slate-200'>
          {blogs.map((blog) => <BlogRow blog={blog} key={blog._id}/>)}
        </Container>
      </div>
    </section>
  )
}
