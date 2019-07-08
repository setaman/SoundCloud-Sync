const { getUserById, getUserFollowings, getUserTracks, addUserFollowing } = require('./soundcloudApi')
const { LIST_TYPE_LIKES, LIST_TYPE_FOLLOWINGS, STATUS_WAITING } = require('./const')

const loadUserData = async (userId, clientId, token) => {
  const { username, avatar_url, permalink_url, userError } = await getUser(userId, clientId)
  if (userError) {
    return { errors: [userError] }
  }
  const { likes, likesError } = await getLikes(userId, clientId)
  if (likesError) {
    return { errors: [likesError] }
  }
  const { followings, followingsError } = await getFollowings(userId, clientId)
  if (followingsError) {
    return { errors: [followingsError] }
  }
  const { tokenError } = await checkToken(token)

  const errors = [userError, likesError, followingsError, tokenError]

  return {
    user: {
      username,
      avatar_url,
      permalink_url,
      userId
    },
    likes,
    followings,
    errors: errors.filter(e => e)
  }
}

async function getUser (userId, clientId) {
  try {
    const response = await getUserById(userId, clientId)

    const { username, avatar_url, permalink_url } = response.data

    return { username, avatar_url, permalink_url, userError: null }
  } catch (e) {
    console.info('USER ERROR', e)
    if (e.response.status === 401) {
      return { userError: `Client id "${clientId}" seems to be invalid` }
    } else if (e.response.status === 404) {
      return { userError: `Can not find user with id "${userId}"` }
    }
    return { userError: 'Some error occurred while loading user data' }
  }
}

async function getLikes (userId, clientId) {
  try {
    const likes = await getUserTracks(userId, clientId)

    return { likes: likes.map((item, order) => ({
      ...item.track,
      type: LIST_TYPE_LIKES,
      userId,
      status: STATUS_WAITING,
      order
    })),
    likesError: null }
  } catch (e) {
    console.info('LIKES ERROR', e.response)
    if (e.response.status === 401) {
      return { likesError: `Client id "${clientId}" seems to be invalid` }
    } else if (e.response.status === 404) {
      return { likesError: `Can not find likes for user with id "${userId}"` }
    }
    return { likesError: 'Some error occurred while loading user likes' }
  }
}

async function getFollowings (userId, clientId) {
  try {
    const followings = await getUserFollowings(userId, clientId)

    return { followings: followings.map((following, order) => ({
      ...following,
      type: LIST_TYPE_FOLLOWINGS,
      userId,
      status: 'waiting',
      order
    })),
    followingsError: null }
  } catch (e) {
    console.info('FOLLOWINGS ERROR', e)
    if (e.response.status === 401) {
      return { followingsError: `Client id "${clientId}" seems to be invalid` }
    } else if (e.response.status === 404) {
      return { followingsError: `Can not find followings for user with id "${userId}"` }
    }
    return { followingsError: 'Some error occurred while loading user followings' }
  }
}

async function checkToken (token) {
  try {
    await addUserFollowing('', token)
    return { tokenError: null }
  } catch (e) {
    console.info('TOKEN ERROR', e)
    if (e.response.status === 401) {
      return { tokenError: `Token "${token}" seems to be invalid` }
    } else if (e.response.status === 404) {
      return { tokenError: null }
    }
    return { tokenError: e }
  }
}

module.exports = {
  loadUserData
}
