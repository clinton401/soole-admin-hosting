import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-container container">
      <h1 className="not-found-title">404</h1>

      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="not-found-home-button">Go Back Home</Link>
    </div>
  );
}
