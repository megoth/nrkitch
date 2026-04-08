import styles from "./styles.module.css";
import { clsx } from "clsx";
import Account from "~/components/account";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <main className={clsx("container", styles.mainContainer)}>
        <Outlet />
      </main>
      <footer className={clsx("container", styles.footerContainer)}>
        <div className="container">
          <Account />
        </div>
      </footer>
    </>
  );
}
