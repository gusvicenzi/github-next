'use client'
import styles from './page.module.sass'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsersPage } from '../../utils/axios'

import { UserListItemForwardRef } from '@/components/UserListItemForwardRef'
import { useRef, useCallback } from 'react'

export default function Users() {
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
    }
  })

  const intObserver = useRef()
  const lastPostRef = useCallback(
    (user: GHUser) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver(users => {
        if (users[0].isIntersecting && hasNextPage) {
          console.log('Last user!')
          fetchNextPage()
        }
      })

      if (user) intObserver.current.observe(user)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  if (status === 'error') return <p>Error: {error?.message}</p>

  const content = data?.pages.map(pg => {
    return pg.map((user, i) => {
      if (pg.length === i + 1) {
        return (
          <UserListItemForwardRef ref={lastPostRef} user={user} key={user.id} />
        )
      }
      return <UserListItemForwardRef user={user} key={user.id} />
    })
  })
  return (
    <div className={styles.container}>
      {content}
      {isFetchingNextPage && (
        <p className={styles.loadingText}>Loading users...</p>
      )}
    </div>
  )
}
