import { useGameStateDispatchContext } from "../contexts/GameStateContext";
import { Button } from "./Button";

export const ResetButton = () => {
  const dispatch = useGameStateDispatchContext();

  return <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>;
};
