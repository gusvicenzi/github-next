type Props = {
  user: GHUser
}

export default function UserListItem({ user }: Props) {
  return (
    <div>
      <h2>{user.id}</h2>
      <h2>{user.login}</h2>
    </div>
  )
}
