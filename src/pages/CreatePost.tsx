import { useNavigate } from "react-router-dom";
import { PostForm } from "@/components/PostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Info, Users, Building2, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Nova publicação:", data);
    // TODO: Enviar dados para API
    navigate("/");
  };

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
          <h1 className="text-2xl font-bold">Nova Publicação</h1>
          <p className="text-muted-foreground">
            Compartilhe sua experiência com empresas e órgãos públicos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <PostForm onSubmit={handleSubmit} />
        </div>

        {/* Sidebar with Tips */}
        <div className="space-y-4">
          {/* Guidelines */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Dicas para uma boa publicação
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-green-600">✓</span>
                  Seja específico sobre o problema ou situação
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-green-600">✓</span>
                  Use linguagem respeitosa e educada
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-green-600">✓</span>
                  Inclua localização quando relevante
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-green-600">✓</span>
                  Escolha a categoria correta
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-red-600">✗</span>
                  Evite informações pessoais sensíveis
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                Como funciona?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Você publica</p>
                    <p className="text-muted-foreground">
                      Sua mensagem fica pública para todos verem
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Comunidade interage</p>
                    <p className="text-muted-foreground">
                      Outros usuários podem curtir e comentar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Empresa responde</p>
                    <p className="text-muted-foreground">
                      A instituição pode responder publicamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Resolução privada</p>
                    <p className="text-muted-foreground">
                      Se necessário, vocês podem conversar em privado
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Impact */}
          <Alert>
            <Users className="h-4 w-4" />
            <AlertDescription>
              <strong>Impacto na comunidade:</strong> Sua publicação pode ajudar
              outras pessoas que passam pelo mesmo problema e pressionar por
              melhorias.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
