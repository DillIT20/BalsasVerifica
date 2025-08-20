import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "@/types";
import { posts } from "@/lib/mockData";
import { Plus, TrendingUp, MessageCircle, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>({
    categories: [],
    status: [],
    institutionTypes: [],
    search: "",
  });

  // Filter posts based on current filter
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude resolved posts from main feed
      if (post.status === "resolved") return false;

      // Category filter
      if (
        filter.categories.length > 0 &&
        !filter.categories.includes(post.category)
      ) {
        return false;
      }

      // Status filter
      if (filter.status.length > 0 && !filter.status.includes(post.status)) {
        return false;
      }

      // Institution type filter
      if (
        filter.institutionTypes.length > 0 &&
        !filter.institutionTypes.includes(post.institution.type)
      ) {
        return false;
      }

      // Search filter
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        const searchableText =
          `${post.content} ${post.author.name} ${post.institution.name}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [filter]);

  // Statistics
  const stats = {
    total: filteredPosts.length,
    pending: filteredPosts.filter((p) => p.status === "pending").length,
    inProgress: filteredPosts.filter((p) => p.status === "in_progress").length,
    withResponse: filteredPosts.filter((p) => p.hasOfficialResponse).length,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8 bg-gradient-to-r from-civic-blue-50 to-civic-purple-50 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo ao BalsasVerifica
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Comunique problemas, elogios e sugestões para empresas e prefeituras.
          Sua voz pode fazer a diferença na sua comunidade.
        </p>
        <Button onClick={() => navigate("/create")} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Fazer sua primeira publicação
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-civic-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">
              Publicações Ativas
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {stats.pending}
            </div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-muted-foreground">Em Andamento</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.withResponse}
            </div>
            <div className="text-sm text-muted-foreground">Com Resposta</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <FilterBar filter={filter} onFilterChange={setFilter} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Feed Público</h2>
          <Badge variant="secondary">{filteredPosts.length} publicações</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Mais Relevantes
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Clock className="h-4 w-4" />
            Mais Recentes
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => navigate(`/post/${post.id}`)}
              className="animate-fade-in"
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Nenhuma publicação encontrada
              </h3>
              <p className="text-sm">
                {filter.search ||
                filter.categories.length > 0 ||
                filter.status.length > 0 ||
                filter.institutionTypes.length > 0
                  ? "Tente ajustar os filtros para ver mais resultados."
                  : "Seja o primeiro a fazer uma publicação!"}
              </p>
            </div>
            <Button
              onClick={() => navigate("/create")}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Publicação
            </Button>
          </Card>
        )}
      </div>

      {/* Load More Button */}
      {filteredPosts.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            Carregar mais publicações
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
