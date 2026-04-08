import { type HTMLAttributes, useCallback } from "react";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import useSocket from "~/hooks/socket";
import useAccount from "~/hooks/account";
import type { SocketMessage } from "~/types.ts";

interface Props extends HTMLAttributes<HTMLLabelElement> {
  channelId: string;
}

interface FormValues {
  message: string;
}

export default function ChatForm({ channelId, className, ...props }: Props) {
  const { username } = useAccount();
  const { emit } = useSocket();

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      message: "test",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      emit("message", {
        channelId,
        author: username,
        message: data.message,
      } satisfies SocketMessage);
    },
    [channelId, username, emit],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        className={clsx("field has-addons", className)}
        {...props}
        htmlFor="chat-input"
      >
        <div className={clsx("control", styles.inputControl)}>
          <input
            id="chat-input"
            className="input"
            type="text"
            placeholder="Write something fun"
            {...register("message")}
          />
        </div>
        <div className="control">
          <button className="button is-info">Search</button>
        </div>
      </label>
    </form>
  );
}
