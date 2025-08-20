import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/mockData";
import { Bell, Plus, Settings, LogOut, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-8 w-8 bg-gradient-to-br from-civic-blue-500 to-civic-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🏛️</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">BalsasVerifica</h1>
            <p className="text-xs text-muted-foreground leading-none">
              Sua voz, nossa cidade
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-sm"
          >
            Feed Público
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/resolved")}
            className="text-sm"
          >
            Resolvidos
          </Button>
          {currentUser.role === "admin" && (
            <Button
              variant="ghost"
              onClick={() => navigate("/admin")}
              className="text-sm gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Admin
            </Button>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Create Post Button */}
          <Button
            onClick={() => navigate("/create")}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Publicação</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <UserAvatar user={currentUser} size="md" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <UserAvatar user={currentUser} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <Users className="h-4 w-4 mr-2" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
