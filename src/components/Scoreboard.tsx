import { useGameStateContext } from "../contexts/GameStateContext";

export const Scoreboard = () => {
  const gameState = useGameStateContext();

  return (
    <div className="flex justify-between">
      <Score score={gameState.status === "START" ? 0 : gameState.score} />
      {gameState.status !== "START" && gameState.highScore !== 0 && (
        <Score isHighScore score={gameState.highScore} />
      )}
    </div>
  );
};

const Score = ({
  isHighScore,
  score,
}: {
  isHighScore?: boolean;
  score: number;
}) => (
  <div>
    {isHighScore && "High "}Score: {score}
  </div>
);
