import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { PageSkeleton } from "@/shared/ui/page-skeleton";
import styles from "./PageLayout.module.scss";

export const PageLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
