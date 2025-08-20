import { useState } from "react";
import { Button } from "./button";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  size?: "sm" | "default";
  className?: string;
}

export function LikeButton({
  likes,
  dislikes,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  size = "default",
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount((prev) => prev - 1);
      }
    }
    onLike?.();
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
    } else {
      setDisliked(true);
      setDislikeCount((prev) => prev + 1);
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
    onDislike?.();
  };

  const buttonSize = size === "sm" ? "sm" : "sm";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleLike}
        className={cn(
          "h-8 px-2 gap-1",
          liked && "text-red-600 hover:text-red-700",
        )}
      >
        <ThumbsUp className={cn(iconSize, liked && "fill-current")} />
        <span className="text-xs font-medium">{likeCount}</span>
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={handleDislike}
        className={cn(
          "h-8 px-2 gap-1",
          disliked && "text-blue-600 hover:text-blue-700",
        )}
      >
        <ThumbsDown className={cn(iconSize, disliked && "fill-current")} />
        <span className="text-xs font-medium">{dislikeCount}</span>
      </Button>
    </div>
  );
}
