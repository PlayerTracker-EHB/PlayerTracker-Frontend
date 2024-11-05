import { Calendar, Home, Upload, Users, BarChart, Settings, LogIn } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// Menu items.

const items = [
  {
    title: "Uploader",
    url: "#",
    icon: Upload, // Icône appropriée pour uploader
  },
  {
    title: "Team",
    url: "#",
    icon: Users, // Icône représentant un groupe de personnes
  },
  {
    title: "Statistics",
    url: "#",
    icon: BarChart, // Icône pour des statistiques ou graphiques
  },
  {
    title: "Accounts",
    url: "#",
    icon: Home, // Icône représentant l'accueil pour les comptes, ou autre icône si souhaitée
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings, // Icône pour les paramètres
  },
  {
    title: "Login",
    url: "#",
    icon: LogIn, // Icône pour se connecter
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
                      <item.icon />
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