<template>
  <input
    type="text"
    placeholder="Artist's name"
    v-model="query"
    @input="search"
    @keydown.down="focusOnList"
    autofocus
    tabindex="1"
  />
</template>

<script>
import _debounce from 'lodash/debounce'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['artist', 'artists'])
  },
  methods: {
    ...mapActions(['getArtists']),
    focusOnList () {
      if (!this.artists.items || !this.artists.items.length) return
      document.querySelectorAll('.artists-list li')[0].focus()
    },
    search: _debounce(function () {
      this.getArtists(this.query)
    }, 300)
  },
  watch: {
    artist (artist) {
      if (artist) {
        this.query = artist.name
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 18em;
  padding: 1em 1.5em;
  background: none;
  border: 1px solid;
  border-radius: 2em;
  outline: none;
  color: inherit;
}
</style>
