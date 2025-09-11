import { useGameStateContext } from "../contexts/GameStateContext";
import { Container } from "./Container";
import { Display } from "./Display";
import { Controller } from "./Controller";

export const App = () => {
  const gameState = useGameStateContext();
  return (
    <Container>
      <h1 className="my-4 text-center text-xl text-primary">Snake-like</h1>
      <div>Score: {gameState.status === "START" ? "0" : gameState.score}</div>
      <Display />
      <div className="flex justify-center my-4">
        <Controller />
      </div>
    </Container>
  );
};
