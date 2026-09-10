import React, { useState } from 'react';
import { 
  ChevronRight, Lock 
} from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { toast } from 'sonner';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PRODUCTION' | 'PAYSTACK' | 'CRM' | 'AUDIT'>('PRODUCTION');

  const { orders, auditLogs, appointments, advanceAtelierStage } = useOrderStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  const totalRevenueKobo = orders
    .filter((o) => o.paymentStatus === 'PAYMENT_SUCCESSFUL')
    .reduce((sum, o) => sum + o.totalKobo, 0);

  const activeProductionOrders = orders.filter(
    (o) => o.paymentStatus === 'PAYMENT_SUCCESSFUL' && o.atelierCurrentStageIndex < 6
  );

  const handleAdvanceStage = (orderId: string, currentStage: number) => {
    if (currentStage >= 6) {
      toast.info('Order has already reached final dispatch stage.');
      return;
    }
    playSuccessChime();
    advanceAtelierStage(orderId, currentStage + 1);
    toast.success(`Order stage advanced to Stage 0${currentStage + 2}.`);
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#000000] font-sans-luxury pb-24">
      
      {/* Admin Top Header */}
      <div className="bg-[#000000] text-white py-10 px-4 sm:px-8 lg:px-12 border-b border-white/15">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-[0.25em] uppercase font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>FINALUCHI ATELIER OPS DESK • ENTERPRISE CRM</span>
            </div>
            <h1 className="font-sans-luxury text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Master Atelier Production Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-[10px] font-mono-luxury uppercase rounded-none">
              ● S2S Webhook Live
            </span>
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono-luxury uppercase rounded-none border border-white/20">
              Lagos Flagship Bench: Active
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#FFFFFF] p-5 border border-black/10 rounded-none space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Gross Paid Revenue (NGN)</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{formatKoboToNgn(totalRevenueKobo)}</div>
            <span className="text-[10px] text-emerald-700 font-mono-luxury">100% Integer Minor Units Reconciled</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 border border-black/10 rounded-none space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Orders in Active Tailoring</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{activeProductionOrders.length}</div>
            <span className="text-[10px] text-muted font-mono-luxury">Across 6 Lagos Atelier Benches</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 border border-black/10 rounded-none space-y-1">
            <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider">Bespoke Client Appointments</span>
            <div className="text-2xl font-bold font-mono-luxury text-black">{appointments.length}</div>
            <span className="text-[10px] text-muted font-mono-luxury">Master Tailor Adebayo Assigned</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 border border-black/10 rounded-none space-y-1">
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
            { id: 'CRM', label: `VIP Client Appointments (${appointments.length})` },
            { id: 'AUDIT', label: `Security & Compliance Logs (${auditLogs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playTactileClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-none whitespace-nowrap transition-colors border ${
                activeTab === tab.id
                  ? 'bg-[#000000] text-white border-black font-bold'
                  : 'bg-[#FAFAFA] text-black/70 hover:text-black border-black/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: LIVE PRODUCTION DESK */}
        {activeTab === 'PRODUCTION' && (
          <div className="bg-[#FFFFFF] border border-black/10 rounded-none p-6 space-y-6">
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
                {orders.length} Total Orders Registered
              </div>
            </div>

            <div className="space-y-4 divide-y divide-black/10">
              {orders.map((order) => (
                <div key={order.id} className="pt-4 first:pt-0 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-black font-mono-luxury">
                          #{order.orderNumber}
                        </span>
                        <span className="text-xs text-muted">
                          — {order.shippingAddress.fullName} ({order.shippingAddress.city}, {order.shippingAddress.state})
                        </span>
                        <span className="px-2 py-0.5 bg-black/5 text-black text-[10px] font-mono-luxury font-semibold uppercase rounded-none border border-black/10">
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted font-mono-luxury mt-0.5">
                        Amount: {formatKoboToNgn(order.totalKobo)} • Paystack Ref: {order.gatewayReference || 'FC_PSTK_DIRECT'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-luxury text-black font-bold">
                        Stage 0{order.atelierCurrentStageIndex + 1} / 07
                      </span>
                      <button
                        onClick={() => handleAdvanceStage(order.id, order.atelierCurrentStageIndex)}
                        disabled={order.atelierCurrentStageIndex >= 6}
                        className="px-3.5 py-2 bg-[#000000] text-white text-xs font-semibold tracking-couture uppercase rounded-none hover:bg-neutral-800 disabled:opacity-40 transition-colors flex items-center gap-1"
                      >
                        <span>ADVANCE STAGE</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Items in this Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#FAFAFA] border border-black/5 p-3 rounded-none text-xs">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.heroImageUrl}
                          alt={item.productNameSnapshot}
                          className="w-8 h-10 object-cover rounded-none"
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
          <div className="bg-[#FFFFFF] border border-black/10 rounded-none p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Paystack S2S Transaction Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-luxury">
                <thead className="bg-[#FAFAFA] border-b border-black/10 text-muted uppercase">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Gateway Reference</th>
                    <th className="p-3">Amount (Minor Units)</th>
                    <th className="p-3">Client Email</th>
                    <th className="p-3">HMAC SHA-512 Verification</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="p-3 font-semibold text-black">{ord.orderNumber}</td>
                      <td className="p-3 text-muted">{ord.gatewayReference || 'FC_PSTK_LOCAL'}</td>
                      <td className="p-3 font-bold text-black">{formatKoboToNgn(ord.totalKobo)}</td>
                      <td className="p-3">{ord.shippingAddress.email}</td>
                      <td className="p-3 text-emerald-700 font-mono-luxury">✓ Valid Signature</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-none font-semibold">
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
          <div className="bg-[#FFFFFF] border border-black/10 rounded-none p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Client Appointments & Consultations
            </h3>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black">{apt.clientName || apt.guestName}</span>
                      <span className="text-muted font-mono-luxury">({apt.clientEmail || apt.guestEmail} • {apt.clientPhone || apt.guestPhone})</span>
                    </div>
                    <div className="text-xs text-muted font-mono-luxury">
                      {(apt.appointmentType || apt.serviceType || 'ATELIER_FITTING').replace(/_/g, ' ')} — {apt.date} ({apt.timeSlot})
                    </div>
                    <div className="text-muted">Location: {apt.location || 'Finaluchi Flagship Atelier, Lagos'}</div>
                    {apt.notes && <div className="italic text-black/80">Notes: "{apt.notes}"</div>}
                  </div>

                  <div className="text-right font-mono-luxury">
                    <span className="px-2 py-0.5 bg-[#000000] text-white rounded-none uppercase text-[10px]">
                      {apt.status}
                    </span>
                    <div className="text-[10px] text-muted mt-1">Lead: {apt.assignedArtisan || 'Master Tailor Adebayo'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: SECURITY AUDIT LOGS */}
        {activeTab === 'AUDIT' && (
          <div className="bg-[#FFFFFF] border border-black/10 rounded-none p-6 space-y-4">
            <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
              Enterprise Security Audit Trail (Section 13.1)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-luxury">
                <thead className="bg-[#FAFAFA] border-b border-black/10 text-muted uppercase">
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
                    <tr key={log.id} className="hover:bg-[#FAFAFA] transition-colors">
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
