<template>
  <input
    type="text"
    placeholder="Artist's name"
    v-model="query"
    @input="search"
    autofocus
    tabindex="1"
  />
</template>

<script>
import _get from 'lodash/get'
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
    ...mapGetters(['artist'])
  },
  methods: {
    ...mapActions(['getArtists']),
    search: _debounce(function () {
      this.getArtists(this.query)
    }, 300)
  },
  watch: {
    artist (artist) {
      console.log('artist', artist)
      this.query = _get(artist, 'name', '')
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
