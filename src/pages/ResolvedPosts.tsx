import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { FilterBar } from "@/components/FilterBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "@/types";
import { posts } from "@/lib/mockData";
import { CheckCircle, Archive, TrendingUp, Calendar } from "lucide-react";

const ResolvedPosts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>({
    categories: [],
    status: ["resolved"], // Only show resolved posts
    institutionTypes: [],
    search: "",
  });

  // Filter to only show resolved posts
  const resolvedPosts = posts.filter((post) => {
    if (post.status !== "resolved") return false;

    // Category filter
    if (
      filter.categories.length > 0 &&
      !filter.categories.includes(post.category)
    ) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Publicações Resolvidas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Veja os problemas que foram solucionados através da nossa plataforma.
          Estes casos mostram o poder da comunicação entre cidadãos e
          instituições.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {resolvedPosts.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Casos Resolvidos
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((resolvedPosts.length / posts.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">
              Taxa de Resolução
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">2.5</div>
            <div className="text-sm text-muted-foreground">
              Dias Médios p/ Resolução
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <FilterBar
        filter={filter}
        onFilterChange={(newFilter) =>
          setFilter({ ...newFilter, status: ["resolved"] })
        }
      />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Arquivo de Resoluções
          </h2>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {resolvedPosts.length} resolvidos
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Mais Impactantes
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Mais Recentes
          </Button>
        </div>
      </div>

      {/* Success Stories Section */}
      {resolvedPosts.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Histórias de Sucesso
            </h3>
            <p className="text-green-700 mb-4">
              Estes casos demonstram como a comunicação direta entre cidadãos e
              instituições pode gerar resultados positivos para toda a
              comunidade.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-green-800">
                  Resposta Mais Rápida
                </div>
                <div className="text-green-600">4 horas - CPTM</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-green-800">
                  Maior Engajamento
                </div>
                <div className="text-green-600">
                  156 curtidas - Hospital Santa Casa
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resolved Posts */}
      <div className="space-y-4">
        {resolvedPosts.length > 0 ? (
          resolvedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => navigate(`/post/${post.id}`)}
              className="animate-fade-in opacity-90 hover:opacity-100"
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <Archive className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Nenhum caso resolvido encontrado
              </h3>
              <p className="text-sm">
                {filter.search ||
                filter.categories.length > 0 ||
                filter.institutionTypes.length > 0
                  ? "Tente ajustar os filtros para ver mais resultados."
                  : "Aguarde as primeiras resoluções aparecerem aqui!"}
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Ver Publicações Ativas
            </Button>
          </Card>
        )}
      </div>

      {/* Load More */}
      {resolvedPosts.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            Carregar mais casos resolvidos
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResolvedPosts;
