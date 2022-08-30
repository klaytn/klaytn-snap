import React from 'react'; 
import { createRoot } from 'react-dom/client';
import './style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./style/theme";
 
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
serviceWorker.unregister();