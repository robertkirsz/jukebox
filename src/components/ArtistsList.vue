<template>
  <div v-if="showComponent" class="artists-list bordered">
    <div v-if="showError">{{ showError }}</div>
    <div v-else-if="showNoResultsMessage">Nothing found</div>
    <div v-else class="list-wrapper">
      <ul>
        <li
          v-for="artist in artists.items"
          @click="chooseArtist(artist)"
        >
          {{ artist.name }}
        </li>
      </ul>
      <div class="pagination">
        <button class="show-previous-button" @click="showPrevious" v-if="artists.previous">
          <i class="fa fa-arrow-left" />
        </button>
        <button class="show-next-button" @click="showNext" v-if="artists.next">
          <i class="fa fa-arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'artists-list',
  computed: {
    ...mapGetters(['artists']),
    showComponent () {
      const { error, items } = this.artists
      return error || items
    },
    showError () { return this.artists.error },
    showNoResultsMessage () { return this.artists.items && !this.artists.items.length }
  },
  methods: {
    ...mapActions(['chooseArtist', 'showPrevious', 'showNext'])
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
  .list-wrapper {
    display: flex;
    flex-direction: column;
  }
  .pagination {
    display: flex;
    .show-previous-button { margin-right: auto; }
    .show-next-button { margin-left: auto; }
  }
}
</style>
