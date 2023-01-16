import axios from 'axios'
export default {
    name: 'HomeView',
    components: {
    },
    data() {
      return {
        isShow: false,
        isShowSearch: false,
        isClicked: false,
        isPostsListNull: false,
        allPostsList: [],
        categoryLists: [],
        thisCategoryName: "",
        searchKey: ""
      }
    },
    methods: {
        getAllPosts() {
            axios.get('https://tackle-admin.tackle-mm.com/api/allPosts').then((response) => {
                for (let i = 0; i < response.data.AllPostsData.length ; i++) {
                    response.data.AllPostsData[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.AllPostsData[i].image ;
                }
                this.allPostsList = response.data.AllPostsData;
            }).catch(e => {
                console.log(e);
            })
        },
        GetAllCategoryData(){
            axios.get('https://tackle-admin.tackle-mm.com/api/allCategories').then((response) => {
                this.categoryLists = response.data.allCategories;
            }).catch((error) => {
                console.log(error);
            })
        },
        categoryFilter(categoryName,index){
            axios.post('https://tackle-admin.tackle-mm.com/api/category/search',{ searchKey : categoryName}).then((response) => {
                for (let i = 0; i < response.data.categorySearchResult.length; i++) {
                    response.data.categorySearchResult[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.categorySearchResult[i].image ;
                    
                }
                this.allPostsList = response.data.categorySearchResult;
                if (this.allPostsList.length === 0) {
                    this.isPostsListNull = true;
                }else{
                    this.isPostsListNull = false;
                }
                //is active? category nav
                this.categoryLists.forEach(element => {
                    element.isActive = false;
                });
                this.isClicked = true;
                this.categoryLists[index].isActive = true;
                this.thisCategoryName = this.categoryLists[index].name;
                this.isShow = false;
                
            }).catch(e => {
                console.log(e);
            });
        },
        search(){
            axios.post('https://tackle-admin.tackle-mm.com/api/post/search',{ searchKey : this.searchKey}).then((response) => {
                for (let i = 0; i < response.data.postSearchResult.length; i++) {
                    response.data.postSearchResult[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.postSearchResult[i].image ;
                    
                }
                this.allPostsList = response.data.postSearchResult;
                this.thisCategoryName = this.searchKey;
                this.searchKey = "";
               }).catch(e => {
                console.log(e);
               });
        }
    },
    mounted () {
        console.log(this.allPostsList);
        this.getAllPosts(),
        this.GetAllCategoryData();
    },
  }