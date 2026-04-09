import useAccount from "~/hooks/account";
import { useMemo } from "react";

interface Props {
  channelId: string;
  children: string;
}

export default function SubscribeButton({ channelId, children }: Props) {
  const { hasSubscription, subscribe, unsubscribe } = useAccount();

  const isDenied = useMemo(
    () => "Notification" in window && Notification.permission === "denied",
    [],
  );

  if (hasSubscription(channelId)) {
    return (
      <>
        {isDenied ? (
          <div className="notification is-danger is-light">
            Du har ikke gitt oss tillatelse til å sende deg beskjeder.
          </div>
        ) : (
          <div className="notification is-success">
            Vi gir beskjed når chatten starter
          </div>
        )}
        <button
          className="button is-primary"
          onClick={() => unsubscribe(channelId)}
        >
          Ikke gi meg beskjed når chatten starter
        </button>
      </>
    );
  }
  return (
    <button className="button is-primary" onClick={() => subscribe(channelId)}>
      {children}
    </button>
  );
}
