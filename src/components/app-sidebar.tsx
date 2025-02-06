import {
  Home,
  Upload,
  Users,
  BarChart,
  Settings,
  LogIn,
  Info, // Icône pour About
  CreditCard, // Icône pour Subscriptions
  Mail, // Icône pour Contact
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

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Subscriptions",
    url: "/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Contact",
    url: "/register",
    icon: Mail,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Uploader",
    url: "/uploader",
    icon: Upload,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: BarChart,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: Users,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
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
