'use client'
import axios from 'axios'

export const getUsersPage = async (page: number = 1, options = {}) => {
  const resp = await axios.get(
    `https://api.github.com/users?per_page=${10}&since=${
      page !== 1 ? page * 10 : 0
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`
      }
    }
  )
  return resp.data
}
