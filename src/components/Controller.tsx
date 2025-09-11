import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useUserInputContext } from "../contexts/UserInputContext";
import type { Direction } from "../types";
import { useCallback, type MouseEventHandler } from "react";

export const Controller = () => (
  <div className="grid grid-cols-3 w-72">
    <div />
    <ControllerButton direction={"up"} />
    <div />
    <ControllerButton direction={"left"} />
    <div />
    <ControllerButton direction={"right"} />
    <div />
    <ControllerButton direction={"down"} />
    <div />
  </div>
);

const ControllerButton = ({ direction }: { direction: Direction }) => {
  const { dispatchDirection } = useUserInputContext();
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatchDirection(direction);
    },
    [dispatchDirection, direction],
  );

  const icon = DIRECTION_TO_ICON_MAP[direction];

  return (
    <button
      className="bg-primary active:bg-secondary w-24 aspect-square text-6xl rounded-full flex justify-center align-center"
      onClick={onClick}
    >
      <div className="my-auto">
        <FontAwesomeIcon icon={icon} className="text-background" />
      </div>
    </button>
  );
};

const DIRECTION_TO_ICON_MAP: Record<Direction, IconDefinition> = {
  up: faChevronUp,
  down: faChevronDown,
  left: faChevronLeft,
  right: faChevronRight,
};
