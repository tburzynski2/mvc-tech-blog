document.addEventListener("DOMContentLoaded", () => {
  // Select all delete buttons
  const deleteButtons = document.querySelectorAll(".btn-danger");

  // Add event listeners to each delete button
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the blog post ID from the data-id attribute
      const postId = event.target.getAttribute("data-id");

      // Confirm with the user before deleting the post
      const confirmDelete = confirm(
        "Are you sure you want to delete this blog post?"
      );
      if (!confirmDelete) {
        return;
      }

      // Send the DELETE request to the server
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // If successful, reload the page to update the list of posts
            window.location.reload();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .catch((err) => {
          console.error("Error:", err.message);
          alert("Failed to delete blog post: " + err.message);
        });
    });
  });
});
