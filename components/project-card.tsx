"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  MoreHorizontal, 
  Clock, 
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  url: string;
  status: "ready" | "building" | "error";
  lastDeployment?: string;
  framework?: string;
}

interface ProjectCardProps {
  project: Project;
  onDeploy?: (projectId: string) => void;
  onView?: (projectId: string) => void;
}

export function ProjectCard({ project, onDeploy, onView }: ProjectCardProps) {
  const getStatusIcon = () => {
    switch (project.status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "building":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (project.status) {
      case "ready":
        return <Badge variant="success">Ready</Badge>;
      case "building":
        return <Badge variant="warning">Building</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {getStatusBadge()}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>URL:</span>
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span className="truncate max-w-[150px]">{project.url}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          
          {project.framework && (
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Framework:</span>
              <Badge variant="outline" className="text-xs">
                {project.framework}
              </Badge>
            </div>
          )}
          
          {project.lastDeployment && (
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Last Deploy:</span>
              <span>{project.lastDeployment}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(project.id)}
          >
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDeploy?.(project.id)}
            disabled={project.status === "building"}
          >
            {project.status === "building" ? "Building..." : "Redeploy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
