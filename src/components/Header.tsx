import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">🥋 Math Karate</Link>
    </header>
  );
}
