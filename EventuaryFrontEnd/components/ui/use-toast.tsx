// src/components/ui/use-toast.tsx
import { createContext, useContext } from 'react';

const ToastContext = createContext({
  toast: (message: string) => console.log(message), // Replace with actual toast logic
});

export const useToast = () => {
  return useContext(ToastContext);
};