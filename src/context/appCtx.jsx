import i18next from "i18next";
import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();
const reducer = (state, action) => {
	switch (action.type) {
		case "app/languageChange":
			return { ...state, language: action.payload };
		case "app/changeTheme":
			return { ...state, theme: action.payload };
		case "app/toggleSidebar":
			return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
		default:
			throw new Error("Wrong type!");
	}
};

const initialState = {
	language: localStorage.getItem("language") || "fa",
	theme: localStorage.getItem("theme") || "light",
	sidebarCollapsed: false,
};

const AppCtxProvider = function ({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const changeAppLanguage = language => {
		dispatch({
			type: "app/languageChange",
			payload: language,
		});
	};

	const changeAppTheme = theme => {
		dispatch({ type: "app/changeTheme", payload: theme });
	};

	const toggleSidebar = theme => {
		dispatch({ type: "app/toggleSidebar" });
	};

	const languageDidUpdate = () => {
		i18next.changeLanguage(state.language);
		localStorage.setItem("language", state.language);
		document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
		document.body.dataset.sidebarPosition =
			state.language === "fa" ? "right" : "left";
	};
	const themeDidUpdate = () => {
		localStorage.setItem("theme", state.theme);
	};

	useEffect(languageDidUpdate, [state.language]);
	useEffect(themeDidUpdate, [state.theme]);

	return (
		<AppContext.Provider
			value={{ ...state, changeAppLanguage, changeAppTheme, toggleSidebar }}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppCtx = function () {
	return useContext(AppContext);
};

export { AppCtxProvider, useAppCtx };
