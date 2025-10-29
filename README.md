1. Project Overview
A simplified Hiring Management Web App that allows recruiters (Admin) to manage job vacancies and applicants (Job Seekers) to apply.
The app supports dynamic form validation based on job configurations from the backend, job applications with gesture-triggered photo capture, and role-based UI rendering.

2. Tech Stack Used
Frontend: React TS + Vite, TailwindCSS
State Management: Zustand
Backend/Database: IndexedDB
Webcam: React-Webcam (for gesture-based photo capture)
Deployment: Vercel

3. How to Run Locally
Clone the repository
Install dependencies:
npm install

Run the development server:
npm run dev

4. Key Features Implemented
Admin (Recruiter):

Job List Page: Display job vacancies with sorting, filtering, and status badges.

Create Job Page: Admin can create new jobs and configure fields (mandatory, optional, hidden).

Candidate Management: View all applicants for a job with sortable and resizable table columns.

Applicant (Job Seeker):

Job List Page: View active job postings and apply to them.

Apply Job Page: Form fields dynamically render based on job configuration.

Profile Picture via Hand Gesture: Use webcam to capture a photo when a specific hand pose is detected.

Authentication (Sign-Up):

A user can sign up by entering their email.

The password is auto-generated based on the email (i.e., the password is the same as the email).

If the email contains the word "admin", the role is set to admin; otherwise, it defaults to user.
