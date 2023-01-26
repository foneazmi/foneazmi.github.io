import { Layout1 } from "./layout-1";
import { DefaultLayout } from "./layout-default";

export const Layout = (props) => {
  const { mode } = props;
  switch (mode) {
    case "layout-1":
      return <Layout1 {...props} />;
    default:
      return <DefaultLayout {...props} />;
  }
};
