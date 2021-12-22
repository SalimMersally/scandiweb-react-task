import React from "react";
import { useParams } from "react-router-dom";

function withRouter(Child) {
  return (props) => {
    const params = useParams();
    return <Child {...props} params={params} />;
  };
}

export default withRouter;
