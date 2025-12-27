document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    //const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameRegex = /^[a-zA-Z\s]{3,}$/; // Only letters and spaces, min 3 characters

    const subjectRegex = /^[a-zA-Z0-9\s.,!?]{3,}$/; // Allows letters, numbers, spaces, and basic punctuation

    // Validate form fields

    if (!name && !email && !subject && !message) {    // Check if all fields are empty
      showMessage("All fields are required", "#FFD700");
      return;
    }

    // Validate each field
    if (!nameRegex.test(name)) {
        showMessage("Use a real name (only letters and spaces)", "#FFD700");
        return;
    }
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address", "#FFD700");
      return;
    }
    /*if (!subjectRegex.test(subject.trim())) {
        showMessage("Subject must be clear and precise!", "#FFD700");
        return;
    }*/
    if (!message) {
      showMessage("Message cannot be empty", "#FFD700");
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showMessage(
          "Thank you for contacting David.\nMessage sent successfully!",
          "#E0E0E0"
        ); // Light gray
        form.reset(); // Clear form after successful submission
      } else {
        showMessage("Error sending message.\nPlease try again.", "#FFD700"); // Yellow
      }
    } catch (error) {
      showMessage("An error occurred.\nPlease try again later.", "#FFD700"); // Yellow
    }
  });

  // Function to display messages
  function showMessage(text, color) {
    successMessage.innerText = text;
    successMessage.style.color = color;
    successMessage.style.display = "block";

    // Hide message after 4 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  }
});