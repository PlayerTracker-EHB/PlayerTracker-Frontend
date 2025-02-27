import {
  Upload,
  Users,
  BarChart,
  Settings,
  LogOut,
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
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function AppSidebar() {
  const authStore = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      await authStore.fetchUser()
    }
    fetchUser()
  }, [])

  const user = authStore.user
  const navigate = useNavigate();

  // Menu items for all users
  const items = [
    { title: "Statistics", url: "/Statistics", icon: BarChart },
  ];

  // Menu items for admin users
  const adminItems = [
    { title: "Team", url: "/admin/Team", icon: Users },
    { title: "Uploader", url: "/admin/Uploader", icon: Upload },
    { title: "Accounts", url: "/admin/Accounts", icon: Users },
    { title: "Admin", url: "/admin/myAdmin", icon: Settings },
  ];

  // Handle Logout
  const handleLogout = async () => {
    await authStore.logout();
    navigate({ to: '/' });
  };

  return (
    <Sidebar className="fixed top-0 left-0 h-full">
      <SidebarContent className="flex flex-col h-full">
        {/*SiderBar Title*/}
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-xl text-black">  {user && user.team ? user.team.clubName : "PlayerTracker"}</SidebarGroupLabel>
        </SidebarGroup>
        {user?.isAdmin && (
          // Admin Sidebar Group
          <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-md text-black">Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* General Sidebar Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-md text-black">General</SidebarGroupLabel>
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

              {/* Logout SidebarMenuButton*/}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar >
  );
}

