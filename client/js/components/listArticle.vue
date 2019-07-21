<template>
  <div>
    <div v-for="article in articles">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col sm="6">
            <b-card-img :src="article.fileUrl" class="rounded-0"></b-card-img>
            <b-card-text class="articleDate">{{new Date(article.created_at).toString().substr(0,24)}}</b-card-text>
          </b-col>
          <b-col sm="6">
            <b-card-body :title="article.title">
              <b-card-text v-html="article.content"></b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
          <b-button @click="editArticle(article._id)" size="sm" class="my-2 my-sm-1 m-1 btn-warning" type="submit">Edit</b-button>
          <b-button @click="deleteArticle(article._id)" size="sm" class="my-2 my-sm-1 m-1 btn-danger" type="submit">Delete</b-button>
      </b-card>
    </div>
  </div>
  
</template>

<script>
const baseUrl = 'http://localhost:3000'

export default {
  data (){
    return {
      article : {
        title: "",
        content: "",
        created_at: new Date ()
      },
      articles: [],
    }
  },
  methods: {
    listArticle(){
      axios({
        url: `${baseUrl}/articles/findAll`,
        method: "get",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.articles = data
        
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    editArticle(id){
      console.log('Edit button clicked with id', id)
      this.$emit('currentPage', 'EditArticle', id)
    },
    deleteArticle(id){
      console.log('Delete button clicked')
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          axios({
          url: `${baseUrl}/articles/${id}`,
          method: "delete",
          dataType: "json",
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then((data)=>{
            this.listArticle()
          })
          .catch((err)=>{
            console.log(err)
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }
  },
  created (){
    this.listArticle()
  }
}
</script>

<style>
  .articleDate {
    margin-top: 2%;
    text-align: center
  }
</style>
