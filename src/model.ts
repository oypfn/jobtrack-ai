export type Stage = "Applied" | "Screening" | "Interview" | "Offer" | "Rejected";
export type Application = {
  id: string;
  company: string;
  role: string;
  location: string;
  stage: Stage;
  appliedAt: string;
  url: string;
  notes: string;
};

export const stages: Stage[] = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

export function isApplication(value: unknown): value is Application {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.company === "string" &&
    typeof item.role === "string" &&
    typeof item.location === "string" &&
    stages.includes(item.stage as Stage) &&
    typeof item.appliedAt === "string" &&
    typeof item.url === "string" &&
    typeof item.notes === "string"
  );
}

export function parseApplications(value: unknown): Application[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isApplication);
}

export function filterApplications(items: Application[], query: string, stage: Stage | "All") {
  const q = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (stage === "All" || item.stage === stage) &&
      [item.company, item.role, item.location].some((field) => field.toLowerCase().includes(q)),
  );
}

export function stageCounts(items: Application[]) {
  return stages.reduce(
    (counts, stage) => ({ ...counts, [stage]: items.filter((item) => item.stage === stage).length }),
    {} as Record<Stage, number>,
  );
}
