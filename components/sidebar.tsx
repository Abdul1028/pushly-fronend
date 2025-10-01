"use client";

import { Button } from "@/components/ui/button";
import { 
  Home, 
  FolderOpen, 
  Globe, 
  Settings, 
  HelpCircle,
  Zap,
  Activity,
  Users
} from "lucide-react";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Sidebar({ activeTab = "dashboard", onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "deployments", label: "Deployments", icon: Zap },
    { id: "domains", label: "Domains", icon: Globe },
    { id: "analytics", label: "Analytics", icon: Activity },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? "bg-gray-800 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => onTabChange?.(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
            <HelpCircle className="h-4 w-4 mr-3" />
            Help & Support
          </Button>
        </div>
      </div>
    </aside>
  );
}
