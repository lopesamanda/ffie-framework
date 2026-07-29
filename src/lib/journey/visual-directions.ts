import type { ArtifactTypeId } from "@/lib/journey/character-options";

export const VISUAL_DIRECTION_IMAGES: {
  id: string;
  label: string;
  path: string;
  artifactType?: ArtifactTypeId;
}[] = [
  {
    id: "object",
    label: "Object",
    path: "/images/visual-directions/visual-object.png",
    artifactType: "object",
  },
  {
    id: "app",
    label: "App/Platform",
    path: "/images/visual-directions/visual-app-platform.png",
    artifactType: "app",
  },
  {
    id: "agent",
    label: "Agent",
    path: "/images/visual-directions/visual-agent.png",
    artifactType: "agent",
  },
  {
    id: "service",
    label: "Service",
    path: "/images/visual-directions/visual-service.png",
    artifactType: "service",
  },
  {
    id: "policy",
    label: "Policy",
    path: "/images/visual-directions/visual-policy.png",
    artifactType: "policy",
  },
  {
    id: "narrative",
    label: "Narrative",
    path: "/images/visual-directions/visual-narrative.png",
    artifactType: "narrative",
  },
  {
    id: "other",
    label: "Other",
    path: "/images/visual-directions/visual-other.png",
  },
];

export function defaultVisualDirectionForType(
  artifactType: ArtifactTypeId | "",
): string {
  const match = VISUAL_DIRECTION_IMAGES.find(
    (entry) => entry.artifactType === artifactType,
  );
  return match?.path ?? VISUAL_DIRECTION_IMAGES[0]!.path;
}
