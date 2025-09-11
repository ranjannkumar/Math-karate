import { useEffect, useState } from "react";
import { loadLevels, saveLevels } from "../utils/levels";
import type {  LevelSpec } from "../utils/levels";


export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [levels, setLevels] = useState<LevelSpec[]>([]);

  useEffect(() => setLevels(loadLevels()), []);

  if (!authed) {
    return (
      <div className="page">
        <h1>Admin</h1>
        <p>Enter password:</p>
        <input value={pwd} onChange={e => setPwd(e.target.value)} />
        <button className="btn" onClick={() => setAuthed(pwd === "PIANO")}>Enter</button>
        {pwd && pwd !== "PIANO" && <p style={{color:'crimson'}}>Wrong password</p>}
      </div>
    );
  }

  const addLevel = () => setLevels(l => [...l, {
    id: (l.at(-1)?.id ?? 0) + 1,
    label: `Level ${(l.at(-1)?.id ?? 0) + 1}`,
    maxSum: 5,
  }]);

  const save = () => { saveLevels(levels); alert("Saved"); };

  return (
    <div className="page">
      <h1>Admin • Levels</h1>
      <table style={{width:'100%', borderCollapse:'collapse', margin:'12px 0'}}>
        <thead><tr><th>ID</th><th>Label</th><th>maxSum</th></tr></thead>
        <tbody>
          {levels.map((lv, i) => (
            <tr key={lv.id}>
              <td>{lv.id}</td>
              <td><input value={lv.label}
                onChange={e => setLevels(s => s.map((x,ix)=>ix===i?{...x,label:e.target.value}:x))} /></td>
              <td><input type="number" min={0} value={lv.maxSum}
                onChange={e => setLevels(s => s.map((x,ix)=>ix===i?{...x,maxSum:parseInt(e.target.value||'0',10)}:x))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={addLevel}>+ Add Level</button>&nbsp;
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
