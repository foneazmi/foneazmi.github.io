import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./stores";
import { RouteApp } from "./routes";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RouteApp />
        {/* <div data-theme={theme}>
          <Router>
            <Loader />
            <Sidebar content={<Routes />} />
          </Router>
        </div> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
