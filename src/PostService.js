import axios from "axios";

const url = "/api/posts/";

class PostService {
  // Get Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((doc) => resolve(doc.data))
        .catch((err) => reject(err));
    });
  }

  // Add Post
  static insertPost(title, message) {
    return axios.post(url, {
      title,
      message,
    });
  }
  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
