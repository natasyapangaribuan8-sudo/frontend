import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./utils/ProductContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <CartProvider>
            <App />
            <Toaster />
          </CartProvider>
        </ProductProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);