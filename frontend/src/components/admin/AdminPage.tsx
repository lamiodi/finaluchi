import React, { useCallback, useEffect, useState } from 'react';
import {
  ChevronRight, Lock, Loader2, RefreshCw, LogOut
} from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { toast } from 'sonner';
import {
  AdminOverview,
  adminAdvanceStage,
  adminFetchOverview,
  adminLogin,
  getAdminToken,
  isApiConfigured,
  setAdminToken,
} from '../../lib/api';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PRODUCTION' | 'PAYSTACK' | 'CRM' | 'AUDIT'>('PRODUCTION');

  const { orders, auditLogs, appointments, advanceAtelierStage, mergeRemoteOrder } = useOrderStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  // Atelier desk auth: passcode → backend token → live order desk. When the
  // API is not configured the page stays a local-browser view of this machine's
  // orders, exactly as before the backend existed.
  const [token, setToken] = useState<string | null>(() => (isApiConfigured ? getAdminToken() : null));
  const [passcode, setPasscode] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingDesk, setIsLoadingDesk] = useState(false);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [liveMode, setLiveMode] = useState(false);

  const loadOverview = useCallback(
    async (activeToken: string) => {
      setIsLoadingDesk(true);
      const data = await adminFetchOverview(activeToken);
      setIsLoadingDesk(false);
      if (!data) {
        setLiveMode(false);
        toast.error('Could not reach the atelier API — showing this browser’s orders only.');
        return;
      }
      setOverview(data);
      data.orders.forEach((order) => mergeRemoteOrder(order));
      setLiveMode(true);
    },
    [mergeRemoteOrder]
  );

  useEffect(() => {
    if (isApiConfigured && token) void loadOverview(token);
  }, [token, loadOverview]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setIsAuthenticating(true);
    const issued = await adminLogin(passcode);
    setIsAuthenticating(false);
    if (issued) {
      setToken(issued);
      setPasscode('');
      toast.success('Atelier desk unlocked.');
    } else {
      toast.error('Incorrect studio passcode, or the atelier API is unreachable.');
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    setToken(null);
    setOverview(null);
    setLiveMode(false);
  };

  const handleAdvanceStage = (orderId: string, orderNumber: string, currentStage: number) => {
    if (currentStage >= 6) {
      toast.info('Order has already reached final dispatch stage.');
      return;
    }
    playSuccessChime();
    advanceAtelierStage(orderId, currentStage + 1);
    if (token) void adminAdvanceStage(token, orderNumber, currentStage + 1);
    toast.success(`Order stage advanced to Stage 0${currentStage + 2}.`);
  };

  const totalRevenueKobo = orders
    .filter((o) => o.paymentStatus === 'PAYMENT_SUCCESSFUL')
    .reduce((sum, o) => sum + o.totalKobo, 0);

  const activeProductionOrders = orders.filter(
    (o) => o.paymentStatus === 'PAYMENT_SUCCESSFUL' && o.atelierCurrentStageIndex < 6
  );

  const displayAppointments = overview?.appointments?.length ? overview.appointments : appointments;

  /* ------------------------- Passcode gate (API mode) ------------------------ */
  if (isApiConfigured && !token) {
    return (
      <div className="w-full min-h-screen bg-noir text-white flex items-center justify-center p-4 font-sans-luxury">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-6 bg-black/40 border border-white/15 p-8"
        >
          <div className="space-y-2 text-center">
            <Lock className="w-6 h-6 text-champagne mx-auto" />
            <h1 className="text-lg font-bold uppercase tracking-widest">Atelier Ops Desk</h1>
            <p className="text-[11px] text-white/60 font-mono-luxury">
              Enter the studio passcode to unlock live orders, appointments and dispatch.
            </p>
          </div>

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Studio passcode"
            aria-label="Studio passcode"
            autoFocus
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-sm font-mono-luxury tracking-widest focus:outline-none focus:border-champagne"
          />

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3.5 bg-white text-noir text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> UNLOCKING…
              </>
            ) : (
              'UNLOCK DESK'
            )}
          </button>

          <p className="text-[10px] text-center text-white/40 font-mono-luxury">
            FINALUCHI COUTURE · ABUJA FLAGSHIP · PRIVATE ACCESS
          </p>
        </form>
      </div>
    );
  }

  /* ------------------------------- Desk view -------------------------------- */
  return (
    <div className="w-full bg-white min-h-screen text-noir font-sans-luxury pb-24">

      {/* Admin Top Header */}
      <div className="bg-noir text-white py-10 px-4 sm:px-8 lg:px-12 border-b border-white/15">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-champagne text-xs font-mono-luxury tracking-[0.25em] uppercase font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>FINALUCHI ATELIER OPS DESK • ENTERPRISE CRM</span>
            </div>
            <h1 className="font-sans-luxury text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Master Atelier Production Hub
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1 text-[10px] font-mono-luxury uppercase border ${
                liveMode
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50'
                  : 'bg-white/10 text-white/70 border-white/20'
              }`}
            >
              {liveMode ? '● Live · Atelier API Connected' : isApiConfigured ? '● Atelier API Unreachable' : '● Local Browser Session'}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono-luxury uppercase border border-white/20">
              Abuja Flagship Studio: Active
            </span>
            {isApiConfigured && token && (
              <>
                <button
                  onClick={() => {
                    playTactileClick();
                    void loadOverview(token);
                  }}
                  className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono-luxury uppercase border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingDesk ? 'animate-spin' : ''}`} /> Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono-luxury uppercase border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3 h-3" /> Lock
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">

        {isLoadingDesk && (
          <div className="mb-6 p-3 bg-alabaster-subtle border border-black/10 text-[11px] font-mono-luxury text-black/70 flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading live atelier orders…
          </div>
        )}

        {!isApiConfigured && (
          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 text-[11px] text-black/75 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Backend API not configured (VITE_API_URL) — this desk is showing orders placed in this browser only.
              Cross-device orders appear once the atelier API is connected.
            </span>
          </div>
        )}

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-5 border border-black/10 space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Gross Paid Revenue (NGN)</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{formatKoboToNgn(totalRevenueKobo)}</div>
            <span className="text-[10px] text-emerald-700 font-mono-luxury">100% Integer Minor Units Reconciled</span>
          </div>

          <div className="bg-white p-5 border border-black/10 space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Orders in Active Tailoring</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{activeProductionOrders.length}</div>
            <span className="text-[10px] text-muted font-mono-luxury">Across Abuja Atelier Benches</span>
          </div>

          <div className="bg-white p-5 border border-black/10 space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Bespoke Client Appointments</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{displayAppointments.length}</div>
            <span className="text-[10px] text-muted font-mono-luxury">Master Tailor Adebayo Assigned</span>
          </div>

          <div className="bg-white p-5 border border-black/10 space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Security Audit Log Events</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{auditLogs.length}</div>
            <span className="text-[10px] text-emerald-700 font-mono-luxury">0 Unresolved Integrity Breaches</span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-black/10 pb-4 mb-6 overflow-x-auto text-xs font-semibold tracking-couture uppercase">
          {[
            { id: 'PRODUCTION', label: `Live Production Desk (${orders.length})` },
            { id: 'PAYSTACK', label: 'Paystack Gateway Ledger' },
            { id: 'CRM', label: `VIP Client Appointments (${displayAppointments.length})` },
            { id: 'AUDIT', label: `Security & Compliance Logs (${auditLogs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playTactileClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 whitespace-nowrap transition-colors border ${
                activeTab === tab.id
                  ? 'bg-noir text-white border-black font-bold'
                  : 'bg-alabaster-subtle text-black/70 hover:text-black border-black/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: LIVE PRODUCTION DESK */}
        {activeTab === 'PRODUCTION' && (
          <div className="bg-white border border-black/10 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
                  Atelier Tailoring & Dispatch Queue
                </h3>
                <p className="text-xs text-muted font-light">
                  Advance garment construction stages in real-time as artisans complete cutting, bench stitching, and quality audits.
                </p>
              </div>

              <div className="text-xs font-mono-luxury text-muted">
                {orders.length} Total Orders Registered{overview ? ` · Synced ${new Date(overview.generatedAt).toLocaleTimeString()}` : ''}
              </div>
            </div>

            {orders.length === 0 && (
              <p className="text-xs text-muted font-mono-luxury py-6 text-center">
                No orders yet{liveMode ? ' on the atelier ledger' : ' in this browser'}.
              </p>
            )}

            <div className="space-y-4 divide-y divide-black/10">
              {orders.map((order) => (
                <div key={order.id} className="pt-4 first:pt-0 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-black font-mono-luxury">
                          #{order.orderNumber}
                        </span>
                        <span className="text-xs text-muted">
                          — {order.shippingAddress?.fullName} ({order.shippingAddress?.city}, {order.shippingAddress?.state})
                        </span>
                        <span className="px-2 py-0.5 bg-black/5 text-black text-[10px] font-mono-luxury font-semibold uppercase border border-black/10">
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted font-mono-luxury mt-0.5">
                        Amount: {formatKoboToNgn(order.totalKobo)} • Paystack Ref: {order.gatewayReference || '—'} • Placed: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-luxury text-black font-bold">
                        Stage 0{order.atelierCurrentStageIndex + 1} / 07
                      </span>
                      <button
                        onClick={() => handleAdvanceStage(order.id, order.orderNumber, order.atelierCurrentStageIndex)}
                        disabled={order.atelierCurrentStageIndex >= 6}
                        className="px-3.5 py-2 bg-noir text-white text-xs font-semibold tracking-couture uppercase hover:bg-neutral-800 disabled:opacity-40 transition-colors flex items-center gap-1"
                      >
                        <span>ADVANCE STAGE</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Items in this Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-alabaster-subtle border border-black/5 p-3 text-xs">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.heroImageUrl}
                          alt={item.productNameSnapshot}
                          className="w-8 h-10 object-cover border border-black/10"
                          onError={(e) => { e.currentTarget.src = '/FINALUCHIlogo-preloader.webp'; }}
                        />
                        <div className="line-clamp-1">
                          <div className="font-semibold text-black">{item.productNameSnapshot}</div>
                          <div className="text-[10px] text-muted font-mono-luxury">
                            {item.colorNameSnapshot} • Size: {item.sizeSnapshot}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: PAYSTACK GATEWAY LEDGER */}
        {activeTab === 'PAYSTACK' && (
          <div className="bg-white border border-black/10 p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Paystack S2S Transaction Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-luxury">
                <thead className="bg-alabaster-subtle border-b border-black/10 text-muted uppercase">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Gateway Reference</th>
                    <th className="p-3">Amount (Minor Units)</th>
                    <th className="p-3">Client Email</th>
                    <th className="p-3">Verification</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-alabaster-subtle transition-colors">
                      <td className="p-3 font-semibold text-black">{ord.orderNumber}</td>
                      <td className="p-3 text-muted">{ord.gatewayReference || '—'}</td>
                      <td className="p-3 font-bold text-black">{formatKoboToNgn(ord.totalKobo)}</td>
                      <td className="p-3">{ord.shippingAddress?.email || ord.customerEmail}</td>
                      <td className={`p-3 font-semibold ${ord.paymentStatus === 'PAYMENT_SUCCESSFUL' ? 'text-emerald-700' : 'text-black/50'}`}>
                        {ord.paymentStatus === 'PAYMENT_SUCCESSFUL' ? '✓ S2S Verified' : ord.paymentStatus === 'PAYMENT_AMOUNT_MISMATCH' ? '⚠ Amount Mismatch' : '— Pending'}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 border font-semibold ${
                          ord.paymentStatus === 'PAYMENT_SUCCESSFUL'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : ord.paymentStatus === 'PAYMENT_AMOUNT_MISMATCH'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-black/5 text-black/60 border-black/10'
                        }`}>
                          {ord.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: CLIENT APPOINTMENTS */}
        {activeTab === 'CRM' && (
          <div className="bg-white border border-black/10 p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Client Appointments & Consultations
            </h3>
            <div className="space-y-4">
              {displayAppointments.map((apt) => (
                <div key={apt.id} className="p-4 bg-alabaster-subtle border border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black">{apt.clientName || apt.guestName}</span>
                      <span className="text-muted font-mono-luxury">({apt.clientEmail || apt.guestEmail} • {apt.clientPhone || apt.guestPhone})</span>
                    </div>
                    <div className="text-xs text-muted font-mono-luxury">
                      {(apt.appointmentType || apt.serviceType || 'ATELIER_FITTING').replace(/_/g, ' ')} — {apt.date} ({apt.timeSlot})
                    </div>
                    <div className="text-muted">Location: {apt.location || 'Finaluchi Flagship Studio, Abuja'}</div>
                    {apt.notes && <div className="italic text-black/80">Notes: "{apt.notes}"</div>}
                  </div>

                  <div className="text-right font-mono-luxury">
                    <span className="px-2 py-0.5 bg-noir text-white uppercase text-[10px]">
                      {apt.status}
                    </span>
                    <div className="text-[10px] text-muted mt-1">Lead: {apt.assignedArtisan || 'Master Tailor Adebayo'}</div>
                  </div>
                </div>
              ))}
              {displayAppointments.length === 0 && (
                <p className="text-xs text-muted font-mono-luxury py-4 text-center">No appointments booked yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: SECURITY AUDIT LOGS */}
        {activeTab === 'AUDIT' && (
          <div className="bg-white border border-black/10 p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Enterprise Security Audit Trail (Section 13.1)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-luxury">
                <thead className="bg-alabaster-subtle border-b border-black/10 text-muted uppercase">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Actor / Principal</th>
                    <th className="p-3">Action Event</th>
                    <th className="p-3">Resource Target</th>
                    <th className="p-3">Client IP</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-alabaster-subtle transition-colors">
                      <td className="p-3 text-muted">{log.timestamp}</td>
                      <td className="p-3 font-semibold text-black">{log.actor || log.actorRole}</td>
                      <td className="p-3 text-black font-semibold">{log.action}</td>
                      <td className="p-3 text-muted">{log.resourceId}</td>
                      <td className="p-3">{log.ipAddress}</td>
                      <td className="p-3 text-black/80">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
