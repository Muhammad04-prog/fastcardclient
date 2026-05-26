import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../i18n'
import App from './App.tsx'
import { Toaster } from "sileo";
import { Provider } from "react-redux";
import { reduxStore } from "./store/reduxStore";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <Toaster position="top-right" />
      <App />
    </Provider>
  </StrictMode>,
)