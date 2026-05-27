const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/dashboard/patient/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add reports state inside PatientDashboard function
const stateTarget = `  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const liveDoctors = useRealtimeSimulatorStore((s) => s.liveDoctors);`;

const stateReplacement = `  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const liveDoctors = useRealtimeSimulatorStore((s) => s.liveDoctors);
  const reports = useRealtimeSimulatorStore((s) => s.reports);
  const patientReports = useMemo(() => reports.filter((r) => r.patientId === "P-948271"), [reports]);`;

if (!content.includes(stateTarget)) {
  console.error("State target not found!");
  process.exit(1);
}
content = content.replace(stateTarget, stateReplacement);

// 2. Replace permanentHistoryItems.map with patientReports.map
const mapTarget = `                <div className="grid gap-3 md:grid-cols-3">
                  {permanentHistoryItems.map((item) => (
                    <div key={item.title} className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{item.date}</div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-white/65">
                        <CheckCircle2 size={14} className="text-cyan-300" />
                        {item.proof}
                      </div>
                    </div>
                  ))}
                </div>`;

const mapReplacement = `                <div className="grid gap-3 md:grid-cols-3">
                  {patientReports.map((item) => (
                    <div key={item.id} className="rounded-[22px] border border-white/10 bg-black/25 p-4 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300">
                      <div className="text-sm font-semibold text-white truncate">{item.reportName}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">{item.uploadedAt}</div>
                      <div className="mt-3 flex items-center justify-between text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-cyan-300 animate-pulse" />
                          <span className="text-[11px] font-medium truncate max-w-[130px]">{item.proof}</span>
                        </span>
                        {item.findings && (
                          <button
                            type="button"
                            onClick={() => {
                              toast.info(item.reportName + " Summary", {
                                description: item.findings,
                                className: "border border-cyan-500/20 bg-black/90 text-cyan-300",
                              });
                            }}
                            className="text-cyan-400 font-bold hover:underline cursor-pointer text-[11px]"
                          >
                            View Summary
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>`;

if (!content.includes(mapTarget)) {
  console.error("Map target not found!");
  process.exit(1);
}
content = content.replace(mapTarget, mapReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated patient/page.tsx!");
