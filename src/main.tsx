import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/index";
import { persistor } from "../src/store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster
            gutter={0}
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                padding: "0",
                background: "white",
                color: "#fff",
              },
            }}
          />
          </BrowserRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
)
