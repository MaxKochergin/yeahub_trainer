import styles from "./Stepper.module.scss";

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

export const Stepper = ({
  value,
  min,
  max,
  onChange,
  disabled,
  className,
}: Props) => {
  const decrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const increment = () => {
    onChange(Math.min(max, value + 1));
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.button}
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Уменьшить"
      >
        −
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Увеличить"
      >
        +
      </button>
    </div>
  );
};
