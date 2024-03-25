# Task Manager Application

## React + TypeScript + Vite + Tailwind

### 3rd party libraries used:

-   Redux Toolkit (state management)
-   React Hook Form (form handeling)\
    <br />

To run app locally on your machine first **clone** repository,  
then _goto_ folder on your computer where repo is cloned - `cd` _/path/to/cloned/repo_,  
then run: `npm i`  
and then run: `npm run dev`
<br />
<br />

### Instructions for setting own todoist app and setting env variables

-   login/signup to todoist app https://app.todoist.com/
-   _goto_ settings -> integrations -> developer-tab
-   copy **API Token**
-   add api token to your .env file (you have env.example)
-   go back to todoist
-   on side bar under **My Projects** create new project
-   https://developer.todoist.com/rest/v2/?javascript#get-all-projects use this api endpoint to retrieve **project_id** (you can use Postamn)
-   add **project_id** to your .env file
-   add domain url to your .env file: **https//<i></i>api.todoist.com**
-   if you want to have functionality to assign someone to task, you must share project with that person
-   to share project click on **...** beside project name and click share than enter email address of the person you want to share project.
