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
      <div className="my-2">
        {gameState.status === "END" ? (
          <ResetButton />
        ) : (
          <PlayButton disabled={gameState.status === "IN_PROGRESS"} />
        )}
      </div>
      <Display />
    </Container>
  );
};
