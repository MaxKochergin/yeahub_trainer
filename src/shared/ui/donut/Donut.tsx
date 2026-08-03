import styles from "./Donut.module.scss";

type Props = {
  percent: number;
  label?: string;
  className?: string;
};

const SIZE = 240;
const STROKE = 15.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const Donut = ({ percent, label = "Изучено", className }: Props) => {
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`${clamped}% ${label}`}
    >
      <svg
        className={styles.svg}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          className={styles.track}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
        />
        <circle
          className={styles.progress}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.percent}>{clamped}%</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};
