import { useGame } from "../store/gameStore";

export default function QuestionCard() {
  const { problems, current, answer } = useGame();
  const p = problems[current];
  if (!p) return null;

  return (
    <div className="card">
      <h2 className="q">{p.a} + {p.b} = ?</h2>
      <div className="choices">
        {p.choices.map((c) => (
          <button key={c} onClick={() => answer(c)} className="choice">
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
