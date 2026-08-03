import styles from "./ProgressBar.module.scss";

type Props = {
  value: number;
  max: number;
  className?: string;
};

export const ProgressBar = ({ value, max, className }: Props) => {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={styles.fill} style={{ width: `${percent}%` }}></div>
    </div>
  );
};
