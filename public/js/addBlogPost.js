const form = document.querySelector(".new-post-form");
const postTitleInput = document.querySelector("#post-name");
const postContentInput = document.querySelector("#post-desc");

const handleSubmit = (e) => {
  e.preventDefault();

  const newPost = {
    title: postTitleInput.value.trim(),
    content: postContentInput.value.trim(),
  };

  // Validate input fields
  if (!newPost.title || !newPost.content) {
    alert("Please fill out both the title and content fields.");
    return;
  }

  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      console.log("Blog post submitted successfully:", data);
      window.location.reload();
    })
    .catch((err) => {
      console.error("Error:", err.message);
      alert("Failed to submit blog post: " + err.message);
    });
};

form.addEventListener("submit", handleSubmit);
