import { type HTMLAttributes, useCallback } from "react";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import useSocket from "~/hooks/socket";
import useAccount from "~/hooks/account";
import type { ChatSocketMessage } from "~/types.ts";

interface Props extends HTMLAttributes<HTMLLabelElement> {
  channelId: string;
}

interface FormValues {
  message: string;
}

export default function ChatForm({ channelId, className, ...props }: Props) {
  const { username } = useAccount();
  const { emit } = useSocket();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      emit("message", {
        channelId,
        author: username,
        body: data.message,
      } satisfies ChatSocketMessage);
      setValue("message", "");
    },
    [channelId, username, emit, setValue],
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
            className={clsx("input", { "is-danger": errors.message })}
            type="text"
            placeholder={
              errors.message ? "I can't allow that Dave" : "Write something fun"
            }
            {...register("message", {
              required: true,
              minLength: 1,
            })}
          />
        </div>
        <div className="control">
          <button className="button is-primary">Send</button>
        </div>
      </label>
    </form>
  );
}
