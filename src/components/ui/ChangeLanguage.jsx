import usaFlag from "src/assets/images/usa.png";
import IrFlag from "src/assets/images/ir.png";
import { useEffect, useRef, useState } from "react";
import { useAppCtx } from "src/context/appCtx";

const ChangeLanguage = function () {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { language, changeAppLanguage } = useAppCtx();

	const componentDidUpdate = function () {
		const clickedOutside = e => {
			if (
				open &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", clickedOutside);
		return () => {
			document.removeEventListener("mousedown", clickedOutside);
		};
	};

	useEffect(componentDidUpdate, [open]);

	return (
		<>
			<div className="dropdown">
				<a
					className="nav-flag dropdown-toggle"
					onClick={() => setOpen(ps => !ps)}
				>
					<img src={language === "fa" ? IrFlag : usaFlag} alt="en" />
				</a>
				<div
					className={`dropdown-menu dropdown-menu-end align-right${
						open && " show"
					}`}
					ref={dropdownRef}
				>
					<a
						className="dropdown-item fw-bolder d-flex align-items-center gap-2"
						style={{ textAlign: "right" }}
						onClick={() => {
							setOpen(false);
							changeAppLanguage("fa");
						}}
					>
						<img src={IrFlag} alt="fa" width="20" />
						<span className="align-middle">فارسی</span>
					</a>
					<a
						className="dropdown-item fw-bolder d-flex align-items-center gap-2"
						style={{ textAlign: "right" }}
						onClick={() => {
							setOpen(false);
							changeAppLanguage("en");
						}}
					>
						<img src={usaFlag} alt="fa" width="20" />
						<span className="align-middle">English</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default ChangeLanguage;
