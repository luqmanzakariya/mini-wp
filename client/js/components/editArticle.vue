<template>
  <div>
    <h1>Edit Article</h1>
    <b-card :img-src="article.fileUrl" img-alt="Card image" style="height: 100px; width:100px"></b-card><br>
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
        @change="fileUploaded"
        :state="Boolean(article.file)"
        placeholder="Change article image..."
        drop-placeholder="Drop file here...">
      </b-form-file>

      <button @click="submitArticle" type="button" class="btn btn-primary" style="left: 0px;">Submit</button>
    </form>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "AddFile",
  components: {
    'tinymce-editor': Editor
  },
  props:{
    id: String
  },
  data(){
    return {
      article:{
        title: '',
        content: '',
        file: '',
        fileUrl: '',
      }
    }
  },
  components: {
    'tinymce-editor': Editor
  },
  created () {
    this.editArticle()
  },
  methods : {
    editArticle(){
      axios({
        method: 'get',
        url : `http://localhost:3000/articles/${this.id}`, 
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
      .then(({data}) => {
          this.article = {
            id: data._id,
            title: data.title,
            content: data.content,
            fileUrl: data.fileUrl
          }
      })
      .catch((err) => {
          console.log(err.response.data.message)
      })
    },
    fileUploaded(e) {
      var files = e.target.files
      const fr = new FileReader()
      this.article.file = files[0]
      fr.readAsDataURL(files[0])
      fr.addEventListener("load", () =>{
        
        this.article.fileUrl = fr.result
        console.log(this.article.fileUrl)
      })
    },
    submitArticle(){
      console.log('masuk submit article')
      let formData = new FormData()
      formData.append('title', this.article.title)
      formData.append('content', this.article.content)
      formData.append('file', this.article.file)
      axios({
        method: 'PATCH',
        url : `http://localhost:3000/articles/${this.id}`, 
        data : formData,
        headers: {
          'token': localStorage.getItem('token'),
          'content-type' : 'multipartform/form-data',
        },
      })
      .then(({data}) => {
        this.$emit('currentPage','ListArticle')
        swal.fire('Article has been updated')
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style>

</style>
