'use client'
import axios from 'axios'

export const getUsersPage = async (page: number = 1, options = {}) => {
  const resp = await axios.get(
    `https://api.github.com/users?per_page=${100}&since=${
      page !== 1 ? page * 100 : 0
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`
      }
    }
  )
  return resp.data
}
