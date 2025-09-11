import { useGame } from "../store/gameStore";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

export default function Play() {
  const { problems, current, sessionStart, sessionEnd, passed } = useGame();

  const finished = current >= problems.length && problems.length > 0;

  return (
    <div className="page">
      <ProgressBar />
      {!finished ? (
        <QuestionCard />
      ) : (
        <div className="summary">
          <h2>{passed ? "Belt Achieved! 🥋" : "Try Again"}</h2>
          {sessionStart && sessionEnd && (
            <p>Total time: {Math.round((sessionEnd - sessionStart) / 1000)}s</p>
          )}
        </div>
      )}
    </div>
  );
}
