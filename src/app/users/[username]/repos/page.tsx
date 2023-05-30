type Props = {
  params: {
    username: string
  }
}

export default function ReposPage({ params: { username } }: Props) {
  return <div>{username}</div>
}
