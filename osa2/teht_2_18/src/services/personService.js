import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const addPerson = newObject => {
  return axios.post(baseUrl, newObject)
}

const updatePerson = (updateObject) => {
    return axios.put(`${baseUrl}/${updateObject.id}`,updateObject)
    .then(response => response.data)
  }

const removePerson = (id) => {

  return axios.delete(`${baseUrl}/${id}`)
  .then(response => response.data)
}

export default { getAll, addPerson, updatePerson, removePerson }