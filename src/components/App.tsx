import { Container } from "./Container";
import { Display } from "./Display";
import { Controller } from "./Controller";
import { Scoreboard } from "./Scoreboard";

export const App = () => (
    <Container>
      <h1 className="my-4 text-center text-xl text-primary">Snake-like</h1>
      <Scoreboard />
      <Display />
      <div className="flex justify-center my-4">
        <Controller />
      </div>
    </Container>
  );
