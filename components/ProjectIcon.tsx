import React from "react";
import {
  Lightbulb,
  Code,
  Palette,
  Database,
  Shield,
  Zap,
  Settings,
  Users,
  Layout,
  Smartphone,
  Globe,
  Package,
  FileCode,
  GitBranch,
  TestTube,
  Rocket,
  Codepen,
  BookOpenCheck,
  FolderCode,
  FileCheck,
  type LucideIcon,
  LayoutPanelTop,
  CodeXml,
  BotMessageSquare,
  FilePenLine,
  BookUp2,
  MoonStar,
  MonitorPlay,
  Proportions,
  Hammer,
  MessageCircle,
  GitCompareArrows,
  Sparkles,
  BookOpen,
  RefreshCw,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  code: Code,
  palette: Palette,
  database: Database,
  shield: Shield,
  zap: Zap,
  settings: Settings,
  users: Users,
  layout: Layout,
  smartphone: Smartphone,
  globe: Globe,
  package: Package,
  fileCode: FileCode,
  gitBranch: GitBranch,
  testTube: TestTube,
  rocket: Rocket,
  codepen: Codepen,
  bookopencheck: BookOpenCheck,
  foldercode: FolderCode,
  filecheck: FileCheck,
  layoutpaneltop: LayoutPanelTop,
  codexml: CodeXml,
  botmessagesquare: BotMessageSquare,
  filepenline: FilePenLine,
  bookup2: BookUp2,
  moonstar: MoonStar,
  monitorplay: MonitorPlay,
  proportions: Proportions,
  hammer: Hammer,
  messagecircle: MessageCircle,
  gitcomparearrows: GitCompareArrows,
  sparkles: Sparkles,
  bookopen: BookOpen,
  refreshcw: RefreshCw,
};

interface ProjectIconProps {
  iconName: string;
  className?: string;
}

export const ProjectIcon: React.FC<ProjectIconProps> = ({
  iconName,
  className = "w-7 h-7 md:w-8 md:h-8",
}) => {
  const Icon = iconMap[iconName] || Lightbulb;
  return <Icon className={className} />;
};

export const availableIcons = Object.keys(iconMap);
