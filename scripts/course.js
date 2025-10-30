// === course.js ===
// Dynamically renders courses and updates total credits

// Array of course objects
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

// DOM elements
const courseContainer = document.getElementById('courseContainer');
const totalCreditsEl = document.getElementById('totalCredits');
const filterButtons = document.querySelectorAll('.filter-btn');

/**
 * Creates a course card element
 * @param {Object} course
 * @returns {HTMLElement}
 */
function createCourseCard(course) {
  const div = document.createElement('div');
  div.className = 'course-card';
  if (course.completed) div.classList.add('completed');

  div.innerHTML = `
    <h3>${course.subject} ${course.number}</h3>
    <p>${course.title}</p>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Status:</strong> ${course.completed ? '✅ Completed' : '⏳ In Progress'}</p>
  `;

  return div;
}

/**
 * Displays courses and updates total credits
 * @param {Array} list
 */
function displayCourses(list) {
  if (!courseContainer || !totalCreditsEl) return;

  courseContainer.innerHTML = '';

  if (list.length === 0) {
    courseContainer.innerHTML = '<p>No courses found for this selection.</p>';
    totalCreditsEl.textContent = '0';
    return;
  }

  list.forEach(course => {
    courseContainer.appendChild(createCourseCard(course));
  });

  // Sum credits using reduce()
  const totalCredits = list.reduce((sum, course) => sum + (Number(course.credits) || 0), 0);
  totalCreditsEl.textContent = totalCredits;
}

/**
 * Handles filter button clicks
 * @param {Event} event
 */
function handleFilter(event) {
  const btn = event.currentTarget;

  // Update visual and accessibility state
  filterButtons.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });

  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  // Filter courses
  const filterId = btn.id;
  if (filterId === 'all') {
    displayCourses(courses);
  } else {
    displayCourses(courses.filter(c => c.subject === filterId.toUpperCase()));
  }
}

// Attach filter event listeners
filterButtons.forEach(btn => btn.addEventListener('click', handleFilter));

// Initial render
displayCourses(courses);
 