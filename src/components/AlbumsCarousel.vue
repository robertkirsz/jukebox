<template>
  <div v-if="showNothingFoundMessage" class="nothing-found-message">No albums found</div>
  <carousel-3d v-else-if="showComponent" :width="300" :height="300">
    <slide v-for="(album, index) in albums.items" :index="index">
      <img :src="album.images[0].url" />
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import { mapGetters } from 'vuex'

export default {
  name: 'albums-carousel',
  components: {
    Carousel3d,
    Slide
  },
  computed: {
    ...mapGetters(['albums']),
    showNothingFoundMessage () { return this.albums.items && !this.albums.items.length },
    showComponent () {
      const { error, items } = this.albums
      return error || items
    }
  }
}
</script>

<style lang="scss" scoped>
.albums-carousel {}
</style>
