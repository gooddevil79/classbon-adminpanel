import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "src/components/ui/Sidebar";
import TopNav from "../ui/TopNav";
import Footer from "../ui/Footer";

const MainLayout = function () {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (!token) {
			navigate("/login", { replace: true });
		}
	}, []);
	return (
		<div className="wrapper" style={{ minHeight: "100dvh" }}>
			<Sidebar />
			<div className="main">
				<TopNav />
				<main className="content">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
