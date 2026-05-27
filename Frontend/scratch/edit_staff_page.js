const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/dashboard/staff/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update imports
const importTarget = `import {
  Activity,
  ArrowLeft,
  BellRing,
  CheckCircle2,
  ClipboardList,
  DoorOpen,
  HeartPulse,
  MessageSquareWarning,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";`;

const importReplacement = `import {
  Activity,
  ArrowLeft,
  BellRing,
  CheckCircle2,
  ClipboardList,
  DoorOpen,
  HeartPulse,
  MessageSquareWarning,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Users,
  Zap,
  UploadCloud,
  Cpu,
  FileText,
  Stethoscope,
} from "lucide-react";`;

if (!content.includes(importTarget)) {
  console.error("Import target not found!");
  process.exit(1);
}
content = content.replace(importTarget, importReplacement);

// 2. Insert state & logic inside StaffDashboardPage component
const logicTarget = `export default function StaffDashboardPage() {
  const liveQueue = useRealtimeSimulatorStore((s) => s.liveQueue);`;

const logicReplacement = `export default function StaffDashboardPage() {
  const liveQueue = useRealtimeSimulatorStore((s) => s.liveQueue);
  const addReport = useRealtimeSimulatorStore((s) => s.addReport);

  // Broadcast States
  const [patientId, setPatientId] = useState("P-948271");
  const [reportName, setReportName] = useState("Comprehensive Metabolic Panel");
  const [findings, setFindings] = useState("All vital lipid anchors reside in optimal threshold ranges. hs-CRP stable at 0.8 mg/L.");
  const [proof, setProof] = useState("Clinical Ledger Stamped PDF");
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const mockLogs = [
    "[INFO] Initializing Cryptographic Upload Protocol...",
    "[ENCRYPTION] Encrypting patient report with AES-GCM-256...",
    "[LEDGER] Registering transaction block in hospital ledger...",
    "[SYNC] Synchronizing medical history vaults... SUCCESS.",
    "[BROADCAST] Released to Patient Portal online."
  ];

  function handleBroadcastReport(e: React.FormEvent) {
    e.preventDefault();
    if (!patientId || !reportName) {
      toast.error("Required fields missing", {
        description: "Please specify Patient ID and Report Name.",
      });
      return;
    }

    setBroadcasting(true);
    setBroadcastProgress(0);
    setBroadcastLogs([]);

    mockLogs.forEach((log, index) => {
      setTimeout(() => {
        setBroadcastLogs((prev) => [...prev, log]);
        setBroadcastProgress(((index + 1) / mockLogs.length) * 100);

        if (index === mockLogs.length - 1) {
          setBroadcasting(false);
          addReport({
            id: "rep-" + Date.now(),
            patientId,
            reportName,
            uploadedAt: "Uploaded just now",
            proof,
            findings,
          });
          toast.success("Medical Report Broadcasted!", {
            description: \`\${reportName} successfully synchronized and released online.\`,
          });
        }
      }, (index + 1) * 300);
    });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      toast.info("Report file attached", {
        description: file.name + " ready for cryptographic ledger binding.",
      });
    }
  }`;

if (!content.includes(logicTarget)) {
  console.error("Logic target not found!");
  process.exit(1);
}
content = content.replace(logicTarget, logicReplacement);

// 3. Insert the Broadcast Console SectionCard inside main grid
const gridTarget = `          <MotionStaggerItem>
            <main className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
              <MotionCard className="rounded-[28px] border border-cyan-400/15 bg-cyan-400/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-7 lg:p-6">`;

const gridReplacement = `          <MotionStaggerItem>
            <main className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
              
              {/* Clinical Report Broadcast Console */}
              <MotionCard className="rounded-[28px] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 to-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-12 lg:p-6 overflow-hidden">
                <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-2.5 shadow-[0_0_24px_rgba(34,211,238,0.1)]">
                      <UploadCloud className="h-5 w-5 text-cyan-300 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">Clinical Report Broadcast Console</h3>
                      <p className="text-xs text-white/50 mt-0.5">Encrypt and upload medical reports instantly. Verifies dynamically in patient portal.</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                    <Cpu size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
                    HIPAA Secure Sync
                  </div>
                </div>

                <form onSubmit={handleBroadcastReport} className="grid gap-6 lg:grid-cols-12">
                  {/* Left Column: Form Fields */}
                  <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">Target Patient ID</label>
                      <input
                        type="text"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder="e.g. P-948271"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">Report Name</label>
                      <input
                        type="text"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="e.g. Lipids Summary Panel"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">Cryptographic Proof Stamp</label>
                      <input
                        type="text"
                        value={proof}
                        onChange={(e) => setProof(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">Clinical Findings & Vitals Summary</label>
                      <textarea
                        rows={3}
                        value={findings}
                        onChange={(e) => setFindings(e.target.value)}
                        placeholder="Enter direct patient guidance, glucose indicators, or recovery diagnostics..."
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Right Column: High-Tech Dropzone & Logs */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                    {/* Mock Dropzone */}
                    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/25 bg-cyan-950/5 p-5 transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-950/10 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]">
                      <input
                        type="file"
                        accept=".pdf,.json,.xml"
                        onChange={handleFileSelect}
                        className="absolute inset-0 cursor-pointer opacity-0"
                        disabled={broadcasting}
                      />
                      <FileText size={28} className="text-cyan-300 animate-pulse" />
                      <div className="mt-2.5 text-xs font-bold text-white">
                        {selectedFile ? selectedFile : "Drag & Drop Medical Report (PDF)"}
                      </div>
                      <p className="mt-1 text-[9px] text-white/45 uppercase tracking-wider">
                        {selectedFile ? "File Attached Successfully" : "Supports up to 25MB clinical attachments"}
                      </p>

                      {broadcasting && (
                        <div className="absolute inset-0 bg-slate-950/80 flex flex-col justify-center px-4 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                            <span>Ledger Broadcast Progress</span>
                            <span>{Math.round(broadcastProgress)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-300"
                              style={{ width: broadcastProgress + "%" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Compiler Logs Panel */}
                    {broadcastLogs.length > 0 && (
                      <div className="rounded-xl border border-white/5 bg-black/60 p-3 font-mono text-[9px] text-cyan-300/80 leading-5 max-h-[110px] overflow-y-auto">
                        <div className="flex items-center gap-1 text-white/40 mb-1 border-b border-white/5 pb-1 font-bold">
                          <Cpu size={10} />
                          LEDGER SYNC ENGINE LOGS
                        </div>
                        {broadcastLogs.map((log, i) => (
                          <div key={i} className={log.includes("SUCCESS") ? "text-emerald-400 font-bold" : ""}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={broadcasting}
                      className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-3 text-center text-xs font-black uppercase tracking-wider text-cyan-300 hover:bg-cyan-400/15 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                    >
                      {broadcasting ? "Verifying Block..." : "Ledger Broadcast & Sync Online"}
                    </button>
                  </div>
                </form>
              </MotionCard>

              <MotionCard className="rounded-[28px] border border-cyan-400/15 bg-cyan-400/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-7 lg:p-6">`;

if (!content.includes(gridTarget)) {
  console.error("Grid target not found!");
  process.exit(1);
}
content = content.replace(gridTarget, gridReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated staff/page.tsx!");
