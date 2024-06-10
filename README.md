# Tech Blog Web App

A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Screenshots

[TODO: Add screenshots here]

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on the `.env.example` and set your environment variables.
4. Set up your PostgreSQL database and update the database connection details in `config/config.json`.
5. Run `npm start` to start the server.
6. Navigate to `http://localhost:3001` in your browser.

## Usage

- Upon visiting the site for the first time, users are presented with the homepage, which includes existing blog posts (if any), navigation links for the homepage and the dashboard, and the option to log in.
- Clicking on the homepage option takes users to the homepage.
- Clicking on any other links in the navigation prompts users to either sign up or sign in.
- Signing up prompts users to create a username and password, which are saved for future logins.
- Upon signing in, users see navigation links for the homepage, the dashboard, and the option to log out.
- Clicking on the homepage option in the navigation takes users to the homepage with existing blog posts displayed.
- Users can click on an existing blog post to view its details and leave a comment.
- Comments can be submitted while signed in, which updates the post to display the comment along with the creator's username and date created.
- The dashboard option in the navigation takes users to their dashboard, where they can view their existing blog posts and add new ones.
- Users can delete or update their existing posts from the dashboard.
- Logging out signs users out of the site.
- If idle on the site for more than a set time, users are prompted to log in again before performing actions.

## Author

[Author's GitHub Profile](https://github.com/tburzynski2)
