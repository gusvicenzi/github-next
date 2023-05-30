import Link from 'next/link'
import styles from './userRepos.module.sass'

type Props = {
  repos: GHRepo[]
}

export function UserRepos({ repos }: Props) {
  return (
    <div className={styles.container}>
      {repos.map(repo => {
        return (
          <div key={repo.id}>
            <Link href={repo.html_url} target='_blank' className={styles.link}>
              <h2>{repo.name}</h2>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
