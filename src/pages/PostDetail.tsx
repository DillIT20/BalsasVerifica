import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { LikeButton } from "@/components/ui/like-button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { posts, comments, currentUser, postTypes } from "@/lib/mockData";
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageCircle,
  Send,
  Flag,
  Users,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = posts.find((p) => p.id === id);
  const postComments = comments.filter((c) => c.postId === id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">
          Publicação não encontrada
        </h2>
        <Button onClick={() => navigate("/")} variant="outline">
          Voltar ao feed
        </Button>
      </div>
    );
  }

  const postType = postTypes.find((t) => t.value === post.type);
  const isResolved = post.status === "resolved";

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Novo comentário:", newComment);
    setNewComment("");
    setIsSubmitting(false);
  };

  const canRespondPrivately =
    currentUser.role === "company" &&
    currentUser.institutionId === post.institutionId;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Feed
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Detalhes da Publicação</h1>
        </div>
      </div>

      {/* Main Post */}
      <Card
        className={cn(
          "transition-all",
          post.hasOfficialResponse && "ring-2 ring-blue-200",
          isResolved && "bg-green-50 border-green-200",
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <UserAvatar user={post.author} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{post.author.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground text-sm">
                    {new Date(post.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    @{post.institution.name.toLowerCase().replace(/\s+/g, "")}
                  </Badge>
                  {post.institution.verified && (
                    <Star className="h-4 w-4 text-blue-500 fill-current" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <StatusBadge status={post.status} />
              {post.hasOfficialResponse && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Resposta Oficial
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={post.category} />
            {postType && (
              <Badge
                variant="outline"
                className={cn("text-sm", postType.color)}
              >
                {postType.label}
              </Badge>
            )}
          </div>

          <p className="text-base leading-relaxed">{post.content}</p>

          {post.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{post.location}</span>
            </div>
          )}

          {isResolved && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Esta publicação foi marcada como resolvida pela instituição. Ela
                será arquivada em breve.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <LikeButton
            likes={post.likes}
            dislikes={post.dislikes}
            isLiked={post.isLikedByUser}
            isDisliked={post.isDislikedByUser}
          />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {post.commentsCount} comentários
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-red-600 hover:text-red-700"
            >
              <Flag className="h-4 w-4" />
              Denunciar
            </Button>
            {canRespondPrivately && (
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Conversar em Privado
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Institution Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">
                {post.institution.type === "empresa" ? "🏢" : "🏛️"}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.institution.name}</h3>
                {post.institution.verified && (
                  <Star className="h-4 w-4 text-blue-500 fill-current" />
                )}
                {post.institution.isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {post.institution.description}
              </p>
              {post.institution.responseRate && (
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>
                    Taxa de resposta: {post.institution.responseRate}%
                  </span>
                  <span>
                    Tempo médio: {post.institution.averageResponseTime}
                  </span>
                  <span>{post.institution.totalMentions} menções</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comentários ({postComments.length})
          </h3>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add Comment Form */}
          {!isResolved && (
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="flex items-start gap-3">
                <UserAvatar user={currentUser} size="md" />
                <div className="flex-1">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newComment.trim() || isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Comentar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}

          <Separator />

          {/* Comments List */}
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <UserAvatar
                  user={comment.author}
                  size="md"
                  showRole={comment.isOfficial}
                />
                <div className="flex-1">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      comment.isOfficial
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">
                        {comment.author.name}
                      </span>
                      {comment.isOfficial && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-700"
                        >
                          Resposta Oficial
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <LikeButton
                      likes={comment.likes}
                      dislikes={comment.dislikes}
                      isLiked={comment.isLikedByUser}
                      isDisliked={comment.isDislikedByUser}
                      size="sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                    >
                      Responder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {postComments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Seja o primeiro a comentar nesta publicação!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDetail;
