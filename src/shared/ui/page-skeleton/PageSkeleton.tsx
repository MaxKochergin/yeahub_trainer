import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./PageSkeleton.module.scss";

export function PageSkeleton() {
  return (
    <div className={styles.root} aria-busy="true" aria-live="polite">
      <Skeleton height={36} width="40%" />
      <Skeleton height={180} width="100%" />
      <div className={styles.row}>
        <Skeleton height={120} width="100%" className={styles.half} />
        <Skeleton height={120} width="100%" className={styles.half} />
      </div>
    </div>
  );
}
