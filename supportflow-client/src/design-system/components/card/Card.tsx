import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./card.module.scss";

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card = ({ header, footer, children, className }: CardProps) => (
  <div className={clsx(styles.card, className)}>
    {header && <div className={styles.cardHeader}>{header}</div>}
    <div className={styles.cardBody}>{children}</div>
    {footer && <div className={styles.cardFooter}>{footer}</div>}
  </div>
);

export default Card;
export type { CardProps };
