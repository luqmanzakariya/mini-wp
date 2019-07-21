<template>
  <div>
    <form>
      <div class="form-create-article">
        <label for="i-article-title">Title</label>
        <input v-model="article.title" type="text" class="form-control" id="i-article-title">
        <small id="emailHelp" class="form-text text-muted">Title is required</small>
      </div>

      <div class="form-create-article">
        <label for="i-article-body">Content</label>
        <tinymce-editor v-model="article.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount'}"></tinymce-editor>
      </div>

      <b-form-file
        v-model="article.file"
        :state="Boolean(article.file)"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
    ></b-form-file>

      <button @click="createArticle" type="button" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
// const baseUrl = 'http://35.240.221.23'
const baseUrl = `http://localhost:3000`
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "AddFile",
  data() {
    return {
      article: {
        title: '',
        content: '',
        file: '',
      }
    }
  },
  components: {
    'tinymce-editor': Editor
  },
  methods: {
    createArticle() {
      let formData = new FormData()
      formData.append('title', this.article.title)
      formData.append('content', this.article.content)
      formData.append('file', this.article.file)
      console.log('ini form data', formData)
      axios({
        method: 'POST',
        url : `${baseUrl}/articles/create`, 
        data : formData,
        headers: {
          'token': localStorage.getItem('token'),
          'content-type' : 'multipartform/form-data',
        },
      })
      .then(({data}) => {
          this.$emit('currentPage','ListArticle')
          console.log(data)
      })
      .catch((err) => {
          console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style>
  span{
    color:black !important
  };
  .tox {
    color:black !important
  }
</style>
