<template>
  <div id="app">
    <div class="search-wrapper" :class="searchWrapperClass">
      <search />
      <artists-list />
    </div>
    <albums-carousel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from './components/Search'
import ArtistsList from './components/ArtistsList'
import AlbumsCarousel from './components/AlbumsCarousel'

export default {
  name: 'app',
  components: {
    Search,
    ArtistsList,
    AlbumsCarousel
  },
  computed: {
    ...mapGetters(['artists', 'albums']),
    searchWrapperClass () {
      return this.artists.items || this.albums.items
        ? 'top'
        : 'center'
    }
  }
}
</script>

<style lang="scss">
body {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: black url("https://images.unsplash.com/photo-1483954743958-e7db4da5b8d5?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=") no-repeat center center;
  background-size: cover;
  font: 18px Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  &::after {
    content: "";
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: rgba(240, 240, 240, 0.6);
    z-index: -1;
  }
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  background: rgba(240, 240, 240, 0.6);
  box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.2);
}

.search-wrapper {
  transition: margin-top 0.6s ease;
  &.center {
    margin-top: 30vh;
  }
  &.top {
    margin-top: 10vh;
  }
}

.nothing-found-message {
  margin-top: 1em;
  text-align: center;
}
</style>
