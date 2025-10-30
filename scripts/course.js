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

document.addEventListener("DOMContentLoaded", () => {
  const courseContainer = document.getElementById("courseContainer");
  const totalCreditsEl = document.getElementById("totalCredits");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Function to display courses
  function displayCourses(courseList) {
    courseContainer.innerHTML = ""; // Clear container

    courseList.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      if (course.completed) card.classList.add("completed");

      card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p><strong>${course.title}</strong></p>
        <p>Credits: ${course.credits}</p>
        <p>Status: ${course.completed ? "✅ Completed" : "⏳ In Progress"}</p>
      `;

      courseContainer.appendChild(card);
    });

    // Calculate and display total credits for the displayed list
    const totalCredits = courseList.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsEl.textContent = totalCredits;
  }

  // Function to handle filter button clicks
  function handleFilter(event) {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    const button = event.currentTarget;
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    const filter = button.id;
    if (filter === "all") displayCourses(courses);
    else displayCourses(courses.filter(c => c.subject === filter.toUpperCase()));
  }

  // Event listeners
  filterButtons.forEach(btn => btn.addEventListener("click", handleFilter));

  // Initial load
  displayCourses(courses);
});
