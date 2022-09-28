import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
//styles
import './index.scss';
//redux
import { Provider } from 'react-redux';
import { store } from "./redux/store";
//components
import App from './App';
//router
import { BrowserRouter } from "react-router-dom";
//firebase
import "./firebase";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
