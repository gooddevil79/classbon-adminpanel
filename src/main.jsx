import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppCtxProvider } from "./context/appCtx.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppCtxProvider>
		<App />
	</AppCtxProvider>
);
