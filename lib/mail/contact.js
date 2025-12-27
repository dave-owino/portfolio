/*document.addEventListener("DOMContentLoaded", function () {
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
*/
/* End of contact.js */

/* Start of contact-background.js */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("sendMessageButton"); // Target the button

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // 1. Disable button to prevent double-submissions
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation Logic (Keep your existing Regex - it's excellent)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailRegex.test(email) || !message) {
      showMessage("Please check your details and try again.", "#FFD700");
      resetButton();
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showMessage("Success! Message sent to David.", "#00d4ff"); // Use your brand cyan
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showMessage("Server error. Please try again later.", "#FFD700");
    } finally {
      // 2. Always re-enable button after process finishes
      resetButton();
    }
  });

  function showMessage(text, color) {
    successMessage.innerText = text;
    successMessage.style.color = color;
    successMessage.style.display = "block";
    setTimeout(() => { successMessage.style.display = "none"; }, 5000);
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
  }
});
/* End of contact-background.js */