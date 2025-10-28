// === course.js ===

// Array of course objects
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

// Function to display courses
function displayCourses(courseList) {
  // Clear container
  courseContainer.innerHTML = '';

  // Create cards dynamically
  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.completed ? '✅ Completed' : '⏳ In Progress'}</p>
    `;

    courseContainer.appendChild(card);
  });

  // Calculate and display total credits for displayed courses
  const totalCredits = courseList.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = totalCredits;
}

// Function to handle filter clicks
function handleFilter(event) {
  // Remove active from all buttons
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });

  // Add active to clicked button
  const button = event.currentTarget;
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');

  // Filter courses
  const filter = button.id;
  if (filter === 'all') displayCourses(courses);
  else displayCourses(courses.filter(c => c.subject === filter.toUpperCase()));
}

// Add event listeners
filterButtons.forEach(btn => btn.addEventListener('click', handleFilter));

// Initial display
displayCourses(courses);
