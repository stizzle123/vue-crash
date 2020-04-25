<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!-- Create Post Here -->
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" v-model="title" placeholder="Enter Title" />
      <input type="text" v-model="message" placeholder="Enter Message" />
      <button @click="createPost">Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div
      class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      @dblclick="deletePost(post._id)"
    >
      {{
        `${new Date(post.createdAt).getDate()}/${new Date(
          post.createdAt
        ).getMonth()}/${new Date(post.createdAt).getFullYear()}`
      }}
      <h3>{{ post.title }}</h3>
      <p class="text">{{ post.message }}</p>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      title: "",
      message: "",
      error: "",
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.title, this.message);
      this.title = "";
      this.message = "";
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  cursor: pointer;
}

.post:hover {
  opacity: 0.6;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
