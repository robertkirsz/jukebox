<template>
  <div v-if="showComponent" class="artists-list bordered">
    <div v-if="showSpinner">Loading...</div>
    <div v-else-if="showError">{{ showError }}</div>
    <div v-else-if="showNoResultsMessage">Nothing found</div>
    <ul v-else>
      <li
        v-for="artist in artists.items"
        @click="chooseArtist(artist)"
      >
        {{ artist.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'artists-list',
  computed: {
    ...mapGetters(['artists']),
    showComponent () {
      const { fetching, error, items } = this.artists
      return fetching || error || items
    },
    showError () { return this.artists.error },
    showSpinner () { return this.artists.fetching },
    showNoResultsMessage () { return this.artists.items && !this.artists.items.length }
  },
  methods: {
    ...mapActions(['chooseArtist'])
  }
}
</script>

<style lang="scss" scoped>
.artists-list {
  list-style: none;
  li {
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
}
</style>
