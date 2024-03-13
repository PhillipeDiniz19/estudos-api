import './styles.css';
import { Component } from 'react'


import { loadPosts } from '../../utils/loadPosts'
import { Posts } from '../../components/Posts/posts'; 
import {Button} from '../../components/Button/Button';

 export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 100,
  };
  async componentDidMount(){
   await this.loadPosts();
  }
  loadPosts = async () => {
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage) ,
      allPosts: postsAndPhotos 
    });
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts,
      posts} = this.state

    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);

    this.setState({posts, page:nextPage})

  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <section className='container'>
        <Posts posts={posts}/>
        <div className="button-container">
          <Button 
          text="Load more posts"
           onClick={this.loadMorePosts}
           disabled={noMorePosts}
           />
        </div>
      </section>
    );
  }
}

export default Home