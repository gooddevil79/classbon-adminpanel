import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import router from "./core/routes";
import "./core/i18n";
import { useAppCtx } from "./context/appCtx";

import "react-toastify/dist/ReactToastify.css";

function App() {
	const { theme } = useAppCtx();
	useEffect(() => {
		const head = document.head;
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = `/css/${theme}.css`;
		head.appendChild(link);

		return () => {
			head.removeChild(link);
		};
	}, [theme]);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer rtl bodyStyle={{ fontFamily: "iranyekan" }} />
		</>
	);
}

export default App;
