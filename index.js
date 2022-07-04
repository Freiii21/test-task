// Список курсов
let courses = [
	{ name: "Courses in England", prices: [0, 100] },
	{ name: "Courses in Germany", prices: [500, null] },
	{ name: "Courses in Italy", prices: [100, 200] },
	{ name: "Courses in Russia", prices: [null, 400] },
	{ name: "Courses in China", prices: [50, 250] },
	{ name: "Courses in USA", prices: [200, null] },
	{ name: "Courses in Kazakhstan", prices: [56, 324] },
	{ name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

// Поиск курсов, соответствующих фильтру пользователя
const searchForSuitableCourses = (priceRange) => {

	// Фильтр не задан - отобразить все курсы
	if (priceRange[0] === null && priceRange[1] === null){
		console.log(courses);
		return;
	}

	// Задан только начальный фильтр
	if (priceRange[0] !== null && priceRange[1] === null){
		console.log(courses.filter(course => {

			if (course.prices[0] === null && course.prices[1] === null){
				return;
			}

			if (course.prices[0] !== null && course.prices[1] === null){
				return course.prices[0] >= priceRange[0]
			}

			if (course.prices[0] === null && course.prices[1] !== null){
				return course.prices[1] >= priceRange[0]
			}

			return course.prices[0] >= priceRange[0] || course.prices[1] >= priceRange[0]
		}))
		return;
	}

	// Задан только конечный фильтр
	if (priceRange[0] === null && priceRange[1] !== null){
		console.log(courses.filter(course => {
			if (course.prices[0] === null && course.prices[1] === null){
				return;
			}

			if (course.prices[0] !== null && course.prices[1] === null){
				return course.prices[0] <= priceRange[1]
			}

			if (course.prices[0] === null && course.prices[1] !== null){
				return course.prices[1] <= priceRange[1]
			}

			return course.prices[1] <= priceRange[1] || (course.prices[0] <= priceRange[1] && course.prices[1] >= priceRange[1])
		}))
		return;
	}

	// Заданы начальный и конечный фильтры
	console.log(courses.filter(course => {
		if (course.prices[0] === null && course.prices[1] === null){
			return;
		}

		if (course.prices[0] !== null && course.prices[1] === null){
			return course.prices[0] >= priceRange[0] && course.prices[0] <= priceRange[1]
		}

		if (course.prices[0] === null && course.prices[1] !== null){
			return course.prices[1] >= priceRange[0] && course.prices[1] <= priceRange[1]
		}

		return (course.prices[0] >= priceRange[0] && course.prices[0] <= priceRange[1]) || (course.prices[1] >= priceRange[0] && course.prices[1] <= priceRange[1])
	}))
	return;
}

searchForSuitableCourses(requiredRange1);
searchForSuitableCourses(requiredRange2);
searchForSuitableCourses(requiredRange3);

const sortCourses = (ascending) => {
	return function (a, b) {
		if (a.prices[0] === b.prices[0]) {

			if (ascending){
				return (a.prices[1] != null ? a.prices[1] : Infinity) - (b.prices[1] != null ? b.prices[1] : Infinity)
			}

			return (b.prices[1] != null ? b.prices[1] : Infinity) - (a.prices[1] != null ? a.prices[1] : Infinity)
		}

		if (ascending) {
			return (a.prices[0] != null ? a.prices[0] : Infinity) - (b.prices[0] != null ? b.prices[0] : Infinity)
		}

		return (b.prices[0] != null ? b.prices[0] : Infinity) - (a.prices[0] != null ? a.prices[0] : Infinity)
	}
};

// Курсы отсортированны по увеличению цены
const sortedCoursesFromStartToEnd = [...courses];
console.log(sortedCoursesFromStartToEnd.sort(sortCourses(true)))

// Курсы отсортированны по уменьшению цены
const sortedCoursesFromEndToStart = [...courses];
console.log(sortedCoursesFromEndToStart.sort(sortCourses(false)))