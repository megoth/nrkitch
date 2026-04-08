import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ErrorMessage({ children }: Props) {
  return (
    <article className="message is-danger">
      <div className="message-body">{children}</div>
    </article>
  );
}
