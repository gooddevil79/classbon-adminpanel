import { useLoaderData } from "react-router";
import CouresItem from "./CourseItem";

const CoursesList = ({ courses }) => {
	return (
		<>
			<div className="row">
				{courses.map(course => (
					<div className="col-12 col-md-6 col-lg-4" key={course.id}>
						<CouresItem {...course} />
					</div>
				))}
			</div>
		</>
	);
};
export default CoursesList;
