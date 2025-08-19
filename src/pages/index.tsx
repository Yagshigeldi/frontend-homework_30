import { memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import User from "./user/User";
import Internet from "./internet/Internet";

const MainRouters = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {useRoutes([
          {
            path: "/",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "user",
                element: <User />,
              },
              {
                path: "internet",
                element: <Internet />,
              },
            ],
          },
        ])}
      </Suspense>
    </>
  );
};

export default memo(MainRouters);
