import styles from "./Button.module.scss";

type Props = {
  variant?: "primary" | "ghost";
} & React.ComponentPropsWithoutRef<"button">;

export const Button = ({
  variant = "primary",
  type = "button",
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={[styles.root, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
