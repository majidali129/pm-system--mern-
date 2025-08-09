import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeContextProvider } from "./components/theme/theme-context.tsx";
import { toast, Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/error-fallback.tsx";
import type { CustomError } from "./types/index.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => (error as CustomError).statusCode >= 500,
      retry: (failureCount, error) => {
        const customError = error as CustomError;
        // Don't retry for 4xx errors
        if (customError.statusCode >= 400 && customError.statusCode < 500) {
          return false;
        }
        // Retry others up to 3 times
        return failureCount < 3;
      },
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
    mutations: {
      throwOnError: (error) => (error as CustomError).statusCode >= 500,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const customError = error as CustomError;
      if (customError.statusCode >= 500) {
        toast.error(customError.message || "Server error occurred");
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <App />
              <Toaster position="top-right" expand richColors />
            </ErrorBoundary>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
