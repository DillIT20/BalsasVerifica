import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { posts, institutions, users } from "@/lib/mockData";
import {
  BarChart3,
  Users,
  Building2,
  Flag,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Shield,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = {
    totalPosts: posts.length,
    totalUsers: users.length,
    totalInstitutions: institutions.length,
    pendingReports: 5, 
    resolvedPosts: posts.filter((p) => p.status === "resolved").length,
    pendingPosts: posts.filter((p) => p.status === "pending").length,
    inProgressPosts: posts.filter((p) => p.status === "in_progress").length,
    premiumInstitutions: institutions.filter((i) => i.isPremium).length,
  };

  const resolutionRate = Math.round(
    (stats.resolvedPosts / stats.totalPosts) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-purple-600" />
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerencie usuários, instituições e monitore a plataforma
          </p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          Administrador
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalPosts}
            </div>
            <div className="text-sm text-muted-foreground">
              Total de Publicações
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-muted-foreground">Usuários Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalInstitutions}
            </div>
            <div className="text-sm text-muted-foreground">Instituições</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.pendingReports}
            </div>
            <div className="text-sm text-muted-foreground">
              Denúncias Pendentes
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Resolução
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {resolutionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.resolvedPosts} de {stats.totalPosts} publicações resolvidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Instituições Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {stats.premiumInstitutions}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (stats.premiumInstitutions / stats.totalInstitutions) * 100,
              )}
              % do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Crescimento Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+32%</div>
            <p className="text-xs text-muted-foreground">
              Novos usuários este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="posts">Publicações</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="institutions">Instituições</TabsTrigger>
          <TabsTrigger value="reports">Denúncias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Publicações por Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <div className="text-sm font-medium">
                    {stats.pendingPosts}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Em Andamento</span>
                  </div>
                  <div className="text-sm font-medium">
                    {stats.inProgressPosts}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Resolvidas</span>
                  </div>
                  <div className="text-sm font-medium">
                    {stats.resolvedPosts}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Nova publicação sobre infraestrutura</span>
                  <span className="text-muted-foreground ml-auto">há 5min</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>SABESP respondeu a uma publicação</span>
                  <span className="text-muted-foreground ml-auto">
                    há 12min
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Novo usuário cadastrado</span>
                  <span className="text-muted-foreground ml-auto">
                    há 23min
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Nova denúncia recebida</span>
                  <span className="text-muted-foreground ml-auto">há 1h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar Publicações</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{post.author.name}</span>
                        <Badge variant="outline">
                          @
                          {post.institution.name
                            .toLowerCase()
                            .replace(/\s+/g, "")}
                        </Badge>
                        <Badge
                          variant={
                            post.status === "resolved"
                              ? "default"
                              : post.status === "in_progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {post.status === "resolved"
                            ? "Resolvido"
                            : post.status === "in_progress"
                              ? "Em Andamento"
                              : "Pendente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{post.likes} curtidas</span>
                        <span>{post.commentsCount} comentários</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar Usuários</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filtrar por Tipo
              </Button>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          <Badge
                            variant={
                              user.role === "admin"
                                ? "default"
                                : user.role === "company"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {user.role === "admin"
                              ? "Admin"
                              : user.role === "company"
                                ? "Empresa"
                                : "Cidadão"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="institutions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar Instituições</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Nova Instituição
              </Button>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {institutions.map((institution) => (
              <Card key={institution.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">
                          {institution.type === "empresa" ? "🏢" : "🏛️"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {institution.name}
                          </span>
                          {institution.verified && (
                            <Star className="h-4 w-4 text-blue-500 fill-current" />
                          )}
                          {institution.isPremium && (
                            <Badge
                              variant="secondary"
                              className="bg-amber-100 text-amber-700"
                            >
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {institution.description}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{institution.totalMentions} menções</span>
                          <span>{institution.responseRate}% resposta</span>
                          <span>Média: {institution.averageResponseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Métricas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Denúncias Pendentes</h2>
            <Badge variant="destructive">
              {stats.pendingReports} pendentes
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Mock reports */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Flag className="h-4 w-4 text-red-500" />
                        <span className="font-medium">Conteúdo Inadequado</span>
                        <Badge variant="outline" className="text-red-600">
                          {i % 2 === 0 ? "Publicação" : "Comentário"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Usuário reportou linguagem ofensiva na publicação sobre
                        infraestrutura.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Reportado por: João Silva</span>
                        <span>•</span>
                        <span>há {i} horas</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                      >
                        Aprovar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
