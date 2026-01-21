import { useEffect, useState } from "react";
import styles from '../App.module.css'
import { Link } from 'react-router-dom';
import type { Post } from '../types/Post.ts'

type PostsResponse = {
  posts: Post[];
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);

      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")

      const data: PostsResponse = await res.json()

      setPosts(data.posts)
      setIsLoading(false);
    }

    fetcher()
  }, [])

if (isLoading) {
  return (
    <main className={styles.main}>
      <p>読み込み中...</p>
    </main>
  );
}

  return (
    <>
      <main className={styles.main}>
          {posts.map((post) => (
            <Link className={styles.post} key={post.id} to={`/posts/${post.id}`}>
              <div className={styles.postTop}>
                <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</p>

                <div className={styles.categories}>
                  {post.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
              </div>

              <h2 className={styles.title}>{post.title}</h2>

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Link>
          ))}
        </main>
    </>
  )
}
