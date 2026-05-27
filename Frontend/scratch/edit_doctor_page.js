const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/dashboard/doctor/page.tsx');
if (!fs.existsSync(filePath)) {
  console.error("Error: Could not find page.tsx at " + filePath);
  process.exit(1);
}

// Read and normalize all line endings to LF for perfectly reliable replacements
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Replace the imports block
const oldImports = `import React, { useMemo, useRef } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  CalendarClock,
  Clock3,
  FileText,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import { MotionCard, MotionPage, MotionPulseDot, MotionStagger, MotionStaggerItem } from "@/components/motion/carecircle-motion";
import { useRealtimeSimulatorStore } from "@/lib/realtime/realtimeSimulatorStore";`;

const newImports = `import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  CalendarClock,
  Clock3,
  FileText,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
  Waves,
  Zap,
  Search,
  Fingerprint,
  Unlock,
  Lock,
  Shield,
  Database,
} from "lucide-react";
import { MotionCard, MotionPage, MotionPulseDot, MotionStagger, MotionStaggerItem } from "@/components/motion/carecircle-motion";
import { useRealtimeSimulatorStore } from "@/lib/realtime/realtimeSimulatorStore";`;

if (content.includes(oldImports)) {
  content = content.replace(oldImports, newImports);
  console.log("Successfully updated imports.");
} else {
  console.error("Error: Could not find exact imports block!");
  process.exit(1);
}

// 2. Insert store subscribe and search states
const oldStateBlock = `  const liveQueue = useRealtimeSimulatorStore((s) => s.liveQueue);
  const liveDoctors = useRealtimeSimulatorStore((s) => s.liveDoctors);
  const liveEmergencies = useRealtimeSimulatorStore((s) => s.liveEmergencies);
  const feedItems = useRealtimeSimulatorStore((s) => s.feedItems);
  const toastQueue = useRealtimeSimulatorStore((s) => s.toastQueue);`;

const newStateBlock = `  const liveQueue = useRealtimeSimulatorStore((s) => s.liveQueue);
  const liveDoctors = useRealtimeSimulatorStore((s) => s.liveDoctors);
  const liveEmergencies = useRealtimeSimulatorStore((s) => s.liveEmergencies);
  const feedItems = useRealtimeSimulatorStore((s) => s.feedItems);
  const toastQueue = useRealtimeSimulatorStore((s) => s.toastQueue);
  const reports = useRealtimeSimulatorStore((s) => s.reports);

  // Patient clinical ledger states
  const [searchId, setSearchId] = useState("P-948271");
  const [searchedId, setSearchedId] = useState("P-948271");
  const [isScanning, setIsScanning] = useState(false);
  const [decryptedReports, setDecryptedReports] = useState([]);

  function handleSearchLedger(e) {
    e.preventDefault();
    if (!searchId) return;
    setIsScanning(true);
    setTimeout(() => {
      setSearchedId(searchId);
      setIsScanning(false);
    }, 700);
  }

  function toggleDecryptReport(reportId) {
    setDecryptedReports((prev) =>
      prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]
    );
  }

  const matchingReports = useMemo(() => {
    if (!searchedId) return [];
    return reports.filter(
      (r) => r.patientId.trim().toUpperCase() === searchedId.trim().toUpperCase()
    );
  }, [reports, searchedId]);`;

if (content.includes(oldStateBlock)) {
  content = content.replace(oldStateBlock, newStateBlock);
  console.log("Successfully inserted clinical search states.");
} else {
  console.error("Error: Could not find exact states block!");
  process.exit(1);
}

// 3. Replace the medical history card
const oldCardBlock = `              <MotionCard className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-7 lg:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <FileText size={18} className="text-cyan-300" />
                    Patient medical history viewer
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                    Secure
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-semibold text-white">Active consult</div>
                    <div className="mt-1 text-sm text-white/55">
                      {activeDoctor?.name ?? "Dr. Sarah Chen"} · {activeDoctor?.specialty ?? "Cardiology"}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      <MotionPulseDot className="bg-emerald-300" />
                      {activeDoctor?.activeConsult ? \`Consulting \${activeDoctor.activeConsult.patient}\` : "Ready for consult"}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-semibold text-white">Delayed schedule</div>
                    <div className="mt-1 text-sm text-white/55">
                      {delayedDoctor ? \`\${delayedDoctor.name} is delayed due to active triage load.\` : "No delayed consultations detected."}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { title: "ECG review", detail: "Stable rhythm, recheck in 24h" },
                      { title: "MRI follow-up", detail: "Lab upload pending signature" },
                      { title: "Referral note", detail: "Auto-synced with queue events" },
                    ].map((entry) => (
                      <div key={entry.title} className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                        <div className="text-sm font-semibold text-white">{entry.title}</div>
                        <div className="mt-2 text-sm leading-6 text-white/60">{entry.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionCard>`;

const newCardBlock = `              <MotionCard className="rounded-[28px] border border-cyan-400/15 bg-cyan-400/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:col-span-7 lg:p-6 overflow-hidden">
                <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-2.5 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                      <Database className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Secure Clinical Ledger Search</h3>
                      <p className="text-xs text-white/55 mt-0.5">Decrypt and review patient-specific history blocks.</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    <Fingerprint size={12} className="animate-pulse" />
                    HIPAA Secure Decryptor
                  </div>
                </div>

                {/* Ledger Search Form */}
                <form onSubmit={handleSearchLedger} className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                    <input
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="Enter Patient ID (e.g. P-948271)"
                      className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isScanning}
                    className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-cyan-300 hover:bg-cyan-400/15 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.1)] cursor-pointer"
                  >
                    {isScanning ? (
                      <>
                        <Shield className="h-3.5 w-3.5 animate-spin" />
                        Scanning Ledger...
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-3.5 w-3.5" />
                        Scan Patient Ledger
                      </>
                    )}
                  </button>
                </form>

                {/* Secure Decrypting/Scanning HUD */}
                {isScanning && (
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-950/10 p-6 flex flex-col items-center justify-center text-center space-y-3 mb-6 animate-pulse">
                    <Fingerprint className="h-10 w-10 text-cyan-400 animate-bounce" />
                    <div className="text-sm font-bold text-white uppercase tracking-widest">Biometric Decryption Protocol Active</div>
                    <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 w-full animate-[shimmer_1.5s_infinite]" style={{
                        backgroundImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                        backgroundSize: '200% 100%'
                      }} />
                    </div>
                    <p className="text-[10px] text-cyan-300/60 font-mono tracking-widest">[ESTABLISHING SECURE END-TO-END LEDGER CHANNEL]</p>
                  </div>
                )}

                {/* Searched Results View */}
                {!isScanning && searchedId && (
                  <div className="space-y-4">
                    {/* Patient Demographic Card */}
                    <div className="rounded-[22px] border border-white/10 bg-black/25 p-4 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {searchedId === "P-948271" ? "Alex Morgan" : \`Verified Patient (\${searchedId})\`}
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                            <ShieldCheck size={10} />
                            Biometric Checked
                          </span>
                        </div>
                        <p className="text-xs text-white/50">Patient ID: {searchedId} · Age: 29</p>
                      </div>

                      {/* Vitals HUD */}
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-center">
                          <div className="text-[9px] uppercase tracking-wider text-cyan-300/60">BP</div>
                          <div className="text-xs font-bold text-white">118/76</div>
                        </div>
                        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-center">
                          <div className="text-[9px] uppercase tracking-wider text-cyan-300/60">Pulse</div>
                          <div className="text-xs font-bold text-white">72 bpm</div>
                        </div>
                        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-center">
                          <div className="text-[9px] uppercase tracking-wider text-cyan-300/60">SpO2</div>
                          <div className="text-xs font-bold text-white">99%</div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Reports Ledger Stream */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">
                        Decrypted Clinical History Blocks ({matchingReports.length})
                      </div>

                      {matchingReports.length > 0 ? (
                        matchingReports.map((report) => {
                          const isDecrypted = decryptedReports.includes(report.id);
                          return (
                            <div
                              key={report.id}
                              className="rounded-[22px] border border-white/5 bg-black/30 p-4 transition hover:border-white/10 duration-200"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5 text-cyan-300" />
                                    {report.reportName}
                                    {report.uploadedAt.includes("now") && (
                                      <span className="rounded bg-emerald-400/15 border border-emerald-400/25 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300 uppercase tracking-widest animate-pulse">
                                        Recent
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 text-xs text-white/55">{report.uploadedAt}</div>
                                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-cyan-300/60 font-mono">
                                    <Lock size={10} />
                                    <span>Proof: {report.proof}</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => toggleDecryptReport(report.id)}
                                  className={\`rounded-full border px-4 py-1.5 text-[11px] font-semibold transition flex items-center gap-1.5 cursor-pointer \${
                                    isDecrypted
                                      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                                      : "border-white/10 bg-white/5 text-white/80 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white"
                                  }\`}
                                >
                                  {isDecrypted ? (
                                    <>
                                      <Unlock size={11} />
                                      Hide Findings
                                    </>
                                  ) : (
                                    <>
                                      <Lock size={11} />
                                      Decrypt Findings
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Decrypted Findings Console */}
                              {isDecrypted && (
                                <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-950/5 p-3.5 font-mono text-xs text-emerald-300/90 leading-relaxed shadow-[inset_0_0_12px_rgba(16,185,129,0.04)] animate-fadeIn">
                                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-400/60 font-bold mb-1.5 border-b border-emerald-400/10 pb-1">
                                    <Database size={10} />
                                    SECURE DIAGNOSTIC PAYLOAD DECRYPTED
                                  </div>
                                  {report.findings ? report.findings : "Ledger synchronization block active. No further findings summarized."}
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="rounded-2xl border border-white/5 bg-black/20 p-6 flex flex-col items-center justify-center text-center">
                          <Database className="h-8 w-8 text-white/20 mb-2" />
                          <p className="text-sm font-semibold text-white/70">No distributed ledger blocks found</p>
                          <p className="text-xs text-white/45 mt-1 max-w-sm">
                            No medical reports are registered for Patient ID "{searchedId}". Add new reports via the Staff Operations Dashboard to test live synchronization.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </MotionCard>`;

if (content.includes(oldCardBlock)) {
  content = content.replace(oldCardBlock, newCardBlock);
  console.log("Successfully replaced patient medical history card.");
} else {
  console.error("Error: Could not find medical history card block!");
  process.exit(1);
}

// Write the modified file with LF newlines
fs.writeFileSync(filePath, content, 'utf8');
console.log("SUCCESS: Complete modifications successfully applied to page.tsx!");
