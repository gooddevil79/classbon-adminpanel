import { Suspense, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import Categories from "../components/courses/categories/Categories";
import api from "../core/api";
import Modal from "../components/ui/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddOrUpdateCategory from "../components/courses/categories/AddOrUpdateCategory";
import { useCategoryContext } from "../context/categoryCtx";

const CourseCategories = function () {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [ShowAddOrUpdateModal, setShowAddOrUpdateModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { category, setCategory } = useCategoryContext();

	const deleteCategory = categoryId => {
		setSelectedItem(categoryId);
		setShowDeleteModal(true);
	};

	const handleDelete = async () => {
		setShowDeleteModal(false);
		const res = api.delete(`/CourseCategory/${selectedItem}`);
		toast.promise(
			res,
			{
				pending: "در حال حذف...",
				success: {
					render() {
						if (category) {
							setCategory(null);
						}
						const url = new URL(window.location.href);
						navigate(url.pathname + url.search);
						return "عمیلات با موفقیت انجام شد";
					},
				},
				error: {
					render({ data }) {
						if (data.status === 400) {
							return t("errors." + data.code);
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

	const data = useLoaderData();

	return (
		<>
			<div className="row">
				<div className="col-12">
					<div className="d-flex align-items-center justify-content-between mb-5">
						<h3 className="mb-0">دسته بندی دوره ها</h3>
						<a
							href="#"
							className="btn btn-primary fw-bolder  mt-n1"
							onClick={() => setShowAddOrUpdateModal(true)}
						>
							<i className="fas fa-plus ms-2"></i>افزودن دسته جدید
						</a>
					</div>
					{(ShowAddOrUpdateModal || category) && (
						<AddOrUpdateCategory setShow={setShowAddOrUpdateModal} />
					)}
					<Suspense fallback={<p>در حال بارگذاری اطلاعات...</p>}>
						<Await resolve={data.categories}>
							{loadedCategories => (
								<Categories
									categories={loadedCategories}
									deleteCategory={deleteCategory}
								/>
							)}
						</Await>
					</Suspense>
				</div>
			</div>
			<Modal
				title="حذف"
				body="آیا از حذف این دسته اطمینان دارید؟"
				isOpen={showDeleteModal}
				close={setShowDeleteModal}
			>
				<button
					type="button"
					className="btn btn-secondary fw-bolder"
					onClick={() => setShowDeleteModal(false)}
				>
					انصراف
				</button>
				<button
					type="button"
					className="btn btn-primary fw-bolder"
					onClick={handleDelete}
				>
					حذف
				</button>
			</Modal>
		</>
	);
};

const fetchData = async function (request) {
	const page = new URL(request.url).searchParams.get("page") || 1;
	const pageSize = 10;

	const res = await api.get("/CourseCategory/sieve", {
		params: { page, pageSize },
	});
	return res.data;
};

export const courseCategoriesLoader = async function ({ request }) {
	return defer({
		categories: fetchData(request),
	});
};

export default CourseCategories;
