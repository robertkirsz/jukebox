<template>
  <div v-if="showComponent" class="artists-list"
    @keydown.up.prevent="focusOnPrevItem"
    @keydown.down.prevent="focusOnNextItem"
  >
    <div v-if="showError">{{ showError }}</div>
    <div v-else-if="showNothingFoundMessage" class="nothing-found-message">Nothing found</div>
    <div v-else class="list-wrapper">
      <ul>
        <li
          v-for="(artist, index) in artists.items"
          @click="chooseArtist(artist)"
          @keyup.enter="chooseItem(artist)"
          @focus="focusedItem = index"
          tabindex="1"
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
  data () {
    return {
      focusedItem: null
    }
  },
  computed: {
    ...mapGetters(['artists']),
    firstItemFocused () {
      return this.focusedItem === 0
    },
    lastItemFocused () {
      return this.focusedItem === this.artists.items.length - 1
    },
    showComponent () {
      const { error, items } = this.artists
      return error || items
    },
    showError () { return this.artists.error },
    showNothingFoundMessage () { return this.artists.items && !this.artists.items.length }
  },
  methods: {
    ...mapActions(['chooseArtist', 'showPrevious', 'showNext']),
    chooseItem (artist) {
      document.querySelector('input').focus()
      this.chooseArtist(artist)
    },
    focusOnPrevItem () {
      if (this.firstItemFocused) {
        document.querySelector('input').focus()
      } else {
        this.focusedItem--
      }
    },
    focusOnNextItem () {
      if (this.lastItemFocused) return
      this.focusedItem++
    }
  },
  watch: {
    focusedItem (index) {
      document.querySelectorAll('.artists-list li')[index].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.artists-list {
  ul {
    list-style: none;
    margin: 1em 0 0;
    padding: 0 0 0 1.5em;
  }
  li {
    padding: 0;
    cursor: pointer;
    width: 18em;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:not(:last-of-type) { margin-bottom: 0.5em; }
    &:hover,
    &:focus { text-decoration: underline; }
  }
  .list-wrapper {
    display: flex;
    flex-direction: column;
  }
  .pagination {
    // display: flex;
    display: none;
    .show-previous-button { margin-right: auto; }
    .show-next-button { margin-left: auto; }
  }
}
</style>
