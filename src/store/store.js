import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { handleError } from '../utils'

Vue.use(Vuex)

let getArtistsTimeout = null

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    artists: {
      fetching: false,
      error: null,
      items: null,
      limit: 15
    },
    artist: null,
    albums: {
      fetching: false,
      error: null,
      items: null
    }
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
    saveAlbums (state, payload) {
      state.albums = { ...state.albums, ...payload }
    },
    artistsError (state, payload) {
      state.artists.error = payload
    },
    artistsFetching (state, payload) {
      state.artists.fetching = payload
    },
    albumsFetching (state, payload) {
      state.albums.fetching = payload
    },
    chooseArtist (state, payload) {
      state.artist = payload
    }
  },
  actions: {
    sendRequest (context, url) {
      const { error } = context.state.artists

      error && context.commit('artistsError', null)

      getArtistsTimeout = setTimeout(() => {
        context.commit('artistsFetching', true)
      }, 200)

      axios
        .get(url)
        .then(response => {
          clearTimeout(getArtistsTimeout)
          context.commit('saveArtists', response.data.artists)
          context.commit('artistsFetching', false)
        })
        .catch(error => {
          clearTimeout(getArtistsTimeout)
          context.commit('artistsError', handleError(error))
          context.commit('artistsFetching', false)
        })
    },
    getArtists (context, payload) {
      const { limit } = context.state.artists
      context.dispatch('sendRequest', `https://api.spotify.com/v1/search?q=${payload}&type=artist&limit=${limit}`)
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
      context.commit('albumsFetching', true)
      console.warn('getAlbums', context)

      axios
        .get(`https://api.spotify.com/v1/artists/${payload.id}/albums?album_type=album&market=US&limit=50`)
        .then(response => {
          context.commit('saveAlbums', response.data)
          context.commit('albumsFetching', false)
        })
        .catch(error => {
          console.log(handleError(error))
          // context.commit('artistsError', handleError(error))
          context.commit('albumsFetching', false)
        })
    }
  }
})
