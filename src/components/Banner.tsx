import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";

export const Banner = () => (
  <div className="flex justify-between">
    <div className="w-12" />
    <h1 className="my-4 text-center text-xl">Snake-like</h1>
    <div className="w-12 text-right my-auto text-3xl">
      <a href={GITHUB_REPOSITORY_URL} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon={faSquareGithub}
          title="View source on GitHub"
          widthAuto
        />
      </a>
    </div>
  </div>
);

const GITHUB_REPOSITORY_URL = "https://github.com/shanemcfadden/snake-like";
