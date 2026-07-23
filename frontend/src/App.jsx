import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./contexts/AuthContextProvider.jsx";
import { InterviewContextProvider } from "./contexts/InterviewContextProvider.jsx";
function App() {
  return (
    <AuthProvider>
      <InterviewContextProvider>
        <RouterProvider router={router} />;
      </InterviewContextProvider>
    </AuthProvider>
  );
}

export default App;
