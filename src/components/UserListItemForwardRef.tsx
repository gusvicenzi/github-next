import { forwardRef } from 'react'
import styles from './userListItem.module.sass'

type Props = {
  user: GHUser
}

// eslint-disable-next-line react/display-name
export const UserListItemForwardRef = forwardRef(
  ({ user }: Props, ref: any) => {
    if (ref) {
      return (
        <div ref={ref} className={styles.container}>
          <h2>id: {user.id}</h2>
          <h2>{user.login}</h2>
        </div>
      )
    }
    return (
      <div className={styles.container}>
        <h2>id: {user.id}</h2>
        <h2>{user.login}</h2>
      </div>
    )
  }
)
