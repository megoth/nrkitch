import type { Program } from "~/types.ts";

interface Props {
  program: Program
}

export default function ProgramMedia({ program}: Props) {
  return <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />;
  
}