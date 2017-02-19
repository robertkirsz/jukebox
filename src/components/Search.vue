<template>
  <div class="search bordered">
    <input
      type="text"
      placeholder="Artist name"
      v-model="query"
      @input="search"
    />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import { mapActions } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    ...mapActions(['getArtists']),
    search: _debounce(function () {
      this.getArtists(this.query)
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: inline-flex;
  input {
    color: inherit;
  }
}
</style>
