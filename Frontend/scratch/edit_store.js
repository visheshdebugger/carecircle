const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/realtime/realtimeSimulatorStore.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define type Def
const typeDef = `export type MedicalReport = {
  id: string;
  patientId: string;
  reportName: string;
  uploadedAt: string;
  proof: string;
  findings?: string;
};`;

if (!content.includes(typeDef)) {
  content = typeDef + "\n\n" + content;
}

// Interface Match
const interfaceRegex = /(export type RealtimeSimulatorState = {[\s\S]*?config:\s*SimulatorConfig;)(\s*};)/i;
if (!interfaceRegex.test(content)) {
  console.error("Interface regex not matched!");
  process.exit(1);
}

content = content.replace(interfaceRegex, `$1\n\n  // Medical Reports\n  reports: MedicalReport[];\n  addReport: (report: MedicalReport) => void;\n$2`);

// Store Implementation Match
const implRegex = /(export const useRealtimeSimulatorStore = create<RealtimeSimulatorState>\(\(set,\s*get\) => {[\s\S]*?start:\s*\(\)\s*=>\s*set\(\{\s*isRunning:\s*true\s*\}\),\s*stop:\s*\(\)\s*=>\s*set\(\{\s*isRunning:\s*false\s*\}\),)(\s*};[\s\S]*?}\);)/i;

if (!implRegex.test(content)) {
  console.error("Implementation regex not matched!");
  process.exit(1);
}

const implReplacement = `

    reports: [
      {
        id: "rep-1",
        patientId: "P-948271",
        reportName: "Discharge summary",
        uploadedAt: "Uploaded today",
        proof: "Medical certificate verified",
      },
      {
        id: "rep-2",
        patientId: "P-948271",
        reportName: "Lab report bundle",
        uploadedAt: "Uploaded May 18, 2026",
        proof: "Hospital stamped PDF attached",
      },
      {
        id: "rep-3",
        patientId: "P-948271",
        reportName: "Previous surgery notes",
        uploadedAt: "Uploaded May 02, 2026",
        proof: "Doctor-signed certificate attached",
      },
    ],
    addReport: (report) => set((s) => {
      const newToast = {
        id: "toast-" + Date.now(),
        title: "New Report Released",
        message: report.reportName + " has been compiled and secured under ledger.",
        tone: "emerald" as const,
      };
      const newFeed = {
        id: "feed-" + Date.now(),
        time: "Just now",
        title: "Report ledger synced",
        detail: report.reportName + " released for Patient ID " + report.patientId + ".",
        tone: "emerald" as const,
      };
      return {
        reports: [report, ...s.reports],
        toastQueue: [newToast, ...s.toastQueue],
        feedItems: [newFeed, ...s.feedItems],
      };
    }),`;

content = content.replace(implRegex, `$1${implReplacement}$2`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully compiled and updated realtimeSimulatorStore.ts!");
