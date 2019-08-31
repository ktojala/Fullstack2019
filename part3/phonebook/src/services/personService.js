import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
  .then(response => response.data)
}

const addPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
  .then(response => response.data)
}

const updatePerson = (updateObject) => {
  return axios.put(`${baseUrl}/${updateObject.id}`,updateObject)
  .then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updatePerson }
