import styles from "./Tag.module.scss";

type Props = {
  selected?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

export const Tag = ({
  selected,
  className,
  children,
  type = "button",
  ...rest
}: Props) => {
  return (
    <button
      className={[styles.root, selected && styles.selected, className]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
