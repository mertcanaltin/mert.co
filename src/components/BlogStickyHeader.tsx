import SubscribeButton from '@/components/SubscribeButton'
import type { Post } from '@/types/content'
import { animate, scroll } from 'motion'
import { useEffect, useState } from 'react'

export default function BlogStickyHeader({ post }: { post: Post }) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)

    // Start showing and moving the sticky header until 100px offset.
    scroll(animate('#sticky-header', { x: 0, y: 50, opacity: [0, 1] }), {
      offset: ['start start', '100px'],
    })

    // Animate scroll indicator depending on the window scroll position
    scroll(animate('#progress-indicator', { scaleX: ['0', '1'] }), {
      offset: ['100px', 'end end'],
    })
  }, [])

  return (
    <header
      id="sticky-header"
      data-hydrated={hydrated}
      className="inset-x-0 items-center backdrop-blur-sm bg-[hsla(0,0%,100%,.8)] dark:bg-white-reversed/50 flex h-[50px] justify-between px-8 fixed z-[90] top-[-50px] opacity-0 data-[hydrated=true]:opacity-100"
    >
      <div className="flex flex-row justify-between w-full items-center">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-slate-800 dark:text-white leading-[1.3] mr-4 text-sm font-bold">
          {post.data.title}
        </div>

        <SubscribeButton className="text-sm whitespace-nowrap" />
      </div>

      <div className="bg-[#e6e6e6] dark:bg-slate-600 bottom-[-2px] h-[2px] left-0 absolute w-full">
        <div id="progress-indicator" className="bg-orange-400 h-full origin-[0%] scale-x-0" />
      </div>
    </header>
  )
}
