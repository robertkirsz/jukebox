<template>
  <ul class="artist-details bordered" v-if="artist">
    <li>{{ artist.name }}</li>
    <li v-if="imageUrl"><img :src="imageUrl" /></li>
  </ul>
</template>

<script>
import _get from 'lodash/get'
import { mapGetters } from 'vuex'

export default {
  name: 'artist-details',
  data () {
    return {
      text: 'Lorem ipsum'
    }
  },
  computed: {
    ...mapGetters(['artist']),
    imageUrl () {
      return _get(this.artist, 'images[0].url')
    }
  },
  methods: {
    dolorSit () {
      this.text = 'Something'
    }
  }
}
</script>

<style lang="scss" scoped>
.artist-details {
  list-style: none;
  img {
    width: 100px;
    height: auto;
  }
}
</style>
