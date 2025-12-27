document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{3,}$/;

    if (!name && !email && !message) {
      showMessage("All fields are required", "#FFD700");
      return;
    }

    if (!nameRegex.test(name)) {
      showMessage("Use a real name (only letters and spaces)", "#FFD700");
      return;
    }

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address", "#FFD700");
      return;
    }

    if (!message) {
      showMessage("Message cannot be empty", "#FFD700");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showMessage(
          "Thank you for contacting David.\nMessage sent successfully!",
          "#E0E0E0"
        );
        form.reset();
      } else {
        showMessage("Error sending message. Please try again.", "#FFD700");
      }
    } catch {
      showMessage("An error occurred. Please try again later.", "#FFD700");
    }
  });

  function showMessage(text, color) {
    successMessage.innerText = text;
    successMessage.style.color = color;
    successMessage.style.display = "block";

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  }
});
