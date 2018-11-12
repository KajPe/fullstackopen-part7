import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(baseUrl)
  return response.data.find(user => user.id ===id)
}

export default { getAll, getUser }