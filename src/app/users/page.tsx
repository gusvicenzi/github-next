'use client'
import styles from './page.module.sass'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsersPage } from '../../utils/axios'

import InfiniteScroll from 'react-infinite-scroll-component'
import { UserListItem } from '@/components/UserListItem'

export default function UsersInfiniteScroll() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery<GHUser[]>({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => getUsersPage(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  if (status === 'error')
    return <p>Error: {error instanceof Error ? error?.message : ''}</p>

  const content = data?.pages.map(pg => {
    return pg.map((user, i) => <UserListItem user={user} key={user.id} />)
  })
  return (
    <InfiniteScroll
      className={styles.container}
      dataLength={data?.pages.length || 10}
      next={fetchNextPage}
      hasMore={hasNextPage || true}
      loader={<p className={styles.loadingText}>Loading users...</p>}
      endMessage={<h4>Nothing more to show</h4>}>
      {content}
    </InfiniteScroll>
  )
}
