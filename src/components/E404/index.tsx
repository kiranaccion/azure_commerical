import Link from 'next/link';
import './styles.scss';
import { fetchContentfulMiscellaneousData } from '@/utils';

const Error404 = async () => {
  const { page404backgroundImage } = await fetchContentfulMiscellaneousData();
  const errorBackgroundImage = page404backgroundImage?.[0]?.src || '';

  return (
    <div className="not-found-page-container">
      <section style={{ backgroundImage: `url(${errorBackgroundImage})` }} className="image-container">
        <article className="not-found-text-container">
          <h1 className="title">404</h1>
          <h3 className="sub-title">This page could not be found</h3>
          <p className="description">
            The link may be incorrect or out of date, or you may have bookmarked a page that has been moved.
          </p>
          <Link href="/" aria-label="Back to Homepage">
            <button className="back-to-homepage">Back to homepage</button>
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Error404;
