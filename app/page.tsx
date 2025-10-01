"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DeploymentInterface } from "@/components/deployment-interface";
import { ProjectCard } from "@/components/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Activity,
  Globe,
  Zap
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  url: string;
  status: "ready" | "building" | "error";
  lastDeployment?: string;
  framework?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "my-awesome-app",
        url: "https://my-awesome-app.vercel.app",
        status: "ready",
        lastDeployment: "2 minutes ago",
        framework: "Next.js"
      },
      {
        id: "2", 
        name: "portfolio-site",
        url: "https://portfolio-site.vercel.app",
        status: "building",
        lastDeployment: "5 minutes ago",
        framework: "React"
      },
      {
        id: "3",
        name: "ecommerce-store",
        url: "https://ecommerce-store.vercel.app", 
        status: "ready",
        lastDeployment: "1 hour ago",
        framework: "Vue.js"
      }
    ];
    setProjects(mockProjects);
  }, []);

  const handleDeploymentComplete = (url: string, projectId: string) => {
    // Add new project to the list
    const newProject: Project = {
      id: projectId,
      name: projectId,
      url: url,
      status: "ready",
      lastDeployment: "Just now",
      framework: "Unknown"
    };
    setProjects(prev => [newProject, ...prev]);
    setShowNewProject(false);
  };

  const handleRedeploy = (projectId: string) => {
    // Update project status to building
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, status: "building" as const }
          : project
      )
    );
    
    // Simulate deployment completion after 3 seconds
    setTimeout(() => {
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId 
            ? { ...project, status: "ready" as const, lastDeployment: "Just now" }
            : project
        )
      );
    }, 3000);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with your projects.</p>
        </div>
        <Button 
          onClick={() => setShowNewProject(true)}
          className="bg-white text-black hover:bg-gray-100"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-gray-400">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === "ready").length}
                </p>
                <p className="text-sm text-gray-400">Live</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === "building").length}
                </p>
                <p className="text-sm text-gray-400">Building</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-gray-400">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deployments */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent Deployments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    project.status === "ready" ? "bg-green-500" :
                    project.status === "building" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-400">{project.lastDeployment}</p>
                  </div>
                </div>
                <Badge variant={project.status === "ready" ? "success" : "warning"}>
                  {project.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDeploy={handleRedeploy}
              onView={(id) => console.log("View project:", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (showNewProject) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowNewProject(false)}
              className="p-2"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">Deploy New Project</h1>
          </div>
          <DeploymentInterface onDeploymentComplete={handleDeploymentComplete} />
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "projects":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Projects</h1>
              <Button onClick={() => setShowNewProject(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDeploy={handleRedeploy}
                  onView={(id) => console.log("View project:", id)}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
