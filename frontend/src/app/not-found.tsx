'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <Link href="/">
        <button className="not-found-button">
          Go Home
        </button>
      </Link>
    </div>
  );
}
