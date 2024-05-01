import api from "../core/api";
import CoursesList from "../components/courses/CoursesList";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const CoursesPage = () => {
	const data = useLoaderData();

	return (
		<div className="row">
			<div className="col-12">
				<div className="d-flex align-items-center justify-content-between mb-5">
					<h3 className="mb-0">همه دوره ها</h3>
					<a href="#" className="btn btn-primary fw-bolder  mt-n1">
						<i className="fas fa-plus ms-2"></i>افزودن دوره جدید
					</a>
				</div>
				<Suspense fallback={<p>در حال دریافت اطلاعات...</p>}>
					<Await resolve={data.courses}>
						{loadedCourses => <CoursesList courses={loadedCourses} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
};

const fetchData = async function () {
	const response = await api.get("/Course/list");
	return response.data;
};

export async function coursesLoader() {
	return defer({
		courses: fetchData(),
	});
}

export default CoursesPage;
