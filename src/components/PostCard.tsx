import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { LikeButton } from "@/components/ui/like-button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Post } from "@/types";
import { MessageCircle, MapPin, Flag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { postTypes } from "@/lib/mockData";

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  className?: string;
}

export function PostCard({ post, onClick, className }: PostCardProps) {
  const postType = postTypes.find((t) => t.value === post.type);
  const isResolved = post.status === "resolved";

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer",
        post.hasOfficialResponse && "ring-2 ring-blue-200",
        isResolved && "opacity-75",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <UserAvatar user={post.author} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{post.author.name}</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">
                  {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  @{post.institution.name.toLowerCase().replace(/\s+/g, "")}
                </Badge>
                {post.institution.verified && (
                  <Star className="h-3 w-3 text-blue-500 fill-current" />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <StatusBadge status={post.status} />
            {post.hasOfficialResponse && (
              <Badge
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700"
              >
                Resposta Oficial
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={post.category} />
            {postType && (
              <Badge
                variant="outline"
                className={cn("text-xs", postType.color)}
              >
                {postType.label}
              </Badge>
            )}
          </div>

          <p className="text-sm leading-relaxed">{post.content}</p>

          {post.location && (
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <span>{post.location}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <LikeButton
            likes={post.likes}
            dislikes={post.dislikes}
            isLiked={post.isLikedByUser}
            isDisliked={post.isDislikedByUser}
            size="sm"
          />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1 text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs">{post.commentsCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1 text-muted-foreground hover:text-red-600"
            >
              <Flag className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
