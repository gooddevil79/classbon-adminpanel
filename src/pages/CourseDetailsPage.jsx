import { Await, defer, useLoaderData, useNavigation } from "react-router-dom";
import api from "../core/api";
import { Suspense } from "react";
import CourseDetails from "../components/courses/CourseDetails";

const CourseDetailsPage = function () {
	const data = useLoaderData();
	return (
		<>
			<Suspense fallback={<p>در حال دریافت اطلاعات...</p>}>
				<Await resolve={data.course}>
					{loadedCourse => <CourseDetails course={loadedCourse} />}
				</Await>
			</Suspense>
		</>
	);
};

const getCourseDetails = async function (id) {
	const res = await api.get(`/Course/by-id/${id}`);
	return res.data;
};
export const courseDetailsLoader = async function ({ params }) {
	const data = defer({
		course: getCourseDetails(params.id),
	});
	return data;
};

export default CourseDetailsPage;
