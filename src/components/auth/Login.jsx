import {
	Link,
	redirect,
	useNavigation,
	useRouteError,
	useSubmit,
} from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import api from "../../core/api";

const Login = () => {
	const { t } = useTranslation();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const submitForm = useSubmit();
	const navigation = useNavigation();
	const isSubmiting = navigation.state !== "idle";
	const routeErrors = useRouteError();

	const onSubmit = data => {
		submitForm(data, { method: "post" });
	};

	return (
		<>
			<div className="text-center mt-4">
				<img src={logo} alt="logo" style={{ height: 100 }} />
				<h1 className="h2">{t("login.title")}</h1>
				<p className="lead">{t("login.introMessage")}</p>
				<p className="lead">
					{t("login.areNotRegistered")}
					<Link to="/register" className="me-2">
						{t("login.register")}
					</Link>
				</p>
			</div>

			<div className="card">
				<div className="card-body">
					<div className="m-sm-4">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-3">
								<label className="form-label">{t("login.mobile")}</label>
								<input
									{...register("mobile", {
										required: t("validation.mobileRequired"),
										minLength: 11,
										maxLength: 11,
									})}
									className={`form-control form-control-lg ${
										errors.mobile && "is-invalid"
									}`}
								/>
								{errors.mobile && errors.mobile?.type === "required" && (
									<p className="text-danger small fw-bolder mt-1">
										{errors.mobile.message}
									</p>
								)}
								{errors.mobile &&
									(errors.mobile?.type === "maxLength" ||
										errors.mobile?.type === "minLength") && (
										<p className="text-danger small fw-bolder mt-1">
											{t("validation.mobileLength")}
										</p>
									)}
							</div>
							<div className="mb-3">
								<label className="form-label">{t("login.password")}</label>
								<input
									{...register("password", {
										required: t("validation.passwordRequired"),
									})}
									className={`form-control form-control-lg ${
										errors.password && "is-invalid"
									}`}
									type="password"
								/>
								{errors.password && errors.password?.type === "required" && (
									<p className="text-danger small fw-bolder mt-1">
										{errors.password?.message}
									</p>
								)}
							</div>
							<div className="text-center mt-3">
								<button
									type="submit"
									disabled={isSubmiting}
									className="btn btn-lg btn-primary"
								>
									{isSubmiting ? t("login.signingin") : t("login.signin")}
								</button>
							</div>
						</form>
						{routeErrors && (
							<div className="alert alert-danger text-danger p-2 mt-3">
								{routeErrors.response?.data.map(err => {
									return <p className="mb-0">{t(`validation.${err.code}`)}</p>;
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const loginAction = async function ({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const res = await api.post("/Users/login", data);
	if (res.status === 200) {
		localStorage.setItem("token", res?.data.token);
		return redirect("/");
	}
};

export default Login;
