import {
  Calendar,
  Home, // Icône représentant l'accueil
  Upload,
  Users,
  BarChart,
  Settings,
  LogIn,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/", // Redirige vers la route "/"
    icon: Home, // Correctement importé depuis "lucide-react"
  },
  {
    title: "Uploader",
    url: "/uploader",
    icon: Upload, // Icône appropriée pour uploader
  },
  {
    title: "Team",
    url: "/team",
    icon: Users, // Icône représentant un groupe de personnes
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: BarChart, // Icône pour des statistiques ou graphiques
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: Users, // Icône représentant les comptes
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn, // Icône pour se connecter
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings, // Icône appropriée
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="fixed top-0 left-0 h-full">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>PlayerTracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
