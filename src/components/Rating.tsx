import { RiStarFill, RiStarHalfFill, RiStarLine } from "@remixicon/react";

interface RatingProps {
  rating: number;
}

const stars = [1, 2, 3, 4, 5];

function Rating({ rating }: RatingProps) {
  return (
    <div className="flex">
      {stars.map((e, i) => {
        if (rating >= e) {
          return <RiStarFill key={i} size={18} className="text-warning" />;
        }

        if (rating >= e - 0.5 && rating < e) {
          return <RiStarHalfFill key={i} size={18} className="text-warning" />;
          // return (
          //   <div
          //     key={i}
          //     className="hstack position-relative"
          //     style={{ width: 18 }}
          //   >
          //     <div className="position-absolute start-0">
          //       <RiStarLine key={i} size={18} className="text-default" />
          //     </div>
          //     <div className="overflow-hidden" style={{ width: 9, zIndex: 9 }}>
          //       <RiStarFill key={i} size={18} className="text-warning" />
          //     </div>
          //   </div>
          // );
        }

        return <RiStarLine key={i} size={18} className="text-muted" />;
      })}
    </div>
  );
}

export default Rating;
