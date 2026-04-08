import { createBrowserRouter } from "react-router";
import Layout from "~/components/layout";
import Frontpage from "~/components/frontpage";
import Channel from "~/components/channel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Frontpage },
      { path: ":channelId", Component: Channel },
    ],
  },
]);

export default router;
