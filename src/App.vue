<template>
  <div id="app">
    <search />
    <artists-list />
    <artist-details />
  </div>
</template>

<script>
import Search from './components/Search'
import ArtistsList from './components/ArtistsList'
import ArtistDetails from './components/ArtistDetails'

export default {
  name: 'app',
  components: {
    Search,
    ArtistsList,
    ArtistDetails
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bordered {
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
