import { useMainLoopContext } from "../contexts/MainLoopContext";
import { Button } from "./Button";

type PlayButtonProps = {
  disabled?: boolean;
};

export const PlayButton = ({ disabled }: PlayButtonProps) => {
  const { start: startGame } = useMainLoopContext();

  return (
    <Button disabled={disabled} onClick={startGame}>
      Play
    </Button>
  );
};
