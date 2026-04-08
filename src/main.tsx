import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from '~/App.tsx'
import SocketProvider from "~/hooks/socket/provider.tsx";
import AccountProvider from "~/hooks/account/provider.tsx";
import "bulma/css/bulma.min.css"
import Layout from "~/components/layout";
import "./styles.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AccountProvider>
            <SocketProvider>
                <Layout>
                    <App/>
                </Layout>
            </SocketProvider>
        </AccountProvider>
    </StrictMode>,
)
