"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-500",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  ratingNumber?: boolean;
}

export const CommentRatings = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "yellow",
  onRatingChange,
  interactive = false,
  ratingNumber = false,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  const displayRating = hoverRating ?? currentRating;
  const fullStars = Math.floor(displayRating);
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div
      className="flex w-fit items-center gap-2"
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      {...props}
    >
      <span
        className="flex items-center"
        onMouseEnter={interactive ? handleMouseEnter : undefined}
      >
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].star
            ),
            onClick: interactive ? handleClick : undefined,
            onMouseEnter: interactive ? handleMouseEnter : undefined,
            "data-star-index": i + 1,
          })
        )}
        {partialStar}
        {[
          ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
        ].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn("stroke-1", ratingVariants[variant].emptyStar),
            onClick: interactive ? handleClick : undefined,
            onMouseEnter: interactive ? handleMouseEnter : undefined,
            "data-star-index": i + fullStars + 1,
          })
        )}
      </span>
      {ratingNumber && (
        <h5 className="text-yellow-500 font-bold">{currentRating}</h5>
      )}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}

const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, Icon } = props;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};
