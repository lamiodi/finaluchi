import { create } from 'zustand';
import { SupportedDisplayCurrency } from '../utils/formatters';

interface CurrencyState {
  displayCurrency: SupportedDisplayCurrency;
  setDisplayCurrency: (curr: SupportedDisplayCurrency) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  displayCurrency: 'NGN',
  setDisplayCurrency: (curr) => set({ displayCurrency: curr }),
}));
