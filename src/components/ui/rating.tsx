import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  size?: "lg" | "sm" | "default";
}

const stars = [1, 2, 3, 4, 5];

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

        const scale = e - rating;

        if (scale < 1) {
          let width = 1 - scale;
          if (width < 0.4) {
            width += 0.05;
          } else if (width > 0.5) {
            width -= 0.05;
          }
          return (
            <div key={i} className="flex relative" style={{ width: iconSize }}>
              <div className="absolute left-0">
                <Star
                  key={i}
                  size={iconSize}
                  fill={defaultColor}
                  stroke={defaultColor}
                />
              </div>
              <div
                className={`overflow-hidden z-[1]`}
                style={{ width: iconSize * width }}
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
