import { useGame } from "../store/gameStore";
import type { AnswerMark } from "../types";

const Icon = ({ m }: { m: AnswerMark }) => (
  <span className={`icon ${m}`}>
    {m === "fast" ? "⚡" : m === "slow" ? "★" : "✗"}
  </span>
);

export default function ProgressBar() {
  const { marks, problems } = useGame();
  const pct = problems.length ? (marks.length / problems.length) * 100 : 0;

  return (
    <div className="progress-wrap">
      <div className="icons">
        {marks.map((m, i) => <Icon m={m} key={i} />)}
      </div>
      <div className="bar">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
