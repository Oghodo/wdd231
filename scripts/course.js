// === course.js ===
document.addEventListener('DOMContentLoaded', () => {
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

  // Create a course card element
  function createCourseCard(course) {
    const article = document.createElement('article');
    article.className = 'course-card';
    if (course.completed) article.classList.add('completed');
    else article.classList.add('in-progress');

    article.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? '✅ Completed' : '⏳ In Progress'}</p>
    `;
    return article;
  }

  // Display courses and update total credits
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

  // Handle filter button clicks
  function handleFilter(event) {
    const btn = event.currentTarget;

    // Update active state for accessibility
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filterId = btn.id;
    if (filterId === 'all') {
      displayCourses(courses);
    } else {
      displayCourses(courses.filter(c => c.subject === filterId.toUpperCase()));
    }
  }

  // Attach event listeners
  filterButtons.forEach(btn => btn.addEventListener('click', handleFilter));

  // Initial render
  displayCourses(courses);
});
