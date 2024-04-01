import { StarIcon } from "@heroicons/react/24/solid";

interface RatingProps {
  rating: number;
}

const stars = [1, 2, 3, 4, 5];

function Rating({ rating }: RatingProps) {
  return (
    <div className="flex">
      {stars.map((e, i) => {
        if (rating >= e) {
          return <StarIcon key={i} width={18} className="text-warning" />;
        }

        if (rating >= e - 0.5 && rating < e) {
          // return <RiStarHalfFill key={i} size={18} className="text-warning" />;
          return (
            <div
              key={i}
              className="flex relative"
              style={{ width: 18 }}
            >
              <div className="absolute left-0">
                <StarIcon key={i} width={18} className="text-gray-300" />
              </div>
              <div className="overflow-hidden z-10 w-[9px]">
                <StarIcon key={i} width={18} className="text-warning" />
              </div>
            </div>
          );
        }

        return <StarIcon key={i} width={18} className="text-gray-300" />;
      })}
    </div>
  );
}

export default Rating;
