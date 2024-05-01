import { useForm } from "react-hook-form";
import {
	Link,
	useActionData,
	useNavigate,
	useNavigation,
	useRouteError,
	useSubmit,
} from "react-router-dom";
import logo from "./../../assets/images/logo.svg";

import api from "../../core/api";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const success = useActionData();
	const actionErrors = useRouteError();
	const submitForm = useSubmit();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { t } = useTranslation();
	const submitting = navigation.state !== "idle";

	const onSubmit = data => {
		const { confirmPassword, ...userData } = data;
		submitForm(userData, { method: "post" });
	};

	useEffect(() => {
		const loginNav = setTimeout(() => {
			if (success) navigate("login");
		}, 2 * 1000);
		return clearTimeout(loginNav);
	}, [success]);

	return (
		<>
			<div className="text-center mt-4">
				<img src={logo} alt="logo" style={{ height: 100 }} />

				<h1 className="h2">{t("register.title")}</h1>
				<p className="lead">{t("register.introMessage")}</p>
				<p className="lead">
					{t("register.alreadyRegistered")}
					<Link to="/login" className="me-2">
						{t("register.signin")}
					</Link>
				</p>
			</div>

			<div className="card">
				<div className="card-body">
					<div className="m-sm-4">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-3">
								<label className="form-label">{t("register.mobile")}</label>
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
								<label className="form-label">{t("register.password")}</label>
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
							<div className="mb-3">
								<label className="form-label">
									{t("register.repeatPassword")}
								</label>
								<input
									{...register("confirmPassword", {
										required: t("validation.repeatPasswordRequired"),
										validate: value => {
											if (watch("password") !== value) {
												return "عدم تطابق با رمز عبور وارد شده";
											}
										},
									})}
									className={`form-control form-control-lg ${
										errors.confirmPassword && "is-invalid"
									}`}
									type="password"
								/>
								{errors.confirmPassword &&
									errors.confirmPassword?.type === "validate" && (
										<p className="text-danger small fw-bolder mt-1">
											{errors.confirmPassword.message}
										</p>
									)}
							</div>
							<div className="text-center mt-3">
								<button
									type="submit"
									disabled={submitting}
									className="btn btn-lg btn-primary"
								>
									{t("register.register")}
								</button>
							</div>
						</form>
						{success && (
							<p className="alert alert-success text-success p-2 mt-3">
								{t("register.successOperation")}
							</p>
						)}
						{actionErrors && (
							<div className="alert alert-danger text-danger p-2 mt-3">
								<div className="alert alert-danger text-danger p-2 mt-3">
									{actionErrors.response?.data.map(err => {
										return (
											<p className="mb-0">{t(`validation.${err.code}`)}</p>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const registerAction = async function ({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const res = await api.post("/Users", data);
	return res.status === 200;
};

export default Register;
