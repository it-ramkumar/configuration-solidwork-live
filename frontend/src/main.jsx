import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AppRoutes from "./routes/Routes";
import "./App.css";
import { Provider } from 'react-redux';
import { store , persistor } from './redux/store/store';
import { PersistGate } from "redux-persist/integration/react";



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
      <PersistGate loading={null} persistor={persistor}>

    <AppRoutes />
        </PersistGate>

  </StrictMode>,
  </Provider>
)
