import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../App.module.css";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categories: string[];
  thumbnailUrl: string;
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetcher = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
    );
    const data = await res.json();

    setPost(data.post);
    setIsLoading(false);
  };

  fetcher();
}, [id]);

if (isLoading) {
  return (
    <main className={styles.main}>
      <p>読み込み中...</p>
    </main>
  );
}

if (!post) {
  return (
    <main className={styles.main}>
      <p>記事が見つかりませんでした</p>
    </main>
  );
}

  return (
    <>
      <main className={styles.main}>
        <div className={styles.detail}>
          <img className={styles.thumbnail} src={post.thumbnailUrl} alt={post.title}/>

          <div className={styles.detailBody}>
            <div className={styles.postTop}>
              <p className={styles.date}>
                {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </p>

              <div className={styles.categories}>
                {post.categories.map((category) => (
                    <span key={`${post.id}-${category}`}>{category}</span>
                ))}
              </div>
            </div>

            <h2 className={styles.title}>{post.title}</h2>

            <div
              className={`${styles.content} ${styles.contentFull}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
