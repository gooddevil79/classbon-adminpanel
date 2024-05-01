import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../components/layout/auth";
import Login, { loginAction } from "../components/auth/Login";
import Register, { registerAction } from "../components/auth/Register";

import { paths } from "./paths";
import MainLayout from "../components/layout/main";
import CoursesPage, { coursesLoader } from "../pages/CoursesPage";
import CourseDetailsPage, {
	courseDetailsLoader,
} from "../pages/CourseDetailsPage";
import CourseCategoriesPage, {
	courseCategoriesLoader,
} from "../pages/CourseCategoriesPage";
import { CategoryProvider } from "../context/categoryCtx";
import NotFound from "../pages/notFound";
import ErrorExceptions from "../pages/ErrorExceptions";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorExceptions />,
		children: [
			{
				element: <CoursesPage />,
				index: true,
				loader: coursesLoader,
			},
			{
				element: (
					<CategoryProvider>
						<CourseCategoriesPage />
					</CategoryProvider>
				),
				path: paths.course.categories,
				loader: courseCategoriesLoader,
			},
			{
				element: <CourseDetailsPage />,
				path: paths.course.details,
				loader: courseDetailsLoader,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				element: <Login />,
				path: paths.auth.login,
				action: loginAction,
				errorElement: <Login />,
			},
			{
				element: <Register />,
				path: paths.auth.register,
				action: registerAction,
				errorElement: <Register />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default router;
