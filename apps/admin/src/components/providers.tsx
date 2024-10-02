"use client";

import { store } from "@elearning/global-store";
import { UIProvider } from "@elearning/ui";
import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  Tooltip,
} from "chart.js";
import { Provider } from "react-redux";
import { NavigationEvents } from "./navigation-events";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  PieController,
  DoughnutController,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

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
