import { Link } from "react-router-dom";
import { useGame } from "../store/gameStore";

export default function Header() {
  const { belt, level } = useGame();
  return (
    <header className="header">
      <Link to="/" className="logo">🥋 Math Karate</Link>
      <div className="belt-info">
        <span>Level {level} – {belt}</span>
      </div>
    </header>
  );
}
