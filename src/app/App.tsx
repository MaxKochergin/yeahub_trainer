import { AppProviders } from "@/app/providers/index";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/AppRouter";

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router}></RouterProvider>
    </AppProviders>
  );
}
