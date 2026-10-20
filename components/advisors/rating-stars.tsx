import { Star } from "lucide-react";
export function RatingStars({
  rating,
  reviews,
}: {
  rating: number;
  reviews?: number;
}) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      <Star size={15} fill="currentColor" />
      {rating.toFixed(1)}{" "}
      {reviews !== undefined && <span className="muted">({reviews})</span>}
    </span>
  );
}
