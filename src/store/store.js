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
      items: null
    },
    artist: null
  },
  getters: {
    artists: state => state.artists,
    artist: state => state.artist
  },
  mutations: {
    saveArtists (state, payload) {
      state.artists.items = payload
    },
    artistsError (state, payload) {
      state.artists.error = payload
    },
    artistsFetching (state, payload) {
      state.artists.fetching = payload
    },
    chooseArtist (state, payload) {
      console.log('artist', JSON.stringify(payload, null, 2))
      state.artist = payload
    }
  },
  actions: {
    getArtists (context, payload) {
      context.state.artists.error && context.commit('artistsError', null)
      getArtistsTimeout = setTimeout(() => {
        context.commit('artistsFetching', true)
      }, 200)

      axios
        .get(`https://api.spotify.com/v1/search?q=${payload}&type=artist`)
        .then(response => {
          clearTimeout(getArtistsTimeout)
          context.commit('saveArtists', response.data.artists.items)
          context.commit('artistsFetching', false)
        })
        .catch(error => {
          clearTimeout(getArtistsTimeout)
          context.commit('artistsError', handleError(error))
          context.commit('artistsFetching', false)
        })
    },
    chooseArtist (context, payload) {
      context.commit('chooseArtist', payload)
    }
  }
})
