"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  ExternalLink, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Copy,
  Download
} from "lucide-react";
import { Fira_Code } from "next/font/google";
import axios from "axios";
import { io } from "socket.io-client";

const firaCode = Fira_Code({ subsets: ["latin"] });

interface DeploymentInterfaceProps {
  onDeploymentComplete?: (url: string, projectId: string) => void;
}

export function DeploymentInterface({ onDeploymentComplete }: DeploymentInterfaceProps) {
  const [repoURL, setRepoURL] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<string | undefined>();
  const [deployPreviewURL, setDeployPreviewURL] = useState<string | undefined>();
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "building" | "success" | "error">("idle");
  
  const logContainerRef = useRef<HTMLElement>(null);
  const socket = useRef(io("http://localhost:9002"));

  const isValidURL: [boolean, string | null] = useMemo(() => {
    if (!repoURL || repoURL.trim() === "") return [false, null];
    const regex = new RegExp(
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\/)?$/
    );
    return [regex.test(repoURL), "Enter valid Github Repository URL"];
  }, [repoURL]);

  const handleClickDeploy = useCallback(async () => {
    setLoading(true);
    setDeploymentStatus("building");
    setLogs([]);

    try {
      const { data } = await axios.post(`http://localhost:9000/project`, {
        gitURL: repoURL,
        slug: projectId,
      });

      if (data && data.data) {
        const { projectSlug, url } = data.data;
        setProjectId(projectSlug);
        setDeployPreviewURL(url);

        console.log(`Subscribing to logs:${projectSlug}`);
        socket.current.emit("subscribe", `logs:${projectSlug}`);
        
        onDeploymentComplete?.(url, projectSlug);
      }
    } catch (error) {
      console.error("Deployment failed:", error);
      setDeploymentStatus("error");
      setLogs(prev => [...prev, "❌ Deployment failed. Please check your repository URL and try again."]);
    } finally {
      setLoading(false);
    }
  }, [projectId, repoURL, onDeploymentComplete]);

  const handleSocketIncomingMessage = useCallback((message: string) => {
    console.log(`[Incoming Socket Message]:`, typeof message, message);
    try {
      const { log } = JSON.parse(message);
      setLogs((prev) => [...prev, log]);
      
      // Check if deployment is complete
      if (log.includes("✅") || log.includes("Deployment completed")) {
        setDeploymentStatus("success");
      } else if (log.includes("❌") || log.includes("Error") || log.includes("Failed")) {
        setDeploymentStatus("error");
      }
      
      logContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error parsing socket message:", error);
    }
  }, []);

  useEffect(() => {
    const currentSocket = socket.current;
    currentSocket.on("message", handleSocketIncomingMessage);

    return () => {
      currentSocket.off("message", handleSocketIncomingMessage);
    };
  }, [handleSocketIncomingMessage]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = () => {
    switch (deploymentStatus) {
      case "building":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Github className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (deploymentStatus) {
      case "building":
        return <Badge variant="warning">Building</Badge>;
      case "success":
        return <Badge variant="success">Deployed</Badge>;
      case "error":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Ready to Deploy</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>Deploy New Project</span>
            {getStatusBadge()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              GitHub Repository URL
            </label>
            <div className="flex space-x-2">
              <Github className="h-5 w-5 text-gray-400 mt-2" />
              <Input
                disabled={loading}
                value={repoURL}
                onChange={(e) => setRepoURL(e.target.value)}
                type="url"
                placeholder="https://github.com/username/repository"
                className="flex-1"
              />
            </div>
            {!isValidURL[0] && repoURL && (
              <p className="text-sm text-red-400">{isValidURL[1]}</p>
            )}
          </div>
          
          <Button
            onClick={handleClickDeploy}
            disabled={!isValidURL[0] || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              "Deploy Project"
            )}
          </Button>
        </CardContent>
      </Card>

      {deployPreviewURL && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ExternalLink className="h-5 w-5" />
              <span>Deployment URL</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
              <code className="flex-1 text-blue-400 font-mono text-sm">
                {deployPreviewURL}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(deployPreviewURL)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(deployPreviewURL, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {logs.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Deployment Logs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`${firaCode.className} text-sm text-green-500 logs-container border border-gray-700 rounded-lg p-4 h-[300px] overflow-y-auto bg-black`}
            >
              <pre className="flex flex-col gap-1">
                {logs.map((log, i) => (
                  <code
                    ref={logs.length - 1 === i ? logContainerRef : undefined}
                    key={i}
                    className="text-green-400"
                  >{`> ${log}`}</code>
                ))}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
