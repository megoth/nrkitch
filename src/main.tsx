import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import SocketProvider from "./hooks/socket/provider.tsx";
import AccountProvider from "./hooks/account/provider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AccountProvider>
            <SocketProvider>
                <App/>
            </SocketProvider>
        </AccountProvider>
    </StrictMode>,
)
