import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, MapPin, Send, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAudioStore } from '../../stores/audioStore';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointments?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('BESPOKE_INQUIRY');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { playTactileClick, playSuccessChime } = useAudioStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    playTactileClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      playSuccessChime();
      toast.success('Your message has been received by the Private Client Concierge. We will reply within 4 business hours.');
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSent(false);
    onClose();
  };

  const handleWhatsAppDirect = () => {
    playTactileClick();
    const text = encodeURIComponent('Hello Finaluchi Couture Concierge, I would like to inquire about a couture piece / bespoke consultation.');
    window.open(`https://wa.me/2348035550192?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[850] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-noir w-full max-w-2xl border border-black/15 rounded-xs shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#000000] text-white border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-loose-couture uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRIVATE CLIENT CONCIERGE</span>
            </div>
            <h2 className="font-sans-luxury text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mt-0.5">
              Contact Finaluchi Atelier
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              handleReset();
            }}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label="Close Contact Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Direct Concierge Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="p-3.5 bg-emerald-900/10 border border-emerald-800/30 hover:border-emerald-700 hover:bg-emerald-900/20 text-emerald-950 rounded-xs flex items-center gap-3 transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-tight">Direct WhatsApp Line</div>
                <div className="text-[11px] text-emerald-800 font-mono-luxury">+234 803 555 0192</div>
              </div>
            </button>

            <a
              href="mailto:flc.finaluchi@gmail.com"
              onClick={() => playTactileClick()}
              className="p-3.5 bg-noir/5 border border-noir/15 hover:border-noir/40 hover:bg-noir/10 text-noir rounded-xs flex items-center gap-3 transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-noir text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-tight">Email Concierge Desk</div>
                <div className="text-[11px] text-noir/70 font-mono-luxury">flc.finaluchi@gmail.com</div>
              </div>
            </a>
          </div>

          {/* Submission Feedback or Contact Form */}
          {isSent ? (
            <div className="p-6 bg-white border border-champagne/40 rounded-xs text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold uppercase text-noir tracking-tight">Message Dispatched</h3>
              <p className="text-xs text-noir/70 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-noir">{name}</span>. Your private inquiry has been assigned to our senior atelier concierge. We have sent a confirmation copy to <span className="font-mono-luxury font-medium">{email}</span>.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2 text-xs bg-noir text-white uppercase tracking-couture rounded-xs font-medium"
                >
                  Send Another Inquiry
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2 text-xs border border-border text-noir uppercase tracking-couture rounded-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-couture text-noir/90 pb-1 border-b border-noir/10 flex items-center justify-between">
                <span>SEND DIRECT INQUIRY</span>
                <span className="text-[10px] font-mono-luxury text-muted lowercase font-normal">* required fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chinelo Adebayo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-border rounded-xs text-xs focus:outline-none focus:border-noir"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-border rounded-xs text-xs focus:outline-none focus:border-noir"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-border rounded-xs text-xs font-mono-luxury focus:outline-none focus:border-noir"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-white border border-border rounded-xs text-xs focus:outline-none focus:border-noir"
                  >
                    <option value="BESPOKE_INQUIRY">Bespoke 1-of-1 Commission</option>
                    <option value="ORDER_SUPPORT">Order Tracking & Sizing</option>
                    <option value="PRESS_MEDIA">Editorial & Press Loan</option>
                    <option value="PRIVATE_APPOINTMENT">Private Fitting Consultation</option>
                    <option value="OTHER">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your desired garment, event date, measurements, or questions for the atelier..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-white border border-border rounded-xs text-xs focus:outline-none focus:border-noir resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-noir text-white text-xs font-bold tracking-loose-couture uppercase hover:bg-neutral-800 transition-all btn-luxury rounded-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{isSubmitting ? 'DISPATCHING TO CONCIERGE...' : 'TRANSMIT TO PRIVATE CONCIERGE'}</span>
              </button>
            </form>
          )}

          {/* Atelier Physical Locations */}
          <div className="pt-3 border-t border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest font-semibold">
                FLAGSHIP ATELIER LOCATIONS & HOURS
              </div>
              {onOpenAppointments && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onOpenAppointments();
                  }}
                  className="text-[11px] font-sans-luxury font-semibold text-noir hover:text-[#C5A880] uppercase tracking-wider underline underline-offset-2"
                >
                  Book Private Fitting ⟶
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-noir/80">
              <div className="space-y-1 p-3 bg-white border border-border/50 rounded-xs">
                <div className="font-bold text-noir flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Lagos Flagship Atelier</span>
                  </div>
                  <a href="tel:+2348035550192" className="text-[10px] text-muted hover:text-noir flex items-center gap-0.5 font-mono-luxury">
                    <Phone className="w-2.5 h-2.5" /> Call
                  </a>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Plot 12, Victoria Island Arts Corridor, Lagos, Nigeria
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted font-mono-luxury pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Mon – Sat: 10:00 – 19:00 WAT</span>
                </div>
              </div>

              <div className="space-y-1 p-3 bg-white border border-border/50 rounded-xs">
                <div className="font-bold text-noir flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>London Private Suite</span>
                  </div>
                  <a href="tel:+442079460912" className="text-[10px] text-muted hover:text-noir flex items-center gap-0.5 font-mono-luxury">
                    <Phone className="w-2.5 h-2.5" /> Call
                  </a>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Old Bond Street, Mayfair, London W1S (By Private Invitation)
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted font-mono-luxury pt-1">
                  <Clock className="w-3 h-3" />
                  <span>Tue – Sat: 11:00 – 18:00 GMT</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
