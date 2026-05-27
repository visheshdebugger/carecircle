const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/dashboard/admin/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /<MotionStaggerItem>\s*<main\s+className="mt-6\s+grid\s+grid-cols-1\s+gap-5\s+lg:grid-cols-12">\s*<SectionCard/i;

const replacementStr = `<MotionStaggerItem>
            <main className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">

              {/* Real-Time Healthcare Operations Control Center */}
              <SectionCard
                title="Real-Time Healthcare Operations Control Center"
                subtitle="Immersive SVG patient flow diagnostics, wing occupancy allocation, and queue wait latencies"
                icon={Activity}
                className="lg:col-span-12"
              >
                <div className="grid gap-6 lg:grid-cols-12 mt-2">
                  {/* Left: Hourly Patient Flow SVG Line Graph */}
                  <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-black/40 p-4.5 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">Live Patient Flow Rate</span>
                      <span className="text-[9px] text-white/40 uppercase font-bold">Hourly Outpatient Sync</span>
                    </div>

                    <div className="w-full aspect-[2.2] relative">
                      <svg className="h-full w-full" viewBox="0 0 600 240" fill="none">
                        <defs>
                          <linearGradient id="adminChartGrad" x1="0" y1="0" x2="0" y2="240">
                            <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
                            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                          </linearGradient>
                        </defs>

                        {/* grids */}
                        <line x1="40" y1="40" x2="560" y2="40" stroke="rgba(255,255,255,0.03)" strokeDasharray="4,4" />
                        <line x1="40" y1="100" x2="560" y2="100" stroke="rgba(255,255,255,0.03)" strokeDasharray="4,4" />
                        <line x1="40" y1="160" x2="560" y2="160" stroke="rgba(255,255,255,0.03)" strokeDasharray="4,4" />

                        {/* values */}
                        <text x="25" y="45" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontWeight="bold">150</text>
                        <text x="25" y="105" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontWeight="bold">100</text>
                        <text x="25" y="165" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontWeight="bold">50</text>

                        {/* area */}
                        <path
                          d="M 40 240 L 40 180 L 120 150 L 200 190 L 280 120 L 360 80 L 440 110 L 520 60 L 560 90 L 560 240 Z"
                          fill="url(#adminChartGrad)"
                        />

                        {/* line */}
                        <path
                          d="M 40 180 L 120 150 L 200 190 L 280 120 L 360 80 L 440 110 L 520 60 L 560 90"
                          stroke="#22d3ee"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                        />

                        {/* dots */}
                        {[
                          { x: 40, y: 180, time: "08:00" },
                          { x: 120, y: 150, time: "10:00" },
                          { x: 200, y: 190, time: "12:00" },
                          { x: 280, y: 120, time: "14:00" },
                          { x: 360, y: 80, time: "16:00" },
                          { x: 440, y: 110, time: "18:00" },
                          { x: 520, y: 60, time: "20:00" }
                        ].map((pt, i) => (
                          <g key={i}>
                            <circle cx={pt.x} cy={pt.y} r="4.5" fill="#22d3ee" stroke="#04070c" strokeWidth="1.5" />
                            <text x={pt.x} y="215" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontWeight="bold">{pt.time}</text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Center: Wing Occupancy Allocation Bars */}
                  <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-black/40 p-4.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-300">Wing Occupancy Status</span>
                        <span className="text-[9px] text-white/40 uppercase font-bold">Capacity Limits</span>
                      </div>

                      <div className="space-y-3.5">
                        {[
                          { name: "Emergency Ward", pct: 95, color: "from-rose-500 to-rose-400" },
                          { name: "Cardiology Unit", pct: 88, color: "from-cyan-500 to-cyan-400" },
                          { name: "Neurology Wing", pct: 65, color: "from-amber-500 to-amber-400" },
                          { name: "Pediatrics Clinic", pct: 42, color: "from-emerald-500 to-emerald-400" },
                        ].map((wing) => (
                          <div key={wing.name} className="space-y-1.5">
                            <div className="flex justify-between text-[11px] font-bold">
                              <span className="text-white/70">{wing.name}</span>
                              <span className={wing.pct >= 90 ? "text-rose-400" : "text-white"}>{wing.pct}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                              <div
                                  className={"h-full bg-gradient-to-r " + wing.color + " rounded-full"}
                                  style={{ width: wing.pct + "%" }}
                                />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl bg-white/5 border border-white/5 p-2 text-center text-[9px] text-white/40 font-bold uppercase tracking-wider">
                      Dynamic Bed Redistribution Calibrated
                    </div>
                  </div>

                  {/* Right: Queue Latency Histograms */}
                  <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-black/40 p-4.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">Queue Latency Histogram</span>
                        <span className="text-[9px] text-white/40 uppercase font-bold">Wait Brackets</span>
                      </div>

                      <div className="w-full aspect-[1.1] relative mt-2">
                        <svg className="h-full w-full" viewBox="0 0 200 160" fill="none">
                          <line x1="20" y1="130" x2="190" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                          {[
                            { label: "<5m", val: 45, max: 100, x: 30, color: "#10b981" },
                            { label: "5-10m", val: 78, max: 100, x: 70, color: "#22d3ee" },
                            { label: "10-20m", val: 92, max: 100, x: 110, color: "#f59e0b" },
                            { label: "20m+", val: 28, max: 100, x: 150, color: "#ef4444" }
                          ].map((bar, i) => {
                            const barHeight = (bar.val / bar.max) * 100;
                            const y = 130 - barHeight;
                            return (
                              <g key={i} className="group">
                                <rect
                                  x={bar.x}
                                  y={y}
                                  width="24"
                                  height={barHeight}
                                  fill={bar.color}
                                  rx="4"
                                  className="opacity-75 group-hover:opacity-100 transition-all duration-300 shadow-md"
                                  style={{ filter: "drop-shadow(0 0 4px " + bar.color + ")" }}
                                />
                                <text
                                  x={bar.x + 12}
                                  y={y - 5}
                                  textAnchor="middle"
                                  fill="#fff"
                                  fontSize="8"
                                  fontWeight="black"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  {bar.val}p
                                </text>
                                <text x={bar.x + 12} y="143" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8.5" fontWeight="bold">
                                  {bar.label}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl bg-white/5 border border-white/5 p-2 text-center text-[9px] text-white/40 font-bold uppercase tracking-wider">
                      Current Waiting Index: Optimal Range
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Live Queue Management Panel */}
              <SectionCard`;

if (!targetRegex.test(content)) {
  console.error("Target regex not matched in app/dashboard/admin/page.tsx!");
  process.exit(1);
}

content = content.replace(targetRegex, replacementStr);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully edited app/dashboard/admin/page.tsx!");
