import type { Program } from "~/types.ts";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  program: Program;
  children?: ReactNode;
}

export default function ProgramMedia({ program, children }: Props) {
  return (
    <div className={styles.container}>
      <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />
      <div className={styles.extra}>{children}</div>
    </div>
  );
}
