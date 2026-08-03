import styles from "./Skeleton.module.scss";

type Props = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
};

const toSize = (property?: number | string) => {
  return property === undefined
    ? undefined
    : typeof property === "number"
      ? `${property}px`
      : property;
};

export const Skeleton = ({ width, height, borderRadius, className }: Props) => {
  return (
    <div
      style={{
        width: toSize(width),
        height: toSize(height),
        borderRadius: toSize(borderRadius),
      }}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    ></div>
  );
};
