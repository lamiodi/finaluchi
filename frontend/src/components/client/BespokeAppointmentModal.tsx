import React, { useState } from 'react';
import { X, Calendar, Sparkles } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { toast } from 'sonner';
import { buildWhatsAppUrl } from '../../data/brand';

const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

interface BespokeAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BespokeAppointmentModal: React.FC<BespokeAppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [appointmentType, setAppointmentType] = useState<string>('IN_PERSON_FITTING');
  const [date, setDate] = useState(getTomorrowDate);
  const [timeSlot, setTimeSlot] = useState('Afternoon');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const { bookAppointment } = useOrderStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      toast.error('Please complete all required fields.');
      return;
    }

    playSuccessChime();

    const location = appointmentType === 'IN_PERSON_FITTING'
      ? 'Abuja fitting — address to be confirmed'
      : appointmentType === 'VIRTUAL_CONSULTATION'
      ? 'Virtual consultation — platform to be confirmed'
      : 'Event order consultation';

    bookAppointment({
      guestName: clientName,
      clientName,
      guestEmail: clientEmail,
      clientEmail,
      guestPhone: clientPhone,
      clientPhone,
      appointmentType,
      serviceType: appointmentType,
      date,
      timeSlot,
      location,
      notes,
    });

    const request = [
      'Hello Finaluchi Couture, I would like to request a consultation.',
      `Name: ${clientName}`,
      `Phone: ${clientPhone}`,
      clientEmail ? `Email: ${clientEmail}` : '',
      `Format: ${appointmentType.replace(/_/g, ' ')}`,
      `Preferred date: ${date}`,
      `Preferred time: ${timeSlot}`,
      notes ? `Occasion / notes: ${notes}` : '',
    ].filter(Boolean).join('\n');

    window.open(buildWhatsAppUrl(request), '_blank', 'noopener,noreferrer');
    toast.success('WhatsApp opened with your consultation request ready to send.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-3 sm:p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-[#000000] w-full max-w-xl border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#000000] text-[#FFFFFF] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM ORDER CONSULTATION</span>
            </div>
            <h2 className="font-sans-luxury text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mt-1">
              Plan Your Finaluchi Look
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs bg-[#FFFFFF]">
          
          {/* Appointment Type */}
          <div className="space-y-2.5">
            <label className="font-bold tracking-widest uppercase text-[#000000] block">
              CONSULTATION FORMAT:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'IN_PERSON_FITTING', label: 'Abuja Fitting', sub: 'Location confirmed by the team' },
                { id: 'VIRTUAL_CONSULTATION', label: 'Virtual Call', sub: 'Discuss design, fit and timing' },
                { id: 'EVENT_ORDER_CONSULTATION', label: 'Event Order', sub: 'Asoebi, bridal or occasion wear' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setAppointmentType(t.id);
                  }}
                  className={`p-3.5 text-left border transition-all ${
                    appointmentType === t.id
                      ? 'border-[#000000] bg-[#000000] text-[#FFFFFF] font-bold'
                      : 'border-black/15 bg-[#FFFFFF] text-black/70 hover:border-[#000000]'
                  }`}
                >
                  <div className={`text-xs font-semibold uppercase ${appointmentType === t.id ? 'text-white' : 'text-[#000000]'}`}>{t.label}</div>
                  <div className={`text-[10px] mt-0.5 ${appointmentType === t.id ? 'text-white/70' : 'text-black/50'}`}>{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getTomorrowDate()}
                className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs font-mono-luxury focus:outline-none focus:border-[#000000]"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-3 border-t border-black/10">
            <div>
              <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Amara Okafor"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="client@domain.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="+234 803 000 0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                  className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs font-mono-luxury focus:outline-none focus:border-[#000000]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                Occasion / Dressing Notes (Optional)
              </label>
              <textarea
                placeholder="Mention your event date, the piece or category you like, colour, sizing and any custom details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>CONTINUE REQUEST ON WHATSAPP</span>
          </button>

          <p className="text-[10px] text-center text-black/50 font-mono-luxury">
            Your preferred time is a request until the Finaluchi team confirms it on WhatsApp.
          </p>

        </form>

      </div>
    </div>
  );
};
