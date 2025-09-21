import { Container } from "./Container";
import { Display } from "./Display";
import { Controller } from "./Controller";
import { Scoreboard } from "./Scoreboard";
import { Banner } from "./Banner";

export const App = () => (
  <Container>
    <Banner />
    <Scoreboard />
    <Display />
    <div className="flex justify-center my-4">
      <Controller />
    </div>
  </Container>
);
