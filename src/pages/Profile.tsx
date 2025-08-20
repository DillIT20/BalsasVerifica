import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PostCard } from "@/components/PostCard";
import { currentUser, posts } from "@/lib/mockData";
import {
  Settings,
  Edit,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Star,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Get user's posts
  const userPosts = posts.filter((post) => post.authorId === currentUser.id);

  // Calculate user stats
  const stats = {
    totalPosts: userPosts.length,
    totalLikes: userPosts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: userPosts.reduce((sum, post) => sum + post.commentsCount, 0),
    resolvedPosts: userPosts.filter((post) => post.status === "resolved")
      .length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <UserAvatar user={currentUser} size="lg" />
              <div>
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-muted-foreground">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">
                    {currentUser.role === "citizen"
                      ? "Cidadão"
                      : currentUser.role}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Membro desde{" "}
                    {new Date(currentUser.createdAt).toLocaleDateString(
                      "pt-BR",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Editar Perfil
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalPosts}
            </div>
            <div className="text-sm text-muted-foreground">Publicações</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.totalLikes}
            </div>
            <div className="text-sm text-muted-foreground">
              Curtidas Recebidas
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalComments}
            </div>
            <div className="text-sm text-muted-foreground">Comentários</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.resolvedPosts}
            </div>
            <div className="text-sm text-muted-foreground">
              Casos Resolvidos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Minhas Publicações
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Curtidos
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2">
            <Star className="h-4 w-4" />
            Resolvidos
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Atividade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suas Publicações</h2>
            <Badge variant="secondary">{userPosts.length} publicações</Badge>
          </div>

          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/post/${post.id}`)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Nenhuma publicação ainda
              </h3>
              <p className="text-muted-foreground mb-4">
                Comece compartilhando suas experiências com empresas e órgãos
                públicos.
              </p>
              <Button onClick={() => navigate("/create")}>
                Fazer primeira publicação
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Publicações Curtidas</h2>
          </div>

          <Card className="p-8 text-center">
            <ThumbsUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhuma curtida ainda</h3>
            <p className="text-muted-foreground">
              As publicações que você curtir aparecerão aqui.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Seus Casos Resolvidos</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {stats.resolvedPosts} resolvidos
            </Badge>
          </div>

          {stats.resolvedPosts > 0 ? (
            <div className="space-y-4">
              {userPosts
                .filter((post) => post.status === "resolved")
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Nenhum caso resolvido ainda
              </h3>
              <p className="text-muted-foreground">
                Quando suas publicações forem resolvidas, elas aparecerão aqui.
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Atividade Recente</h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Você publicou sobre infraestrutura
                    </p>
                    <p className="text-xs text-muted-foreground">há 2 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Sua publicação recebeu 23 curtidas
                    </p>
                    <p className="text-xs text-muted-foreground">há 3 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Você se cadastrou no CidadãoVoz</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(currentUser.createdAt).toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
