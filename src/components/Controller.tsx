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
  <div className="grid grid-cols-3 w-48">
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
  const { activeDirections, dispatchDirection } = useUserInputContext();
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
      className={[
        "active:bg-secondary",
        "align-center",
        "aspect-square",
        activeDirections.has(direction) ? "bg-secondary" : "bg-primary",
        "cursor-pointer",
        "flex",
        "justify-center",
        "rounded-full",
        "text-4xl",
        "w-16",
      ].join(" ")}
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
