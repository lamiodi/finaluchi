import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Ruler, ChevronDown, ChevronUp, 
  RotateCw, Share2, Calendar, MessageCircle
} from 'lucide-react';
import { Product, ProductColorway } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { toast } from 'sonner';
import { ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onBackToCatalog: () => void;
  onBookAppointment: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onBackToCatalog,
  onBookAppointment,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(
    product.colorways.find((c) => c.isDefault) || product.colorways[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isMadeToMeasure, setIsMadeToMeasure] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotationFrameIndex, setRotationFrameIndex] = useState<number>(0);
  const [isDragging360, setIsDragging360] = useState<boolean>(false);
  const [startX360, setStartX360] = useState<number>(0);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('DETAILS');

  const { displayCurrency } = useCurrencyStore();
  const { addToCart } = useCartStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  const isSaved = savedEdits.some((e) => e.productIds.includes(product.id));

  // 360 Rotation Frames
  const frames = selectedColorway.rotationFrameUrls?.length > 0
    ? selectedColorway.rotationFrameUrls
    : [selectedColorway.heroImageUrl];

  const handleMouseDown360 = (e: React.MouseEvent) => {
    setIsDragging360(true);
    setStartX360(e.clientX);
  };

  const handleMouseMove360 = (e: React.MouseEvent) => {
    if (!isDragging360 || frames.length <= 1) return;
    const delta = e.clientX - startX360;
    if (Math.abs(delta) > 20) {
      const step = delta > 0 ? 1 : -1;
      setRotationFrameIndex((prev) => (prev + step + frames.length) % frames.length);
      setStartX360(e.clientX);
    }
  };

  const handleMouseUp360 = () => {
    setIsDragging360(false);
  };

  const handleAddToCart = () => {
    playSuccessChime();
    addToCart(product, selectedColorway, selectedSize, 1, isMadeToMeasure);
    toast.success(`${product.name} (${selectedColorway.color.name}) added to your bag.`);
  };

  const handleWhatsAppInquiry = () => {
    playTactileClick();
    const message = [
      'Hello Finaluchi Couture, I would like to inquire about this piece:',
      product.name,
      `Colour: ${selectedColorway.color.name} (${selectedColorway.color.code})`,
      `Size: ${isMadeToMeasure ? 'Custom / Made to Measure' : selectedSize}`,
      `Listed price: ${formatPriceWithDisplay(product.basePriceKobo + (selectedColorway.priceDeltaKobo || 0), displayCurrency)}`,
      '',
      'Before proceeding with payment, please confirm:',
      '1. Itemized written invoice & production schedule',
      '2. Confirmed delivery date for my location',
      '3. Measurement confirmation guidance',
      '4. Alteration allowance & refund policy',
      '5. Traceable business account details',
    ].join('\n');
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const toggleAccordion = (name: string) => {
    playTactileClick();
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  const recommendations = allProducts
    .filter((p) => p.id !== product.id && (p.pillar === product.pillar || product.completeTheLookProductIds?.includes(p.id)))
    .slice(0, 4);

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#000000] font-sans-luxury pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 py-4 text-[11px] text-black/50 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-black/10">
        <button onClick={onBackToCatalog} className="hover:text-[#000000] transition-colors">Collections</button>
        <span>/</span>
        <span>{product.pillar.replace('_', ' ')}</span>
        <span>/</span>
        <span className="text-[#000000] font-semibold line-clamp-1">{product.name}</span>
      </div>

      {/* Main Split Layout Grid */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Vertical Multi-Angle Lookbook Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 360 Rotation Toggle Bar */}
            {product.has360Rotation && (
              <div className="flex items-center justify-between p-3 bg-[#FFFFFF] border border-black/15 mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#000000]">
                  <RotateCw className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Interactive 360° View</span>
                </div>
                <button
                  onClick={() => {
                    playTactileClick();
                    setIs360Active(!is360Active);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors border ${
                    is360Active ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]' : 'bg-[#FFFFFF] text-[#000000] border-black/20 hover:border-[#000000]'
                  }`}
                >
                  {is360Active ? 'Exit 360° View' : 'Drag to Rotate'}
                </button>
              </div>
            )}

            {/* Interactive 360 Canvas */}
            {is360Active ? (
              <div
                onMouseDown={handleMouseDown360}
                onMouseMove={handleMouseMove360}
                onMouseUp={handleMouseUp360}
                onMouseLeave={handleMouseUp360}
                className="aspect-[3/4] w-full bg-[#FAFAFA] border border-black/15 overflow-hidden cursor-ew-resize relative flex items-center justify-center select-none"
              >
                <img
                  src={frames[rotationFrameIndex] || selectedColorway.heroImageUrl}
                  alt={`${product.name} 360 view`}
                  className="w-full h-full object-cover object-top pointer-events-none"
                />
                <div className="absolute bottom-4 px-3 py-1.5 bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-luxury tracking-widest uppercase">
                  Angle {rotationFrameIndex + 1} / {frames.length} • Drag horizontally
                </div>
              </div>
            ) : (
              /* Vertical Lookbook Image Stack */
              <div className="space-y-4">
                {selectedColorway.mediaGalleryUrls.map((imgUrl, i) => (
                  <div key={i} className="aspect-[3/4.2] w-full bg-[#F7F7F7] overflow-hidden group">
                    <img
                      src={imgUrl}
                      alt={`${product.name} - Angle ${i + 1}`}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-700 ease-out p-4"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Sticky Product Details Rail */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-6">
            
            {/* Header / Badges */}
            <div className="space-y-3 pb-5 border-b border-black/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-[0.25em] font-medium">
                  {product.categoryName} • {selectedColorway.sku}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playTactileClick();
                      toggleProductInEdit('edit-default', product.id);
                    }}
                    className={`p-2.5 border transition-colors ${
                      isSaved ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]' : 'border-black/15 text-[#000000] hover:border-[#000000]'
                    }`}
                    title="Save Piece"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Piece share link copied to clipboard.');
                    }}
                    className="p-2.5 border border-black/15 text-[#000000] hover:border-[#000000] transition-colors"
                    title="Share Piece"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="font-sans-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#000000] uppercase leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
                {product.headline}
              </p>

              {/* Price Display */}
              <div className="pt-2">
                <span className="text-2xl sm:text-3xl font-mono-luxury font-bold text-[#000000]">
                  {formatPriceWithDisplay(product.basePriceKobo + (selectedColorway.priceDeltaKobo || 0), displayCurrency)}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono-luxury block mt-1 tracking-wider uppercase">
                  Confirm availability and measurements before payment
                </span>
              </div>
            </div>

            {/* Interactive Cloth Swatches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#000000] tracking-widest uppercase">
                  COLOUR: <span className="text-[#8C7A6B] font-mono-luxury">{selectedColorway.color.name}</span>
                </span>
                {selectedColorway.isMadeToOrder && (
                  <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase font-medium tracking-wider">
                    Made to Order
                  </span>
                )}
              </div>

              {/* Swatch List */}
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colorways.map((cw) => {
                  const isActive = cw.id === selectedColorway.id;
                  return (
                    <button
                      key={cw.id}
                      onClick={() => {
                        playTactileClick();
                        setSelectedColorway(cw);
                      }}
                      className={`swatch-chip ${isActive ? 'active' : ''} ${cw.isSoldOut ? 'sold-out' : ''} ${cw.isMadeToOrder ? 'made-to-order' : ''}`}
                      style={{ backgroundColor: cw.color.hexCode }}
                      title={`${cw.color.code} — ${cw.color.name}`}
                    />
                  );
                })}
              </div>

              <span className="text-[10px] text-neutral-500 font-mono-luxury block tracking-wider uppercase">
                {selectedColorway.color.lusterDescription}
              </span>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#000000] tracking-widest uppercase">
                  SELECT SIZE:
                </span>
                <button
                  onClick={() => {
                    playTactileClick();
                    setIsSizeGuideOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-black hover:text-[#8C7A6B] underline underline-offset-4 tracking-wider uppercase text-[11px] font-semibold transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playTactileClick();
                      setSelectedSize(s);
                      setIsMadeToMeasure(false);
                    }}
                    className={`py-3 text-xs font-mono-luxury font-semibold border transition-all ${
                      selectedSize === s && !isMadeToMeasure
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                        : 'bg-[#FFFFFF] text-[#000000] border-black/15 hover:border-[#000000]'
                    }`}
                  >
                    {s}
                  </button>
                ))}

                {product.isMadeToMeasureAllowed && (
                  <button
                    onClick={() => {
                      playTactileClick();
                      setIsMadeToMeasure(true);
                      setSelectedSize('MADE_TO_MEASURE');
                    }}
                    className={`col-span-3 sm:col-span-6 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all flex items-center justify-center gap-2 ${
                      isMadeToMeasure
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                        : 'bg-[#FFFFFF] text-[#000000] border-black/30 hover:bg-[#000000] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>CUSTOM / MADE TO MEASURE</span>
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 sm:py-5 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3.5 bg-[#FFFFFF] text-[#000000] text-xs font-bold tracking-[0.2em] uppercase border border-[#000000] hover:bg-[#000000] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ASK ABOUT THIS PIECE ON WHATSAPP</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono-luxury pt-1 border-b border-black/10 pb-3">
                <span>Abuja Atelier Direct</span>
                <button
                  onClick={() => {
                    playTactileClick();
                    onBookAppointment();
                  }}
                  className="text-[#000000] font-semibold underline underline-offset-2 flex items-center gap-1.5 hover:text-[#8C7A6B] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request a Fitting</span>
                </button>
              </div>
            </div>

            {/* Materiality */}
            <div className="py-4 space-y-3 border-b border-black/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-sans-luxury font-bold tracking-wider uppercase text-black">
                  Craft & Materiality
                </span>
                <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase">
                  {product.fabricIntelligence.weightGsm} GSM
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono-luxury text-neutral-400 block uppercase tracking-wider">Material</span>
                  <span className="font-medium text-black">{product.fabricIntelligence.material}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-luxury text-neutral-400 block uppercase tracking-wider">Composition</span>
                  <span className="font-medium text-black">{product.fabricIntelligence.composition}</span>
                </div>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="divide-y divide-black/10 text-xs">
              {/* Details */}
              <div>
                <button
                  onClick={() => toggleAccordion('DETAILS')}
                  className="w-full py-3.5 flex items-center justify-between font-bold tracking-widest uppercase text-[#000000] hover:text-[#C5A880] transition-colors text-left"
                >
                  <span>DESIGN & FIT DETAILS</span>
                  {openAccordion === 'DETAILS' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'DETAILS' && (
                  <div className="pb-4 text-black/75 font-light leading-relaxed space-y-2 animate-in fade-in">
                    <p>{product.description}</p>
                    <p className="font-mono-luxury text-[#000000] text-[11px] pt-1">
                      {product.atelierNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery & Terms */}
              <div>
                <button
                  onClick={() => toggleAccordion('SHIPPING')}
                  className="w-full py-3.5 flex items-center justify-between font-bold tracking-widest uppercase text-[#000000] hover:text-[#C5A880] transition-colors text-left"
                >
                  <span>DELIVERY & ALTERATIONS</span>
                  {openAccordion === 'SHIPPING' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'SHIPPING' && (
                  <div className="pb-4 text-black/75 font-light leading-relaxed space-y-2.5 animate-in fade-in">
                    <p>{ORDER_CLARITY_NOTE}</p>
                    <p><strong>Itemized Written Invoice:</strong> Every order is backed by an itemized written invoice stating garment specifications, fabric details, confirmed delivery date, and agreed price.</p>
                    <p><strong>Delivery Timelines:</strong> Production timelines and transit dates are agreed in writing before cutting. Nationwide Nigerian delivery is handled via vetted dispatch/couriers; international orders are fulfilled via express DHL/FedEx.</p>
                    <p><strong>Fittings & Alterations:</strong> Ready-to-wear pieces may be exchanged within 48 hours in unworn original condition. Custom bespoke garments receive dedicated fitting consultations and complimentary alteration adjustments at our Abuja studio or through guided virtual fitting reviews.</p>
                  </div>
                )}
              </div>

              {/* Composition & Care */}
              <div>
                <button
                  onClick={() => toggleAccordion('CARE')}
                  className="w-full py-3.5 flex items-center justify-between font-bold tracking-widest uppercase text-[#000000] hover:text-[#C5A880] transition-colors text-left"
                >
                  <span>CARE INSTRUCTIONS</span>
                  {openAccordion === 'CARE' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'CARE' && (
                  <div className="pb-4 text-black/75 font-light leading-relaxed space-y-1 animate-in fade-in">
                    <p><strong>Care:</strong> {product.fabricIntelligence.careInstructions}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* More Pieces Recommendations */}
        <div className="pt-20 border-t border-black/10 mt-20">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-[0.25em]">
              Editorial Curation
            </span>
            <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#000000] uppercase">
              More Finaluchi Pieces
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  playTactileClick();
                  onSelectProduct(rec);
                }}
                className="group cursor-pointer flex flex-col transition-all"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#F7F7F7] mb-3 p-3 flex items-center justify-center">
                  <img
                    src={rec.colorways[0].heroImageUrl}
                    alt={rec.name}
                    className="w-full h-full object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-sans-luxury font-semibold uppercase text-[#000000] group-hover:text-[#A67C4A] transition-colors line-clamp-1">
                    {rec.name}
                  </h4>
                  <div className="text-xs sm:text-sm font-mono-luxury text-[#000000] font-bold">
                    {formatPriceWithDisplay(rec.basePriceKobo, displayCurrency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectMadeToMeasure={() => {
          setIsMadeToMeasure(true);
          setSelectedSize('MADE_TO_MEASURE');
        }}
      />

    </div>
  );
};
