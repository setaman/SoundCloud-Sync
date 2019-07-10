const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

const { SOCKET_INITIALIZATION_START, SOCKET_INITIALIZATION_SUCCESS, SOCKET_INITIALIZATION_FAIL } = require('./socketEvents')
const { loadUserData } = require('./userDataLoader')

io.on('connection', socket => {
  console.log('--- CLIENT CONNECTED ---')

  socket.on(SOCKET_INITIALIZATION_START, msg => {
    console.log('MSG:', msg)

    io.emit(SOCKET_INITIALIZATION_START, msg)
    loadUsersData(msg.userOne, msg.userTwo)
      .then((data) => io.emit(SOCKET_INITIALIZATION_SUCCESS, data))
      .catch(e => {
        console.log(e)
        io.emit(SOCKET_INITIALIZATION_FAIL, e)
      })
  })
})

const loadUsersData = async (userOne, userTwo) => {
  const result = await Promise.all([loadUserData(userOne.userId, userOne.clientId, userOne.token),
    loadUserData(userTwo.userId, userTwo.clientId, userTwo.token)
  ])

  if (result[0].errors.length > 0 || result[1].errors.length > 0) {
    return new Promise((resolve, reject) => reject([...result[0].errors, ...result[1].errors]))
  }

  const loadedUserOne = result.find(data => data.user.userId === userOne.userId)
  const loadedUserTwo = result.find(data => data.user.userId === userTwo.userId)

  console.log('USER ONE', loadedUserOne.user.username)
  console.log('USER TWO', loadedUserTwo.user.username)

  return {
    userOne: {
      ...userOne,
      username: loadedUserOne.user.username,
      avatar_url: loadedUserOne.user.avatar_url,
      permalink_url: loadedUserOne.user.permalink_url,
      followings: loadedUserOne.followings.length,
      likes: loadedUserOne.likes.length,
      playlists: loadedUserOne.playlists.length
    },
    userTwo: {
      ...userTwo,
      username: loadedUserTwo.user.username,
      avatar_url: loadedUserTwo.user.avatar_url,
      permalink_url: loadedUserTwo.user.permalink_url,
      followings: loadedUserTwo.followings.length,
      likes: loadedUserTwo.likes.length,
      playlists: loadedUserTwo.playlists.length
    }
  }
}

http.listen(port, function () {
  console.log('listening on localhost:' + port)
})
