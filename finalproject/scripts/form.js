// form.js

// Hamburger toggle for small screens
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if(hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Display form data on form-action.html
const formDataDiv = document.getElementById('form-data');

if(formDataDiv) {
  const params = new URLSearchParams(window.location.search);

  if([...params].length > 0) {
    const name = params.get('name');
    const email = params.get('email');
    const subject = params.get('subject');
    const message = params.get('message');

    formDataDiv.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
  } else {
    formDataDiv.innerHTML = `<p>No data submitted.</p>`;
  }
}
