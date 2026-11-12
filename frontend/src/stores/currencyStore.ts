import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SupportedDisplayCurrency, detectDisplayCurrency } from '../utils/formatters';

interface CurrencyState {
  displayCurrency: SupportedDisplayCurrency;
  setDisplayCurrency: (curr: SupportedDisplayCurrency) => void;
}

// First visit: guess from the browser time zone (Lagos → NGN, London → GBP,
// New York → USD …). Once the shopper picks a currency it is remembered.
// Prices are always charged in NGN; this is display-only.
export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      displayCurrency: detectDisplayCurrency(),
      setDisplayCurrency: (curr) => set({ displayCurrency: curr }),
    }),
    { name: 'finaluchi_display_currency' }
  )
);
