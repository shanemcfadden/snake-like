import { useGameStateContext } from "../contexts/GameStateContext";
import { Container } from "./Container";
import { Display } from "./Display";
import { PlayButton } from "./PlayButton";
import { ResetButton } from "./ResetButton";

export const App = () => {
  const gameState = useGameStateContext();
  return (
    <Container>
      <h1 className="my-4 text-center text-xl text-primary">Snake-like</h1>
      <div className="flex justify-between items-end">
        <div>
          {gameState.status === "END" ? (
            <ResetButton />
          ) : (
            <PlayButton disabled={gameState.status === "IN_PROGRESS"} />
          )}
        </div>
        {gameState.status !== "START" && <div>Score: {gameState.score}</div>}
      </div>
      <Display />
    </Container>
  );
};
