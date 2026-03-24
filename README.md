# Q&A Website

A comprehensive website with backend integration for contact forms, image slider, and dedicated about page.

## Features

- Responsive website with sections: Home (with image slider), About, Services, Team, Testimonials, FAQ, Contact
- Backend integration for contact form submissions
- Image slider on home page
- Dedicated About Us page with images and detailed content
- Images added to services, team, and about sections

## Setup

### Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   or for development:
   ```
   npm run dev
   ```

The backend will run on `http://localhost:3000`.

### Frontend

Open `index.html` in a web browser. The frontend will make API calls to the backend for contact form submissions.

## Pages

- `index.html`: Main website with all sections
- `about.html`: Dedicated About Us page with detailed content and images

## Technologies

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express