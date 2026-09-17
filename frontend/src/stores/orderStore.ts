import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment, AuditLogEntry, DigitalCertificate, Order, OrderItemSnapshot, ShippingAddress } from '../types';
import { useCartStore } from './cartStore';
import { generateCertificateSerialNumber, generateOrderNumber } from '../utils/formatters';

interface OrderState {
  orders: Order[];
  activeOrderId: string | null;
  certificates: DigitalCertificate[];
  appointments: Appointment[];
  auditLogs: AuditLogEntry[];

  // Actions
  createOrder: (
    shippingAddress: ShippingAddress,
    packagingType: string,
    isGift: boolean,
    giftMessage?: string
  ) => Order;
  
  processPaystackSuccess: (orderId: string, gatewayReference: string) => Order;
  
  updateAtelierStage: (orderId: string, stageIndex: number) => void;
  advanceAtelierStage: (orderId: string, stageIndex: number) => void;
  
  updateFulfillmentStatus: (orderId: string, status: any) => void;
  
  bookAppointment: (data: Omit<Appointment, 'id' | 'status'>) => Appointment;
  
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  
  getOrderByToken: (token: string) => Order | undefined;
  
  getCertificateBySerial: (serial: string) => DigitalCertificate | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
  orders: false ? [
    {
      id: 'ord-fc-sample-01',
      orderNumber: 'FC-94820',
      guestAccessToken: 'fc_gst_94820_live_sec',
      guestTokenHash: 'hash_sha256_94820',
      customerFullName: 'Amara Okafor',
      customerEmail: 'amara.okafor@client.com',
      customerPhone: '+234 803 555 0192',
      shippingAddress: {
        fullName: 'Amara Okafor',
        email: 'amara.okafor@client.com',
        phone: '+234 803 555 0192',
        country: 'NG',
        state: 'Lagos',
        city: 'Ikoyi',
        addressLine1: '14 Alexander Avenue, Ikoyi',
        landmarkNotes: 'Signature Keepsake delivery to reception desk',
      },
      items: [
        {
          id: 'item-01',
          productId: 'prod-01',
          productNameSnapshot: 'Haute Soirée Sculptural Silk Gown',
          colorNameSnapshot: '06 — Benin Malachite Silk',
          sizeSnapshot: 'Made to Measure (Atelier Fit)',
          skuSnapshot: 'FC-HS-2026-MAL-MTM',
          unitPriceKobo: 38000000,
          quantity: 1,
          heroImageUrl: '/images/fc_haute_soiree_gown.webp',
        },
      ],
      subtotalKobo: 38000000,
      shippingKobo: 0,
      taxKobo: 2850000,
      discountKobo: 0,
      totalKobo: 40850000,
      currency: 'NGN',
      paymentStatus: 'PAYMENT_SUCCESSFUL',
      orderStatus: 'IN_PRODUCTION',
      fulfillmentStatus: 'IN_ATELIER_PRODUCTION',
      gatewayReference: 'FC_PSTK_94820_REC',
      packagingType: 'SIGNATURE_BOX',
      isGift: false,
      atelierCurrentStageIndex: 3, // Pattern Drafting / Cutting
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateSerialNumber: 'FC-HS-2026-000142',
    }
  ] : [],
  activeOrderId: null,
  certificates: false ? [
    {
      serialNumber: 'FC-HS-2026-000142',
      pieceName: 'Haute Soirée Sculptural Silk Gown',
      productName: 'Haute Soirée Sculptural Silk Gown',
      collection: 'Autumn / Winter 2026 Couture',
      collectionName: 'Autumn / Winter 2026 Couture',
      colorwayName: '06 — Benin Malachite Silk',
      atelierLocation: 'Finaluchi Flagship Atelier, Abuja, Nigeria',
      masterTailor: 'Fashion Director Oluchi Irokanulo & Master Artisans',
      leadArtisan: 'Fashion Director Oluchi Irokanulo & Master Artisans',
      registeredOwner: 'Amara Okafor',
      registrationDate: 'September 18, 2026',
      issueDate: 'September 18, 2026',
      editionTotal: 25,
      editionNumber: 8,
      qrCodeDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://finaluchi.com/certificate/FC-HS-2026-000142',
      qrCodeHash: 'e7b99c04f981293a9b1c77de29fbc883',
      verificationUrl: 'https://finaluchi.com/verify/FC-HS-2026-000142',
    }
  ] : [],
  appointments: false ? [
    {
      id: 'apt-sample-01',
      guestName: 'Amara Okafor',
      clientName: 'Amara Okafor',
      guestEmail: 'amara.okafor@client.com',
      clientEmail: 'amara.okafor@client.com',
      guestPhone: '+234 803 555 0192',
      clientPhone: '+234 803 555 0192',
      serviceType: 'ATELIER_FITTING',
      appointmentType: 'IN_PERSON_FITTING',
      locationType: 'ABUJA_STUDIO',
      location: 'Finaluchi Flagship Studio, Abuja, Nigeria',
      assignedArtisan: 'Master Tailor Adebayo',
      date: '2026-09-04',
      timeSlot: '14:00 - 15:30 WAT',
      status: 'CONFIRMED',
      notes: 'Calibrating fit for upcoming December wedding guest gown.',
    }
  ] : [],
  auditLogs: false ? [
    {
      id: 'log-01',
      actorRole: 'SYSTEM_RECONCILIATION',
      actor: 'SYSTEM_RECONCILIATION',
      action: 'PAYMENT_VERIFIED',
      resourceType: 'order',
      resourceId: 'FC-94820',
      details: 'Paystack S2S verified transaction FC_PSTK_94820_REC for ₦408,500.',
      ipAddress: '102.89.41.12',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'log-02',
      actorRole: 'ATELIER_MANAGER',
      actor: 'ATELIER_MANAGER',
      action: 'PRODUCTION_STAGE_ADVANCE',
      resourceType: 'order',
      resourceId: 'FC-94820',
      details: 'Advanced to Stage 04: Precision Cutting & Grain Alignment.',
      ipAddress: '102.89.41.12',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    }
  ] : [],

  createOrder: (shippingAddress, packagingType, isGift, giftMessage) => {
    const cart = useCartStore.getState();
    const orderNumber = generateOrderNumber();
    const guestAccessToken = `fc_gst_${orderNumber.toLowerCase()}_${Math.random().toString(36).substr(2, 10)}`;
    const serial = generateCertificateSerialNumber('FC-HS');

    const itemSnapshots: OrderItemSnapshot[] = cart.items.map((item) => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: item.productId,
      productNameSnapshot: item.product.name,
      colorNameSnapshot: `${item.colorway.color.code} — ${item.colorway.color.name}`,
      sizeSnapshot: item.isMadeToMeasure ? 'Made to Measure (Atelier Fit)' : item.size,
      skuSnapshot: `${item.colorway.sku}-${item.size}`,
      unitPriceKobo: item.unitPriceKobo,
      quantity: item.quantity,
      heroImageUrl: item.colorway.heroImageUrl,
    }));

    const subtotalKobo = cart.getSubtotalKobo();
    const shippingKobo = cart.getShippingKobo(shippingAddress.country);
    const taxKobo = cart.getTaxKobo(shippingAddress.country);
    const totalKobo = subtotalKobo + cart.getPackagingKobo() + shippingKobo + taxKobo;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      guestAccessToken,
      guestTokenHash: `sha256_${guestAccessToken}`,
      customerFullName: shippingAddress.fullName,
      customerEmail: shippingAddress.email,
      customerPhone: shippingAddress.phone,
      shippingAddress,
      items: itemSnapshots,
      subtotalKobo,
      shippingKobo,
      taxKobo,
      discountKobo: 0,
      totalKobo,
      currency: 'NGN',
      paymentStatus: 'PAYMENT_PENDING',
      orderStatus: 'PENDING_PAYMENT',
      fulfillmentStatus: 'UNFULFILLED',
      packagingType,
      isGift,
      giftMessage,
      atelierCurrentStageIndex: 0,
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: 'To be confirmed',
      certificateSerialNumber: serial,
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      activeOrderId: newOrder.id,
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          actorRole: 'GUEST_CHECKOUT',
          actor: 'GUEST_CHECKOUT',
          action: 'ORDER_INITIALIZED',
          resourceType: 'order',
          resourceId: newOrder.orderNumber,
          details: `Order intent initialized for total of ₦${(totalKobo / 100).toLocaleString()}.`,
          ipAddress: '102.89.41.12',
          timestamp: new Date().toISOString(),
        },
        ...state.auditLogs,
      ]
    }));

    return newOrder;
  },

  processPaystackSuccess: (orderId, gatewayReference) => {
    let targetOrder: Order | undefined;

    set((state) => {
      const updatedOrders = state.orders.map((ord) => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          targetOrder = {
            ...ord,
            paymentStatus: 'PAYMENT_SUCCESSFUL',
            orderStatus: 'CONFIRMED',
            fulfillmentStatus: 'ALLOCATED',
            gatewayReference,
          };
          return targetOrder;
        }
        return ord;
      });

      if (!targetOrder) return state;

      const serial = targetOrder.certificateSerialNumber || generateCertificateSerialNumber();

      // Create Digital Certificate of Authenticity
      const newCert: DigitalCertificate = {
        serialNumber: serial,
        pieceName: targetOrder.items[0]?.productNameSnapshot || 'Finaluchi Haute Couture Piece',
        productName: targetOrder.items[0]?.productNameSnapshot || 'Finaluchi Haute Couture Piece',
        collection: 'Finaluchi Couture',
        collectionName: 'Finaluchi Couture',
        colorwayName: targetOrder.items[0]?.colorNameSnapshot || 'Noir Onyx Silk',
        atelierLocation: 'Abuja, Nigeria',
        masterTailor: 'Finaluchi Couture',
        leadArtisan: 'Finaluchi Couture',
        registeredOwner: targetOrder.customerFullName,
        registrationDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        editionTotal: 1,
        editionNumber: 1,
        qrCodeDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://finaluchi.com/certificate/${serial}`,
        qrCodeHash: `sha256_${serial}_${Date.now()}`,
        verificationUrl: `https://finaluchi.com/verify/${serial}`,
      };

      const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        actorRole: 'PAYSTACK_S2S_VERIFIER',
        actor: 'PAYSTACK_S2S_VERIFIER',
        action: 'PAYMENT_CAPTURED_AND_ALLOCATED',
        resourceType: 'order',
        resourceId: targetOrder.orderNumber,
        details: `Verified Paystack ref ${gatewayReference} for ₦${(targetOrder.totalKobo / 100).toLocaleString()}. Inventory converted.`,
        ipAddress: '102.89.41.12',
        timestamp: new Date().toISOString(),
      };

      return {
        orders: updatedOrders,
        certificates: [newCert, ...state.certificates],
        auditLogs: [newLog, ...state.auditLogs],
      };
    });

    useCartStore.getState().clearCart();
    return targetOrder || get().orders[0];
  },

  updateAtelierStage: (orderId, stageIndex) => {
    get().advanceAtelierStage(orderId, stageIndex);
  },

  advanceAtelierStage: (orderId, stageIndex) => {
    set((state) => {
      const updated = state.orders.map((ord) => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          return { ...ord, atelierCurrentStageIndex: stageIndex };
        }
        return ord;
      });

      const target = state.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
      const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        actorRole: 'ATELIER_MANAGER',
        actor: 'ATELIER_MANAGER',
        action: 'ATELIER_STAGE_UPDATED',
        resourceType: 'order',
        resourceId: target ? target.orderNumber : orderId,
        details: `Updated atelier creation stage to ${stageIndex + 1}/7.`,
        ipAddress: '102.89.41.12',
        timestamp: new Date().toISOString(),
      };

      return { orders: updated, auditLogs: [newLog, ...state.auditLogs] };
    });
  },

  updateFulfillmentStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((ord) =>
        ord.id === orderId || ord.orderNumber === orderId
          ? { ...ord, fulfillmentStatus: status }
          : ord
      ),
    }));
  },

  bookAppointment: (data) => {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      status: 'PENDING',
      assignedArtisan: 'To be confirmed',
    };
    set((state) => ({
      appointments: [newApt, ...state.appointments],
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          actorRole: 'CONCIERGE_CLIENTELING',
          actor: 'CONCIERGE_CLIENTELING',
          action: 'APPOINTMENT_SCHEDULED',
          resourceType: 'appointment',
          resourceId: newApt.id,
          details: `Booked ${newApt.appointmentType || newApt.serviceType} for ${newApt.clientName || newApt.guestName}.`,
          ipAddress: '102.89.41.12',
          timestamp: new Date().toISOString(),
        },
        ...state.auditLogs,
      ]
    }));
    return newApt;
  },

  getOrderByNumber: (orderNumber) => {
    return get().orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
  },

  getOrderByToken: (token) => {
    return get().orders.find((o) => o.guestAccessToken === token);
  },

  getCertificateBySerial: (serial) => {
    return get().certificates.find((c) => c.serialNumber.toUpperCase() === serial.toUpperCase());
  },
    }),
    {
      name: 'finaluchi_orders_storage',
      partialize: (state) => ({
        orders: state.orders,
        certificates: state.certificates,
        appointments: state.appointments,
        auditLogs: state.auditLogs,
      }),
    }
  )
);

