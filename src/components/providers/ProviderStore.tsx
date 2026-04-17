"use client";
import { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { createStore, AppStore, preloadedState } from "@/store/store";
export type ProviderStoreProps = {
  children: ReactNode;
  preloadedState: preloadedState;
};
export default function ProviderStore({
  children,
  preloadedState,
}: ProviderStoreProps) {
  const store: AppStore = useMemo(() => {
    return createStore(preloadedState);
  }, [preloadedState]);
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  );
}