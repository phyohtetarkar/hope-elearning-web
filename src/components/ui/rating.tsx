import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  size?: "lg" | "sm" | "default";
}

const stars = [1, 2, 3, 4, 5];

const size = 18;

const activeColor = "#ff9017";

const defaultColor = "#cbd5e1";

function Rating({ rating, size = "default" }: RatingProps) {
  let iconSize = 18;

  switch (size) {
    case "lg":
      iconSize = 20;
      break;
    case "sm":
      iconSize = 16;
      break;
    case "default":
      iconSize = 18;
      break;
  }

  return (
    <div className="flex">
      {stars.map((e, i) => {
        if (rating >= e) {
          return (
            <Star
              key={i}
              size={iconSize}
              fill={activeColor}
              stroke={activeColor}
            />
          );
        }

        if (rating >= e - 0.5 && rating < e) {
          // return <RiStarHalfFill key={i} size={18} className="text-warning" />;
          return (
            <div key={i} className="flex relative" style={{ width: 18 }}>
              <div className="absolute left-0">
                <Star
                  key={i}
                  size={iconSize}
                  fill={defaultColor}
                  stroke={defaultColor}
                />
              </div>
              <div
                className={`overflow-hidden z-10`}
                style={{ width: iconSize / 2 }}
              >
                <Star
                  key={i}
                  size={iconSize}
                  fill={activeColor}
                  stroke={activeColor}
                />
              </div>
            </div>
          );
        }

        return (
          <Star
            key={i}
            size={iconSize}
            fill={defaultColor}
            stroke={defaultColor}
          />
        );
      })}
    </div>
  );
}

export default Rating;
