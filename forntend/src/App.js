import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/chat",
      element: <Chat/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;