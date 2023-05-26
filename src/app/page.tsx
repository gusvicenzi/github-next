'use client'
import { useQuery } from '@tanstack/react-query'
import styles from './page.module.sass'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
export default function Home() {
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      return await res.json()
    }
  })

  if (isLoading) return <div>loading...</div>
  else if (!data) return <div>no data found</div>

  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {data?.map(todo => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.completed ? 'V' : 'X'}</p>
        </div>
      ))}
    </main>
  )
}
