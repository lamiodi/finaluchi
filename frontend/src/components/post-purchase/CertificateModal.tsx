import React from 'react';
import { X, ShieldCheck, QrCode, Download } from 'lucide-react';
import { DigitalCertificate } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { toast } from 'sonner';
import { useModalA11y } from '../../lib/useModalA11y';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: DigitalCertificate;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  const { playTactileClick } = useAudioStore();
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  if (!isOpen) return null;

  const handleCopyVerification = () => {
    playTactileClick();
    const url = certificate.verificationUrl || `https://finaluchi.com/verify/${certificate.serialNumber}`;
    navigator.clipboard.writeText(url);
    toast.success('Order-record link copied to clipboard.');
  };

  const displayName = certificate.productName || certificate.pieceName;
  const displayCollection = certificate.collectionName || certificate.collection;
  const displayArtisan = certificate.leadArtisan || certificate.masterTailor;
  const displayDate = certificate.issueDate || certificate.registrationDate;

  return (
    <div className="fixed inset-0 z-[850] flex items-center justify-center p-3 sm:p-4 bg-noir/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
        tabIndex={-1}
        className="bg-white text-noir w-full max-w-2xl border-2 border-black/20 shadow-2xl overflow-hidden p-6 sm:p-10 md:p-12 relative max-h-[92vh] overflow-y-auto outline-none"
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-muted hover:text-noir transition-colors"
          aria-label="Close Certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Framing Details */}
        <div className="border border-black/20 p-6 sm:p-10 md:p-12 bg-white relative text-center space-y-6">
          
          {/* Subtle watermarked monogram in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="font-display text-[140px] sm:text-[180px] font-bold">fc</span>
          </div>

          {/* Header Monogram & Title */}
          <div className="space-y-2">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full border border-champagne/80 p-1 mx-auto bg-white shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/FINALUCHIlogo.webp"
                alt="Finaluchi Seal"
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono-luxury text-bronze-deep uppercase tracking-[0.25em] sm:tracking-[0.3em] block font-semibold">
              FINALUCHI COUTURE • ABUJA, NIGERIA
            </span>
            <h2 id="certificate-title" className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-noir uppercase">
              Garment Order Record
            </h2>
            <p className="text-[11px] sm:text-xs text-muted font-light max-w-md mx-auto">
              A saved record of the Finaluchi piece, selected details and original order reference.
            </p>
          </div>

          {/* Garment & Ownership Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4 border-y border-border/80 text-left text-xs font-mono-luxury">
            <div>
              <span className="text-[9px] text-muted uppercase block">Creation / Silhouette</span>
              <span className="font-semibold text-noir font-display text-sm">{displayName}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted uppercase block">Couture Colorway</span>
              <span className="font-semibold text-noir">{certificate.colorwayName || 'Noir Onyx Silk'}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted uppercase block">Couture Collection</span>
              <span className="font-semibold text-noir">{displayCollection}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted uppercase block">Unique Serial Reference</span>
              <span className="font-bold text-bronze-deep">{certificate.serialNumber}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted uppercase block">Registered Owner</span>
              <span className="font-semibold text-noir">{certificate.registeredOwner}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted uppercase block">Commission Date</span>
              <span className="font-semibold text-noir">{displayDate}</span>
            </div>
          </div>

          {/* Lead Artisan Signature & Verification QR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-2">
            
            {/* Signature */}
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[9px] font-mono-luxury text-muted uppercase block">Attested By Lead Artisan</span>
              <div className="font-display italic text-base sm:text-lg text-noir font-semibold tracking-wide">
                {displayArtisan}
              </div>
              <span className="text-[9px] sm:text-[10px] text-muted font-mono-luxury block">
                Finaluchi Couture • Abuja
              </span>
            </div>

            {/* QR Code Verification Box */}
            <div className="flex items-center gap-3 bg-white p-3 border border-border rounded-xs w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-noir text-white flex items-center justify-center rounded-xs shrink-0">
                <QrCode className="w-10 sm:w-12 h-10 sm:h-12" />
              </div>
              <div className="text-left text-[10px] font-mono-luxury">
                <span className="font-bold text-noir block">ORDER REFERENCE</span>
                <span className="text-muted block truncate max-w-[120px]">
                  {(certificate.qrCodeHash || certificate.serialNumber).slice(0, 16)}...
                </span>
                <button
                  onClick={handleCopyVerification}
                  className="text-bronze-deep hover:text-noir underline mt-1 block font-medium"
                >
                  Copy Record Link
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="flex items-center gap-1.5 text-xs text-muted font-mono-luxury">
            <ShieldCheck className="w-4 h-4 text-bronze" />
            <span>Keep this record with your invoice and care guidance</span>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              window.print();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-noir text-white text-xs font-semibold tracking-couture uppercase hover:bg-neutral-800 transition-all btn-luxury rounded-xs flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PRINT / SAVE PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
