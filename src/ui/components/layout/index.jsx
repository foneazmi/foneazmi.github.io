// import { Layout1 } from "./layout-1";
import { Layout2 } from "./layout-2";
// import { DefaultLayout } from "./layout-default";

export const Layout = (props) => {
  return <Layout2 {...props} />;
  // const { mode } = props;
  // switch (mode) {
  //   case "layout-1":
  //     return <Layout1 {...props} />;
  //   case "layout-2":
  //     return <Layout2 {...props} />;
  //   default:
  //     return <DefaultLayout {...props} />;
  // }
};
