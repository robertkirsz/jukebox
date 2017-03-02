import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { handleError } from '../utils'

Vue.use(Vuex)

const initialArtists = {
  fetching: false,
  error: null,
  items: null,
  limit: 10
}

const initialAlbums = {
  fetching: false,
  error: null,
  items: null
}

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    artists: initialArtists,
    artist: null,
    albums: initialAlbums
  },
  getters: {
    artists: state => state.artists,
    artist: state => state.artist,
    albums: state => state.albums
  },
  mutations: {
    saveArtists (state, payload) {
      state.artists = { ...state.artists, ...payload }
    },
    clearArtists (state) {
      state.artists = initialArtists
    },
    saveAlbums (state, payload) {
      state.albums = { ...state.albums, ...payload }
    },
    clearAlbums (state) {
      state.albums = initialAlbums
    },
    artistsError (state, payload) {
      state.artists.error = payload
    },
    albumsError (state, payload) {
      state.albums.error = payload
    },
    artistsFetching (state) {
      state.artists.fetching = true
    },
    artistsFetched (state) {
      state.artists.fetching = false
    },
    albumsFetching (state) {
      state.albums.fetching = true
    },
    albumsFetched (state) {
      state.albums.fetching = false
    },
    chooseArtist (state, payload) {
      state.artist = payload
    },
    clearArtist (state) {
      state.artist = null
    }
  },
  actions: {
    getArtists (context, payload) {
      // Clear artist if there is any
      if (context.state.artist) context.commit('clearArtist')

      // Clear artists list if search query is empty
      if (!payload) {
        context.commit('clearArtists')
      } else {
        const { limit, error } = context.state.artists
        // Hide any errors
        error && context.commit('artistsError', null)

        context.commit('artistsFetching')

        axios
          .get(`https://api.spotify.com/v1/search?q=${payload}&type=artist&limit=${limit}`)
          .then(response => {
            // Clear albums if there are any
            if (context.state.albums.items) context.commit('clearAlbums')
            context.commit('artistsFetched')
            context.commit('saveArtists', response.data.artists)
          })
          .catch(error => {
            context.commit('artistsFetched')
            context.commit('artistsError', handleError(error))
          })
      }
    },
    showPrevious (context) {
      const { previous } = context.state.artists
      context.dispatch('sendRequest', previous)
    },
    showNext (context) {
      const { next } = context.state.artists
      context.dispatch('sendRequest', next)
    },
    chooseArtist (context, payload) {
      context.dispatch('getAlbums', payload)
      context.commit('chooseArtist', payload)
    },
    getAlbums (context, payload) {
      context.commit('albumsFetching')

      axios
        .get(`https://api.spotify.com/v1/artists/${payload.id}/albums?album_type=album&market=US&limit=50`)
        .then(response => {
          // Clear artists if there are any
          if (context.state.artists.items) context.commit('clearArtists')
          context.commit('albumsFetched')
          context.commit('saveAlbums', response.data)
        })
        .catch(error => {
          context.commit('albumsFetched')
          context.commit('albumsError', handleError(error))
        })
    }
  }
})
