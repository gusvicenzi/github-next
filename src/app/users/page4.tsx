'use client'

import { UserListItem } from '@/components/UserListItem'
import { useQuery } from '@tanstack/react-query'
import styles from './page.module.sass'

export default function Users() {
  const { data, isLoading, isFetching, error } = useQuery<GHUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`
        }
      })
      return res.json()
    }
  })
  if (isLoading) return <div>loading...</div>
  else if (!data) return <div>no data found</div>

  return (
    <div className={styles.main}>
      {data?.map(user => (
        <UserListItem user={user} key={user.id} />
      ))}
    </div>
  )
}
