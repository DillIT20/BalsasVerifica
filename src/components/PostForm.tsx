import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { PostCategory, PostType, Institution } from "@/types";
import {
  categories,
  postTypes,
  institutions,
  currentUser,
} from "@/lib/mockData";
import { MapPin, Building2, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostFormProps {
  onSubmit?: (data: {
    content: string;
    category: PostCategory;
    type: PostType;
    institutionId: string;
    location?: string;
  }) => void;
  className?: string;
}

export function PostForm({ onSubmit, className }: PostFormProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory | "">("");
  const [type, setType] = useState<PostType | "">("");
  const [institutionId, setInstitutionId] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedInstitution = institutions.find(
    (inst) => inst.id === institutionId,
  );
  const selectedCategory = categories.find((cat) => cat.value === category);
  const selectedType = postTypes.find((t) => t.value === type);

  const isValid =
    content.trim().length > 10 && category && type && institutionId;
  const characterCount = content.length;
  const maxCharacters = 1000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit?.({
      content: content.trim(),
      category: category as PostCategory,
      type: type as PostType,
      institutionId,
      location: location.trim() || undefined,
    });

    // Reset form
    setContent("");
    setCategory("");
    setType("");
    setInstitutionId("");
    setLocation("");
    setIsSubmitting(false);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <UserAvatar user={currentUser} size="md" />
          <div>
            <h3 className="text-lg font-semibold">Nova Publicação</h3>
            <p className="text-sm text-muted-foreground">
              Compartilhe um problema, elogio ou sugestão
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Mensagem *</Label>
            <Textarea
              id="content"
              placeholder="Descreva sua situação de forma clara e objetiva..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={maxCharacters}
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                Seja específico e educado para obter melhores respostas
              </span>
              <span
                className={cn(
                  "font-medium",
                  characterCount > maxCharacters * 0.9
                    ? "text-red-600"
                    : "text-muted-foreground",
                )}
              >
                {characterCount}/{maxCharacters}
              </span>
            </div>
          </div>

          {/* Type and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as PostType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {postTypes.map((postType) => (
                    <SelectItem key={postType.value} value={postType.value}>
                      <span className={postType.color}>{postType.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as PostCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Institution */}
          <div className="space-y-2">
            <Label htmlFor="institution">Instituição *</Label>
            <Select value={institutionId} onValueChange={setInstitutionId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa ou prefeitura" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((institution) => (
                  <SelectItem key={institution.id} value={institution.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{institution.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {institution.type === "empresa" ? "🏢" : "🏛️"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Localização
              <span className="text-muted-foreground text-xs ml-1">
                (opcional)
              </span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ex: Rua das Flores, 123 - Centro"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Preview */}
          {selectedCategory && selectedType && selectedInstitution && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Prévia:</p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {selectedCategory.icon} {selectedCategory.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn("text-xs", selectedType.color)}
                >
                  {selectedType.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  @{selectedInstitution.name.toLowerCase().replace(/\s+/g, "")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{content.substring(0, 100)}
                {content.length > 100 ? "..." : ""}"
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              <span>
                Sua publicação será pública e poderá receber respostas oficiais
              </span>
            </div>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publicar
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
