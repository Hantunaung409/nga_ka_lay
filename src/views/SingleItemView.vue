<template>
  <div id="singleItemView">
    <a href="#" class="go-top"><i class="fa-solid fa-arrow-up text-dark"></i></a>
    
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'SingleItemView',
    props: ["postId"],
    data() {
      return {
        postData: "",
      }
    },
    methods: {
      getSingleData() {
        axios.post(`https://tackle-admin.tackle-mm.com/api/post/singlePost`, { id : this.postId}).then((response) => {
                    response.data.singlePost.image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.singlePost.image ;
                    response.data.singlePost.price = Number(response.data.singlePost.price).toLocaleString();
                this.postData = response.data.singlePost;

            }).catch(e => {
                console.log(e);
            })
      }
    },
    mounted () {
      this.getSingleData();
    },
  }
</script>

<style lang="scss" scoped>

</style>
