const form = document.querySelector("form");
const commentInput = document.querySelector('[name="comment"]');

// Function to get the blog post ID from the URL
const getBlogPostIdFromUrl = () => {
  const urlParts = window.location.pathname.split("/");
  return urlParts.pop();
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newComment = {
    comment_text: commentInput.value,
    blog_post_id: getBlogPostIdFromUrl(),
  };

  fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to submit comment");
    })
    .then((data) => {
      console.log("Comment submitted successfully:", data);
      window.location.reload();
    })
    .catch((err) => console.error(err));
};

form.addEventListener("submit", handleSubmit);
