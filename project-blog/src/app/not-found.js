import { BLOG_TITLE } from '@/constants';
import styles from './homepage.module.css';

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
    </div>
  );
}

export default NotFound;
