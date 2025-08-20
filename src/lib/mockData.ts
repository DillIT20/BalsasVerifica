import {
  User,
  Institution,
  Post,
  Comment,
  PostCategory,
  PostType,
  PostStatus,
  InstitutionType,
} from "@/types";

// Mock current user (can be changed to simulate different roles)
export const currentUser: User = {
  id: "1",
  name: "João Silva",
  email: "joao@email.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
  role: "citizen",
  createdAt: new Date("2024-01-15"),
};

export const institutions: Institution[] = [
  {
    id: "inst1",
    name: "Prefeitura de São Paulo",
    type: "prefeitura",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Brasao_Sao_Paulo_cidade.svg/64px-Brasao_Sao_Paulo_cidade.svg.png",
    description: "Administração municipal da cidade de São Paulo",
    verified: true,
    isPremium: true,
    responseRate: 85,
    averageResponseTime: "2 dias",
    totalMentions: 1247,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "inst2",
    name: "Sabesp",
    type: "empresa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sabesp_logo.svg/64px-Sabesp_logo.svg.png",
    description: "Companhia de Saneamento Básico do Estado de São Paulo",
    verified: true,
    isPremium: true,
    responseRate: 78,
    averageResponseTime: "1 dia",
    totalMentions: 892,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "inst3",
    name: "Hospital Santa Casa",
    type: "empresa",
    description: "Rede hospitalar privada",
    verified: true,
    isPremium: false,
    responseRate: 45,
    averageResponseTime: "5 dias",
    totalMentions: 234,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "inst4",
    name: "CPTM",
    type: "empresa",
    description: "Companhia Paulista de Trens Metropolitanos",
    verified: true,
    isPremium: true,
    responseRate: 92,
    averageResponseTime: "4 horas",
    totalMentions: 1456,
    createdAt: new Date("2024-01-01"),
  },
];

export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9a15a1b?w=64&h=64&fit=crop&crop=face",
    role: "citizen",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@sabesp.com.br",
    role: "company",
    institutionId: "inst2",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@prefeitura.sp.gov.br",
    role: "company",
    institutionId: "inst1",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    name: "Pedro Ferreira",
    email: "pedro@email.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    role: "citizen",
    createdAt: new Date("2024-03-01"),
  },
];

export const posts: Post[] = [
  {
    id: "1",
    content:
      "O buraco na Rua Augusta, altura do número 1500, está causando acidentes. Já vi dois carros com pneu furado hoje. Quando vão resolver isso? @prefeiturasp",
    authorId: "1",
    author: currentUser,
    institutionId: "inst1",
    institution: institutions[0],
    category: "infraestrutura",
    type: "problema",
    status: "pending",
    likes: 23,
    dislikes: 2,
    commentsCount: 8,
    isLikedByUser: true,
    hasOfficialResponse: false,
    location: "Rua Augusta, 1500 - São Paulo",
    createdAt: new Date("2024-03-15T10:30:00"),
    updatedAt: new Date("2024-03-15T10:30:00"),
  },
  {
    id: "2",
    content:
      "Excelente atendimento no posto de saúde da Vila Mariana! A equipe foi muito atenciosa e o tempo de espera foi mínimo. Parabéns! @prefeiturasp",
    authorId: "2",
    author: users[1],
    institutionId: "inst1",
    institution: institutions[0],
    category: "saude",
    type: "elogio",
    status: "pending",
    likes: 45,
    dislikes: 0,
    commentsCount: 12,
    hasOfficialResponse: true,
    location: "Vila Mariana - São Paulo",
    createdAt: new Date("2024-03-14T15:45:00"),
    updatedAt: new Date("2024-03-14T15:45:00"),
  },
  {
    id: "3",
    content:
      "Falta de água constante no bairro do Tatuapé. Já é a terceira vez neste mês. Não conseguimos trabalhar assim! @sabesp",
    authorId: "5",
    author: users[4],
    institutionId: "inst2",
    institution: institutions[1],
    category: "infraestrutura",
    type: "problema",
    status: "in_progress",
    likes: 67,
    dislikes: 1,
    commentsCount: 23,
    hasOfficialResponse: true,
    location: "Tatuapé - São Paulo",
    createdAt: new Date("2024-03-13T08:20:00"),
    updatedAt: new Date("2024-03-14T14:30:00"),
  },
  {
    id: "4",
    content:
      "Que tal implementar mais ciclovias na zona oeste? Seria ótimo para incentivar o transporte sustentável e melhorar a qualidade do ar. @prefeiturasp",
    authorId: "2",
    author: users[1],
    institutionId: "inst1",
    institution: institutions[0],
    category: "transporte",
    type: "sugestao",
    status: "pending",
    likes: 89,
    dislikes: 12,
    commentsCount: 31,
    hasOfficialResponse: false,
    location: "Zona Oeste - São Paulo",
    createdAt: new Date("2024-03-12T19:15:00"),
    updatedAt: new Date("2024-03-12T19:15:00"),
  },
  {
    id: "5",
    content:
      "Demora excessiva no atendimento emergencial. Minha mãe esperou 4 horas para ser atendida com dor no peito! Isso é inadmissível! @santacasa",
    authorId: "5",
    author: users[4],
    institutionId: "inst3",
    institution: institutions[2],
    category: "saude",
    type: "problema",
    status: "resolved",
    likes: 156,
    dislikes: 8,
    commentsCount: 42,
    hasOfficialResponse: true,
    location: "Hospital Santa Casa",
    createdAt: new Date("2024-03-10T22:30:00"),
    updatedAt: new Date("2024-03-12T16:45:00"),
  },
  {
    id: "6",
    content:
      "Trens da linha 7-Rubi com atraso constante nos horários de pico. Chego atrasado no trabalho todos os dias. @cptm",
    authorId: "1",
    author: currentUser,
    institutionId: "inst4",
    institution: institutions[3],
    category: "transporte",
    type: "problema",
    status: "pending",
    likes: 78,
    dislikes: 3,
    commentsCount: 19,
    hasOfficialResponse: true,
    location: "Linha 7-Rubi",
    createdAt: new Date("2024-03-11T07:45:00"),
    updatedAt: new Date("2024-03-11T07:45:00"),
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    content: "Também vi esse buraco! É muito perigoso, especialmente à noite.",
    authorId: "2",
    author: users[1],
    postId: "1",
    isOfficial: false,
    likes: 5,
    dislikes: 0,
    createdAt: new Date("2024-03-15T11:15:00"),
  },
  {
    id: "c2",
    content:
      "Olá! Agradecemos o relato. Nossa equipe já foi acionada e o reparo está programado para esta semana. Pedimos desculpas pelo transtorno.",
    authorId: "4",
    author: users[3],
    postId: "1",
    isOfficial: true,
    likes: 12,
    dislikes: 1,
    createdAt: new Date("2024-03-15T14:30:00"),
  },
  {
    id: "c3",
    content: "Que bom saber que há pessoas reconhecendo o bom trabalho do SUS!",
    authorId: "5",
    author: users[4],
    postId: "2",
    isOfficial: false,
    likes: 8,
    dislikes: 0,
    createdAt: new Date("2024-03-14T16:20:00"),
  },
  {
    id: "c4",
    content:
      "Ficamos muito felizes com seu feedback! Nossa equipe se dedica para oferecer sempre o melhor atendimento.",
    authorId: "4",
    author: users[3],
    postId: "2",
    isOfficial: true,
    likes: 15,
    dislikes: 0,
    createdAt: new Date("2024-03-14T17:45:00"),
  },
  {
    id: "c5",
    content:
      "Aqui no Jabaquara também está faltando água. Problema generalizado!",
    authorId: "1",
    author: currentUser,
    postId: "3",
    isOfficial: false,
    likes: 12,
    dislikes: 0,
    createdAt: new Date("2024-03-13T09:30:00"),
  },
  {
    id: "c6",
    content:
      "Informamos que há um problema na adutora principal. Nossa equipe está trabalhando para restabelecer o abastecimento em até 24h. Acompanhe as atualizações em nosso site.",
    authorId: "3",
    author: users[2],
    postId: "3",
    isOfficial: true,
    likes: 8,
    dislikes: 3,
    createdAt: new Date("2024-03-13T14:20:00"),
  },
];

export const categories: {
  value: PostCategory;
  label: string;
  icon: string;
}[] = [
  { value: "saude", label: "Saúde", icon: "🏥" },
  { value: "infraestrutura", label: "Infraestrutura", icon: "🚧" },
  { value: "atendimento", label: "Atendimento", icon: "👥" },
  { value: "transporte", label: "Transporte", icon: "🚌" },
  { value: "educacao", label: "Educação", icon: "📚" },
  { value: "seguranca", label: "Segurança", icon: "🚔" },
  { value: "meio_ambiente", label: "Meio Ambiente", icon: "🌱" },
  { value: "outros", label: "Outros", icon: "📝" },
];

export const postTypes: { value: PostType; label: string; color: string }[] = [
  { value: "problema", label: "Problema", color: "text-red-600" },
  { value: "elogio", label: "Elogio", color: "text-green-600" },
  { value: "sugestao", label: "Sugestão", color: "text-blue-600" },
];

export const postStatuses: {
  value: PostStatus;
  label: string;
  color: string;
  bgColor: string;
}[] = [
  {
    value: "pending",
    label: "Pendente",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  {
    value: "in_progress",
    label: "Em Andamento",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    value: "resolved",
    label: "Resolvido",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
];
