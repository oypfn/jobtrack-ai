import { describe, expect, it } from "vitest";
import { filterApplications, parseApplications, stageCounts, type Application } from "./model";

const rows: Application[] = [
  { id: "1", company: "Acme", role: "Frontend Developer", location: "Bilbao", stage: "Interview", appliedAt: "2026-01-01", url: "", notes: "" },
  { id: "2", company: "Northstar", role: "Backend Engineer", location: "Remote", stage: "Applied", appliedAt: "2026-01-02", url: "", notes: "" },
];

describe("application model", () => {
  it("searches case-insensitively", () => expect(filterApplications(rows, "BILBAO", "All")).toHaveLength(1));
  it("filters by stage", () => expect(filterApplications(rows, "", "Applied")[0].company).toBe("Northstar"));
  it("counts stages", () => expect(stageCounts(rows).Interview).toBe(1));
  it("rejects malformed persisted values", () => expect(parseApplications({ company: "bad" })).toEqual([]));
  it("keeps valid records and filters invalid records", () => expect(parseApplications([...rows, { id: 3 }])).toEqual(rows));
});
