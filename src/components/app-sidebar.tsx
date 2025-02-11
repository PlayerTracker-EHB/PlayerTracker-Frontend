import {
  Upload,
  Users,
  BarChart,
  Settings,
  LogOut,
  LogIn,
  Home,
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

import { useAuthStore } from "@/auth/authStore";
import { Link, useNavigate } from "@tanstack/react-router";

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate()

  // Menu items
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Uploader", url: "/Uploader", icon: Upload },
    { title: "Team", url: "/Team", icon: Users },
    { title: "Statistics", url: "/Statistics", icon: BarChart },
    { title: "Accounts", url: "/admin/Accounts", icon: Users },
    { title: "Admin", url: "/admin/myAdmin", icon: Settings },
  ];

  // Remove Login button if the user is logged in
  if (!user) {
    items.push({ title: "Login", url: "/Login", icon: LogIn });
  }

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    navigate({ to: '/' })
  };

  return (
    <Sidebar className="fixed top-0 left-0 h-full">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-lg text-black">PlayerTracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Show Logout only when user is logged in */}
              {user && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500"
                  >
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
