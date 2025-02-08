import {
  Home,
  Upload,
  Users,
  BarChart,
  Settings,
  LogOut,
  LogIn,
  Info, // About icon
  CreditCard, // Subscriptions icon
  Mail, // Contact icon
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

import { useAuthStore } from "@/store/authStore";

export function AppSidebar() {
  const { user, logout } = useAuthStore();

  // Menu items
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "About", url: "/about", icon: Info },
    { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
    { title: "Contact", url: "/register", icon: Mail },
    { title: "Uploader", url: "/uploader", icon: Upload },
    { title: "Team", url: "/team", icon: Users },
    { title: "Statistics", url: "/statistics", icon: BarChart },
    { title: "Accounts", url: "/accounts", icon: Users },
    { title: "Admin", url: "/admin", icon: Settings },
  ];

  // Remove Login button if the user is logged in
  if (!user) {
    items.push({ title: "Login", url: "/login", icon: LogIn });
  }

  // Handle Logout
  const handleLogout = async () => {
    await logout();
  };

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

              {/* Show Logout only when user is logged in */}
              {user && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="flex items-center space-x-2 text-red-500">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

