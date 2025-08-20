import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Building2, Shield, User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showRole?: boolean;
  className?: string;
}

export function UserAvatar({
  user,
  size = "md",
  showRole = false,
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case "admin":
        return <Shield className="h-3 w-3" />;
      case "company":
        return <Building2 className="h-3 w-3" />;
      default:
        return <UserIcon className="h-3 w-3" />;
    }
  };

  const getRoleBadge = () => {
    if (!showRole) return null;

    const roleConfig = {
      admin: { label: "Admin", className: "bg-purple-100 text-purple-700" },
      company: { label: "Oficial", className: "bg-blue-100 text-blue-700" },
      citizen: { label: "Cidadão", className: "bg-gray-100 text-gray-700" },
    };

    const config = roleConfig[user.role];

    return (
      <Badge
        variant="secondary"
        className={cn("text-xs ml-2", config.className)}
      >
        {getRoleIcon()}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="text-xs">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      {getRoleBadge()}
    </div>
  );
}
