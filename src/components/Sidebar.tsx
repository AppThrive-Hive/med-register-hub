import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Settings,
  UserPlus,
  LogOut,
  Menu,
  Heart
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: true
    },
    {
      title: "Patients",
      icon: Users, 
      href: "/patients"
    },
    {
      title: "Patient Registration",
      icon: UserPlus,
      href: "/register"
    },
    {
      title: "Appointments", 
      icon: Calendar,
      href: "/appointments"
    },
    {
      title: "Medical Records",
      icon: FileText,
      href: "/records"
    },
    {
      title: "Reports",
      icon: Activity,
      href: "/reports"
    }
  ];

  return (
    <div className={cn(
      "bg-white border-r border-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-foreground">Maranatha</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {!isCollapsed && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 pb-2">
              Menu
            </p>
          )}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isCollapsed && "justify-center"
                  )
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center"
              )
            }
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </NavLink>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © 2025 Maranatha Medical Services
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;