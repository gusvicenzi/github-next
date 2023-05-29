'use client'
import { getUserByUsername } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import styles from './page.module.sass'
import Link from 'next/link'
// import Image from 'next/image'

type Props = {
  params: {
    username: string
  }
}

export default function UserPage({ params: { username } }: Props) {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', username],
    queryFn: async () => await getUserByUsername(username),
    refetchOnWindowFocus: false,
    retry: 2
  })

  if (isLoading)
    return (
      <div className={styles.container}>
        <h1 className={styles.loadingText}>Loading..</h1>
      </div>
    )

  if (!userInfo)
    return (
      <div className={styles.container}>
        <h1 className={styles.loadingText}>Problema ao carregar usuário</h1>
      </div>
    )

  return (
    <div className={styles.container}>
      <h3>id: {userInfo.id}</h3>
      <Link href={userInfo.html_url} target='_blank' className={styles.links}>
        {/* <Image
        src='https://avatars.githubusercontent.com/u/87548627?v=4'
        width='128'
        height='75'
        alt={`${userInfo.login} profile picture`}
        className={styles.profilePic}
      /> */}
        <img
          src={userInfo.avatar_url}
          alt={`${userInfo.login} profile picture`}
        />
        <h1>{userInfo.login}</h1>
      </Link>

      <div className={styles.subMenu}>
        <Link href={userInfo.repos_url} className={styles.links}>
          <p>Seguidores</p>
        </Link>
        <Link href={userInfo.repos_url} className={styles.links}>
          <p>Repositórios</p>
        </Link>
      </div>
    </div>
  )
}
