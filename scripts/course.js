// === course.js ===
// Dynamically renders courses and updates total credits.
// Array of course objects (edit/complement as you progress)
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

const courseContainer = document.getElementById('courseContainer');
const totalCreditsEl = document.getElementById('totalCredits');
const filterButtons = document.querySelectorAll('.filter-btn');

function formatCourseCard(course) {
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

function displayCourses(list) {
  if (!courseContainer || !totalCreditsEl) return;

  courseContainer.innerHTML = '';
  if (list.length === 0) {
    courseContainer.innerHTML = '<p>No courses found for this selection.</p>';
    totalCreditsEl.textContent = '0';
    return;
  }

  list.forEach(c => {
    courseContainer.appendChild(formatCourseCard(c));
  });

  // Use reduce() as required by the rubric
  const credits = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  totalCreditsEl.textContent = credits;
}

// Filter handler
function handleFilter(event) {
  const btn = event.currentTarget;
  // update visual + accessibility state
  filterButtons.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  const id = btn.id;
  if (id === 'all') displayCourses(courses);
  else displayCourses(courses.filter(c => c.subject === id.toUpperCase()));
}

// Hook up filters
filterButtons.forEach(btn => {
  btn.addEventListener('click', handleFilter);
});

// Initial render
displayCourses(courses);
