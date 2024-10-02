"use client";

import { store } from "@elearning/global-store";
import { UIProvider } from "@elearning/ui";
import { Provider } from "react-redux";
import { NavigationEvents } from "./navigation-events";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UIProvider>
        <NavigationEvents />
        <div className="h-full dark:bg-zinc-950">{children}</div>
      </UIProvider>
    </Provider>
  );
}

// export default dynamic(() => Promise.resolve(Providers), {
//   ssr: false,
// });

export default Providers;
