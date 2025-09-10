import { useMainLoopContext } from "../contexts/MainLoopContext";
import { Button } from "./Button";

type PlayButtonProps = {
  again?: boolean;
  disabled?: boolean;
};

export const PlayButton = ({ again, disabled }: PlayButtonProps) => {
  const { start: startGame } = useMainLoopContext();

  return (
    <Button disabled={disabled} onClick={startGame}>
      Play{again ? " Again" : ""}
    </Button>
  );
};
