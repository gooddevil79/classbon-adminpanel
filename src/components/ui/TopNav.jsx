import { useTranslation } from "react-i18next";
import { useAppCtx } from "../../context/appCtx";
import ChangeLanguage from "./ChangeLanguage";
import ChangeTheme from "./ChangeTheme";
import { useNavigate } from "react-router-dom";

const TopNav = function () {
	const navigate = useNavigate();
	const { toggleSidebar } = useAppCtx();
	const { language } = useAppCtx();
	const { t } = useTranslation();
	const handleLogout = function () {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<nav className="navbar">
			<a className="sidebar-toggle" onClick={toggleSidebar}>
				<i className="hamburger align-self-center"></i>
			</a>
			<div className="d-flex align-items-center gap-3  me-3">
				<ChangeLanguage />
				<ChangeTheme />
			</div>
			<div className={language === "fa" ? "me-auto" : "ms-auto"}>
				<button
					type="button"
					class="btn btn-outline-danger"
					onClick={handleLogout}
				>
					{t("logout")}
				</button>
			</div>
		</nav>
	);
};

export default TopNav;
