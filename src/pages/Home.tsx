import { Link } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../store/gameStore";
import { BELT_RULES } from "../utils/belts";
import type { Belt } from "../utils/belts";
import { loadLevels } from "../utils/levels";

const BELTS: Belt[] = [
  "white","yellow","green","blue","red","brown",
  "black1","black2","black3","black4","black5","black6","black7"
];

export default function Home() {
  const [belt, setBelt] = useState<Belt>("white");
  const [level, setLevel] = useState(1);
  const start = useGame(s => s.startBelt);
  const levels = loadLevels();

  return (
    <div className="page">
      <h1>Train Your Brain</h1>
      <label>Level:&nbsp;
        <select value={level} onChange={e => setLevel(Number(e.target.value))}>
          {levels.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>
      </label>
      <br/><br/>
      <label>Belt:&nbsp;
        <select value={belt} onChange={e => setBelt(e.target.value as Belt)}>
          {BELTS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>
      <div style={{marginTop:12}}>
        <Link to="/play" className="btn"
          onClick={() => start(level, belt, levels.find(l => l.id === level)?.maxSum)}>
          Start Level {level} – {belt} ({BELT_RULES[belt].items} in &lt; {BELT_RULES[belt].timeSec}s)
        </Link>
      </div>
      {/* New Admin button */}
        <div style={{ marginTop: 12 }}>
          <Link to="/admin" className="btn-secondary">
            Admin
          </Link>
        </div>

    </div>
  );
}
