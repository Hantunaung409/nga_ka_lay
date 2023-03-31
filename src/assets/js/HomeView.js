import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import axios from 'axios'
import FooterSection from '../../components/FooterSection'
import LoadingSpinner from '../../components/LoadingSpinner'
export default {
    name: 'HomeView',
    components: {
        Bootstrap5Pagination,
        FooterSection,
        LoadingSpinner
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
        searchKey: "",
      }
    },
    methods: {
        scrollToTopWhenClicked() {
            window.scrollTo(0,0);
          },
        getAllPosts(page = 1) {
            axios.get(`https://tackle-admin.tackle-mm.com/api/allPosts?page=${page}`).then((response) => {
                for (let i = 0; i < response.data.AllPostsData.data.length ; i++) {
                    response.data.AllPostsData.data[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.AllPostsData.data[i].image ;
                    response.data.AllPostsData.data[i].price = Number(response.data.AllPostsData.data[i].price).toLocaleString();
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
        categoryFilter(categoryName,index,page = 1){
            this.scrollToTopWhenClicked();
            this.allPostsList = [];
            this.isPostsListNull = false;
            axios.post(`https://tackle-admin.tackle-mm.com/api/category/search?page=${page}`,{ searchKey : categoryName}).then((response) => {
                for (let i = 0; i < response.data.categorySearchResult.data.length; i++) {
                    response.data.categorySearchResult.data[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.categorySearchResult.data[i].image ;
                    response.data.categorySearchResult.data[i].price = Number(response.data.categorySearchResult.data[i].price).toLocaleString();
                }
                this.allPostsList = response.data.categorySearchResult;
                if (this.allPostsList.data.length === 0) {
                    this.isPostsListNull = true;
                }else{
                    this.isPostsListNull = false;
                }
                // console.log(this.isPostsListNull);
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
        search(page = 1){
            this.allPostsList = [];
            this.isPostsListNull = false;
            axios.post(`https://tackle-admin.tackle-mm.com/api/post/search?page=${page}`,{ searchKey : this.searchKey}).then((response) => {
                for (let i = 0; i < response.data.postSearchResult.data.length; i++) {
                    response.data.postSearchResult.data[i].image = "https://tackle-admin.tackle-mm.com/storage/postImage/"+response.data.postSearchResult.data[i].image ;
                    response.data.postSearchResult.data[i].price = Number(response.data.postSearchResult.data[i].price).toLocaleString();
                }
                this.allPostsList = response.data.postSearchResult;
                if (this.allPostsList.data.length === 0) {
                    this.isPostsListNull = true;
                }else{
                    this.isPostsListNull = false;
                }
                this.thisCategoryName = this.searchKey;

                this.searchKey = "";
                // console.log(this.isPostsListNull);
               }).catch(e => {
                console.log(e);
               });
        }
    },
    mounted () {
        this.getAllPosts(),
        this.GetAllCategoryData();
          
    },
  }
