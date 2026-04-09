import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SocketProvider from "~/hooks/socket/provider.tsx";
import AccountProvider from "~/hooks/account/provider.tsx";
import "bulma/css/bulma.min.css";
import "./styles.css";
import { RouterProvider } from "react-router";
import routes from "~/routes.ts";
import DataProvider from "~/hooks/data/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <AccountProvider>
        <DataProvider>
          <RouterProvider router={routes} />
        </DataProvider>
      </AccountProvider>
    </SocketProvider>
  </StrictMode>,
);
