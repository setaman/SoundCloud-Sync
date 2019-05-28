import axios from 'axios/index'

export const getUserTracks = async (userId, clientId) => {
  const tracks = []
  let u = '621489099'
  let cId = 'Q11Oe0rIPEuxvMeMbdXV7qaowYzlaESv'
  try {
    let response = await axios.get(
      `https://api-v2.soundcloud.com/users/${u}/track_likes`,
      {
        params: {
          client_id: cId,
          offset: 0,
          limit: 200
        }
      }
    )
    tracks.push(...response.data.collection)
    while (response.data.next_href) {
      response = await axios.get(`${response.data.next_href}`, {
        params: {
          client_id: cId
        }
      })
      tracks.push(...response.data.collection)
    }
    return new Promise(resolve => resolve(tracks))
  } catch (e) {
    console.error(e)
    return new Promise((resolve, reject) => reject())
  }
}

/*
export const getUserByUrl = (user_name, client_id) =>
  axios.get(`http://api.soundcloud.com/resolve`, {
    params: {
      client_id,
      url: `https://soundcloud.com/${user_name}`
    }
  })

export const addUserTrack = (user_id, client_id, track_id, token) =>
  axios.put(
    `https://api-v2.soundcloud.com/users/${user_id}/track_likes/${track_id}`,
    {},
    {
      params: {
        client_id
      },
      headers: { Authorization: `OAuth ${token}` }
    }
  )

export const addUserFollowing = (user_id, following_id, token) =>
  axios.post(
    `https://api-v2.soundcloud.com/me/followings/${following_id}`,
    {},
    {
      headers: { Authorization: `OAuth ${token}` }
    }
  )

export const getUserFollowings = async (user_id, client_id) => {
  const followings = []
  try {
    let response = await axios.get(
      `https://api-v2.soundcloud.com/users/${user_id}/followings`,
      {
        params: {
          client_id,
          offset: 0,
          limit: 200
        }
      }
    )
    followings.push(...response.data.collection)
    while (response.data.next_href) {
      response = await axios.get(`${response.data.next_href}`, {
        params: {
          client_id
        }
      })
      followings.push(...response.data.collection)
    }
    return new Promise(resolve => resolve(followings))
  } catch (e) {
    console.error(e)
    return new Promise((resolve, reject) => reject())
  }
}
*/
