'use client'

import UserListItem from '@/components/UserListItem'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default async function Users() {
  const [page, setPage] = useState(0)

  async function getUsers(page: number = 0) {
    console.log(process.env.GITHUB_API_KEY)

    const usersData = await fetch(
      `https://api.github.com/users?per_page=${10}&since=${page * 10}`,
      {
        headers: {
          Authorization: `Bearer ${'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'}`
        }
      }
    )
    const users: GHUser[] = await usersData.json()
    return users
  }

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers()
  })

  return (
    <div>
      {data?.map(user => (
        <UserListItem user={user} key={user.id} />
      ))}
    </div>
  )
}
