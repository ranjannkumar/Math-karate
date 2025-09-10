import { useEffect } from "react";
import { useGame } from "../store/gameStore";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

export default function Play() {
  const { problems, startSession, current, sessionStart, sessionEnd } = useGame();

  useEffect(() => {
    if (problems.length === 0) startSession(10);
  }, [problems.length, startSession]);

  const finished = current >= problems.length && problems.length > 0;

  return (
    <div className="page">
      <ProgressBar />
      {!finished ? (
        <QuestionCard />
      ) : (
        <div className="summary">
          <h2>Done!</h2>
          {sessionStart && sessionEnd && (
            <p>Total time: {Math.round((sessionEnd - sessionStart) / 1000)}s</p>
          )}
        </div>
      )}
    </div>
  );
}
