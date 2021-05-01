import React from "react";
import { Route } from "react-router-dom";
import PostContainer from "./containers/PostContainer";
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostPage";

function App() {
  return (
    <>
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />{" "}
    </>
  );
}

export default App;
