import type { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import Account from "~/components/account";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <main className={clsx("container", styles.mainContainer)}>
        {children}
      </main>
      <footer className={clsx("container", styles.footerContainer)}>
        <Account />
      </footer>
    </>
  );
};

export default Layout;
