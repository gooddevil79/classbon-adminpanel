import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import api from "../../../core/api";
import { useCategoryContext } from "../../../context/categoryCtx";
import { useEffect } from "react";

const AddOrUpdateCategory = ({ setShow }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const { category, setCategory } = useCategoryContext();

	useEffect(() => {
		if (category) {
			setValue("id", category?.id);
			setValue("name", category?.name);
		}
	}, [category]);

	const handleClose = () => {
		setShow(false);
		setCategory(null);
	};
	const onSubmit = data => {
		const response = api.post(`/CourseCategory/`, data);
		setShow(false);
		toast.promise(
			response,
			{
				pending: "در حال ذخیره اطلاعات ...",
				success: {
					render() {
						const url = new URL(window.location.href);
						navigate(url.pathname + url.search);
						return "عملیات با موفقیت انجام شد";
					},
				},
				error: {
					render({ data }) {
						if (data.response.status === 400) {
							return t("categoryList." + data.response.data.code);
						} else {
							return "خطا در اجرای عملیات";
						}
					},
				},
			},
			{
				position: "bottom-left",
			}
		);
	};

	return (
		<div className="card">
			<div className="card-body">
				<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="form-label">نام</label>
						<input
							className={`form-control form-control-lg ${
								errors.name && "is-invalid"
							}`}
							{...register("name", {
								required: true,
							})}
						/>
						{errors.name && errors.name.type === "required" && (
							<p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
						)}
					</div>
					<div className="text-start mt-3">
						<button
							type="button"
							className="btn btn-lg btn-secondary ms-2"
							onClick={handleClose}
						>
							بستن
						</button>
						<button type="submit" className="btn btn-lg btn-primary">
							ثبت تغییرات
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddOrUpdateCategory;
