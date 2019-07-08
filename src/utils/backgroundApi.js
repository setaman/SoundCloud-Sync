import axios from 'axios'

export const init = async (userOne, userTwo) =>
  axios.post('http://localhost:3005/init', {
    userOne,
    userTwo
  })
