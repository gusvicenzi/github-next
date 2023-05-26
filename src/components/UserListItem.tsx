import styles from './userListItem.module.sass'

type Props = {
  user: GHUser
}

export function UserListItem({ user }: Props) {
  return (
    <div className={styles.container}>
      <h2>id: {user.id}</h2>
      <h2>
        {user.login.length > 12
          ? user.login.substring(0, 11) + '...'
          : user.login}
      </h2>
    </div>
  )
}
