import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { LinkHTMLAttributes, PropsWithChildren } from 'react';

function CustomLink(props: LinkHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith('/')) {
    return (
      <Link href={href as any} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
}

function RoundedImage({ alt, ...props}: ImageProps) {
  return (
    <Image
      alt={alt}
      fill
      className='rounded-lg object-contain w-full !h-[unset] !relative bg-white col-wide'
      {...props}
    />
  )
}

function Blockquote(props: PropsWithChildren<unknown>) {
  return (
    <blockquote className='border-l-[5px] border-orange-400 bg-gray-100 py-0.5 text-[2.1rem] font-bold not-italic tracking-tight text-slate-600'>
      {props.children}
    </blockquote>
  )
}

const components: Record<string, any> = {
  img: RoundedImage,
  a: CustomLink,
  blockquote: Blockquote,
}

export default function Markdown({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return (
    <article className={clsx(
      'grid grid-cols-canvas [&>*]:col-main',
      'max-w-none [&_p:has(img.col-wide)]:col-wide',
      'prose prose-neutral prose-tight dark:prose-invert marker:text-black',
      'text-base leading-7', // text
      'prose-headings:font-extrabold prose-headings:mt-6',
      'prose-h1:text-3xl', // h1
      'prose-h2:text-2xl', // h2
      'prose-h3:text-xl prose-h3:text-slate-400', // h3
      'prose-strong:pr-2 prose-strong:font-bold', // strong
    )}>
      <Component components={components} />
    </article>
  );
}
