import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStarHalfStroke,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Rating({ rating = 0 }: { rating: number }) {
  const getStarIcon = (index: number) => {
    const starPosition = index + 1;

    if (rating >= starPosition) {
      return faStar;
    } else if (rating >= starPosition - 0.5) {
      return faStarHalfStroke;
    } else {
      return faStarRegular;
    }
  };
  return (
    <div className="text-yellow-400">
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon key={index} icon={getStarIcon(index)} />
      ))}
    </div>
  );
}
