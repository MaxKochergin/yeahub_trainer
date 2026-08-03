import { Button } from "@/shared/ui/button";
import styles from "./StateMessage.module.scss";

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function StateMessage({
  message,
  actionLabel,
  onAction,
  className,
}: Props) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <Button type="button" variant="ghost" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
