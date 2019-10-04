const axios = require('axios');

const getUserTracks = async (userId, clientId) => {
  const tracks = [];
  try {
    let response = await axios.get(
      `https://api-v2.soundcloud.com/users/${userId}/track_likes`,
      {
        params: {
          client_id: clientId,
          offset: 0,
          limit: 200
        }
      }
    );
    tracks.push(...response.data.collection);
    while (response.data.next_href) {
      response = await axios.get(`${response.data.next_href}`, {
        params: {
          client_id: clientId
        }
      });
      tracks.push(...response.data.collection);
    }
    return new Promise(resolve => resolve(tracks));
  } catch (e) {
    console.error(e);
    return new Promise((resolve, reject) => reject(e));
  }
};

const getUserFollowings = async (userId, clientId) => {
  const followings = [];
  try {
    let response = await axios.get(
      `https://api-v2.soundcloud.com/users/${userId}/followings`,
      {
        params: {
          client_id: clientId,
          offset: 0,
          limit: 200
        }
      }
    );
    followings.push(...response.data.collection);
    while (response.data.next_href) {
      response = await axios.get(`${response.data.next_href}`, {
        params: {
          client_id: clientId
        }
      });
      followings.push(...response.data.collection);
    }
    return new Promise(resolve => resolve(followings));
  } catch (e) {
    console.error(e);
    return new Promise((resolve, reject) => reject(e));
  }
};

const getUserPlaylists = async (userId, clientId, token) => {
  const playlists = [];
  try {
    let response = await axios.get(
      `https://api-v2.soundcloud.com/users/${userId}/playlists/liked_and_owned`,
      {
        params: {
          client_id: clientId,
          offset: 0,
          limit: 200
        },
        headers: { Authorization: `OAuth ${token}` }
      }
    );
    playlists.push(...response.data.collection);
    while (response.data.next_href) {
      response = await axios.get(`${response.data.next_href}`, {
        params: {
          client_id: clientId
        },
        headers: { Authorization: `OAuth ${token}` }
      });
      playlists.push(...response.data.collection);
    }
    return new Promise(resolve => resolve(playlists));
  } catch (e) {
    console.error(e);
    return new Promise((resolve, reject) => reject(e));
  }
};

const getUserById = (userId, clientId) =>
  axios.get(`https://api.soundcloud.com/users/${userId}`, {
    params: {
      client_id: clientId
    }
  });

const addUserLike = (userId, clientId, trackId, token) =>
  axios.put(
    `https://api-v2.soundcloud.com/users/${userId}/track_likes/${trackId}`,
    // `https://api.soundcloud.com/users/${userId}/favorites/${trackId}`,
    {},
    {
      params: {
        client_id: clientId
      },
      headers: { Authorization: `OAuth ${token}` }
    }
  );

const addUserFollowing = (followingId, token) =>
  axios.post(
    `https://api-v2.soundcloud.com/me/followings/${followingId}`,
    {},
    {
      headers: { Authorization: `OAuth ${token}` }
    }
  );

const addUserPlaylist = (userId, playlistId, clientId, token) =>
  axios.put(
    `https://api-v2.soundcloud.com/users/${userId}/playlist_likes/${playlistId}`,
    {},
    {
      params: {
        client_id: clientId
      },
      headers: { Authorization: `OAuth ${token}` }
    }
  );

module.exports = {
  getUserTracks,
  addUserLike,
  getUserFollowings,
  addUserFollowing,
  getUserPlaylists,
  addUserPlaylist,
  getUserById
};
