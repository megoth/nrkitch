import useData from "~/hooks/data";
import ProgramMedia from "~/components/program-media";
import styles from "./styles.module.css";

export default function ProgramList() {
  const { getPrograms } = useData();
  const program = getPrograms();
  return (
    <ul className={styles.list}>
      {program.map((program) => (
        <li key={program.id}>
          <ProgramMedia program={program} />
        </li>
      ))}
    </ul>
  );
}