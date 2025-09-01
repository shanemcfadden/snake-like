import { useGameStateContext } from "../contexts/GameStateContext";
import { Container } from "./Container";
import { Display } from "./Display";
import { PlayButton } from "./PlayButton";
import { ResetButton } from "./ResetButton";

export const App = () => {
  const gameState = useGameStateContext();
  return (
    <Container>
      <h1>Snake</h1>
      {gameState.status === "END" ? (
        <ResetButton />
      ) : (
        <PlayButton disabled={gameState.status === "IN_PROGRESS"} />
      )}
      <Display />
    </Container>
  );
};
