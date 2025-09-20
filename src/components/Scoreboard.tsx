import { memo } from "react";
import { useGameStateContext } from "../contexts/GameStateContext";

export const Scoreboard = () => {
  const gameState = useGameStateContext();

  const isCurrentScoreHigherThanHighScore =
    gameState.status !== "START" &&
    gameState.highScore
      .map((highScore) => gameState.score > highScore)
      .unwrapOrElse(false);

  const isEndingScoreNewHighScore =
    gameState.status === "END" && gameState.isHighScore;

  return (
    <div className="flex justify-between">
      <Score
        highlight={
          isCurrentScoreHigherThanHighScore || isEndingScoreNewHighScore
        }
        score={gameState.status === "START" ? 0 : gameState.score}
      />
      {gameState.status !== "START" && gameState.highScore.isSome() && (
        <Score isHighScore score={gameState.highScore.value} />
      )}
    </div>
  );
};

const Score = memo(
  ({
    highlight,
    isHighScore,
    score,
  }: {
    highlight?: boolean;
    isHighScore?: boolean;
    score: number;
  }) => (
    <div className={highlight ? "text-secondary" : ""}>
      {isHighScore && "High "}Score: {score}
    </div>
  ),
);
