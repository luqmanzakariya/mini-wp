<template>
  <div>
    <ul class="list-group">
      <li @click="EveryoneArticle" class="list-group-item"><i class="fas fa-plus"></i> All Article </li>
      <li @click="ListArticle" class="list-group-item"><i class="fas fa-file-alt"></i> My Article </li>
      <li @click='FormCreateArticle' class="list-group-item"><i class="fas fa-plus"></i> Create Article </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    EveryoneArticle(){
      this.$emit('currentPage', 'EveryoneArticle')
    },
    ListArticle () {
      this.$emit('currentPage', 'ListArticle')
    },
    FormCreateArticle() {
      this.$emit('currentPage', 'FormCreateArticle')
    }
  }
}
</script>

<style>

</style>
