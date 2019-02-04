import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const addPerson = newObject => {
  return axios.post(baseUrl, newObject)
}

const getOne = (name) => {
    return axios.get(baseUrl).find(p => p.name = name)
  }

const removePerson = (id) => {

  return axios.delete(`${baseUrl}/${id}`)
  .then(response => response.data)
}

export default { getAll, addPerson, getOne, removePerson }