# Campus-front
<!-- [Link to deployed page](https://belovedemperor.github.io/Bank-of-React/) -->

Team Members: Cheng Yue (username: CY343), Christopher Altamirano (username: caltam600), and Jason Huang (username: belovedEmperor)

## Documentation
### Feature Requirements
Pages & Views
*   **Home Page**: A landing page with links to "All Campuses" and "All Students".
*   **All Campuses View**:
    *   Display all campuses (Name + Image).
    *   If no campuses exist, display a clear message ("No campuses registered").
    *   "X" button on each campus card to delete it.
    *   "Add Campus" button to navigate to the form.
*   **Single Campus View**:
    *   Display full details: Name, Image, Address, Description.
    *   List all students enrolled at this campus.
    *   If no students are enrolled, display "No students enrolled".
    *   Buttons to **Edit** or **Delete** the campus.
*   **All Students View**:
    *   Display all students (Name + Image).
    *   If no students exist, display "No students registered".
    *   "X" button on each student card to delete them.
    *   "Add Student" button.
*   **Single Student View**:
    *   Display full details: Name, Email, GPA, Image.
    *   Display the **Name of the Campus** they attend (clickable link to that Campus).
    *   If not enrolled, display "Not enrolled in any campus".
    *   Buttons to **Edit** or **Delete** the student.

Forms & Interactivity
*   **Add/Edit Campus Form**:
    *   Fields: Name, Address, Description, Image URL.
    *   **Validation**: Prevent submission if Name or Address is empty.
*   **Add/Edit Student Form**:
    *   Fields: First Name, Last Name, Email, GPA, Image URL, Campus ID (Select/Dropdown).
    *   **Validation**: Prevent submission if required fields are empty. Ensure GPA is numeric (0.0 - 4.0).
*   **Real-time Updates**: When an item is deleted or added, the view should update immediately (via state change) without requiring a manual page refresh.

### Application Architecture Description and Diagram

### Epics, User Stories, and Acceptance Criteria
#### **Epic: Navigation & Home**
1.  **Navigation Bar**
    *   *User Story:* As a user, I want a permanent navigation bar so I can easily switch between Home, Campuses, and Students at any time.
2.  **Home Page**
    *   *User Story:* As a user, I want a welcoming landing page that directs me where to go.

#### **Epic: Campus UI**
3.  **Browse Campuses**
    *   *User Story:* As a user, I want to see a grid or list of all campuses to see what options are available.
    *   *Acceptance Criteria:*
        *   Displays Name and Image.
        *   Clicking a campus navigates to the Single Campus View.
        *   Shows "No campuses" if the database is empty.
4.  **View Campus Details**
    *   *User Story:* As a user, I want to see detailed information about a campus and who goes there.
    *   *Acceptance Criteria:*
        *   Shows Address and Description.
        *   Lists students enrolled (clickable links to Student Profiles).
5.  **Add Campus (Form)**
    *   *User Story:* As an user, I want a form to register a new campus.
    *   *Acceptance Criteria:*
        *   Form validates that Name and Address are present.
        *   On submit, redirects to the new Campus's page or the All Campuses view.
6.  **Edit Campus**
    *   *User Story:* As an user, I want to fix mistakes in a campus record.
    *   *Acceptance Criteria:*
        *   Form pre-fills with existing data.
        *   Changes are reflected immediately after saving.

#### **Epic: Student UI**
7.  **Browse Students**
    *   *User Story:* As a user, I want to see a list of all students.
    *   *Acceptance Criteria:*
        *   Displays Name.
        *   Clicking a student navigates to the Single Student View.
8.  **View Student Profile**
    *   *User Story:* As a user, I want to see a student's grades and where they go to school.
    *   *Acceptance Criteria:*
        *   Shows GPA and Email.
        *   Shows a link to their Campus. If they don't have one, it says so clearly.
9.  **Add Student (Form)**
    *   *User Story:* As an user, I want to enroll a student and assign them to a campus immediately.
    *   *Acceptance Criteria:*
        *   Includes a dropdown or input to select a Campus.
        *   Validates GPA is between 0.0 and 4.0.
10. **Delete Functionality (Global)**
    *   *User Story:* As an user, I want to easily remove students or campuses from the list view.
    *   *Acceptance Criteria:*
        *   Each item in the "All" views has a delete button (e.g., an 'X' icon).
        *   Clicking it removes the item from the screen and database.

### Project Schedule
<!-- [Github Project/Gantt Chart Link](https://github.com/users/belovedEmperor/projects/4) -->
<!---->
<!-- ![[CSci 395 - Project 3 - Bank of React-1762211427111.webp]] -->

***

# client-starter-code

This repository is the client (front-end) starter code for Final Project - Full-Stack CRUD Application.

----------
### 1. Use the following process to ***import*** the Final Project client starter code repository to your GitHub account as the starter codebase
1.	Log on to GitHub
2.	Click on the + sign in the top right corner (next to the user icon)
3.	In the dropdown menu, select "Import repository"
4.	A new page will open
5.	In "Your old repository’s clone URL" field, enter: `https://github.com/johnnylaicode/client-starter-code`
6.	In "Your new repository details" field, enter your own repository name (e.g., "final-project-client")
7.	Click on the "Begin import" button to start the process
8.	After the process completed, your new "final-project-client" repository is created – as a completely independent codebase
9.	From this point on, you can clone your new repository, make changes, create feature branches, and create/merge pull requests

----------
### 2. Use the information below to ***clone*** the starter codebase to your local machine
After creating the starter codebase "final-project-client" repository on GitHub (see above), you can clone it to your local machine. The instructions on how to clone a GitHub repository are available at this [link](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

----------
### 3. Set up and run the client (front-end) application on your local machine
1.	Start a terminal (e.g., Git Bash) on your local machine.
2.  Go to the "final-project-client" folder, enter the command to install dependencies: `npm install` 
3.	Start the client application by entering the command: `npm start` 
4.	After the client application is successfully started, a web browser is automatically opened at the address: `http://localhost:3000` 

<br/>

## Common Errors You May Encounter
### Error: ERR_OSSL_EVP_UNSUPPORTED
This error indicates that your application uses an algorithm or key size not supported by OpenSSL 3.0.
#### Solution: 
1. If you use *Windows*, in the `package.json` file, set the "scripts" attributes as follows:

```
  "scripts": {
  "start": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts start", 
  "build": "SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build", 
  ...
    },
```

2. If you use *Mac OSX or Linux*, include the following command in the `~/.bash_profile` or `~/.bashrc` file.

```
  export NODE_OPTIONS=--openssl-legacy-provider
```
