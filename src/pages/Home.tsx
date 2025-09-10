import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="page">
      <h1>Train Your Brain</h1>
      <Link to="/play" className="btn">Start Level 1</Link>
    </div>
  );
}
