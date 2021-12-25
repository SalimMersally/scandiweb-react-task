// This component was needed due to the change in react-router-dom
// in order to get the params in the url we used withRouter() function in v5
// but they removed it in v6 assumming all people use functional component and
// they will use the equivalent prop useParams
// since props cannot be used in class component, this component was needed to replace
// the old function

import React from "react";
import { useParams } from "react-router-dom";

function withRouter(Child) {
  return (props) => {
    const params = useParams();
    return <Child {...props} params={params} />;
  };
}

export default withRouter;
