import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "chat App",
  description = "this is the chat app called What's Up",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default Title;
