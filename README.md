$$\color{red}{
\begin{array}{l}
\text{\Large Nakul's Project Series} \\
\text{\Large - Project Two} \\
\text{- Finished: YES} \\
\text{- Start Date: November 18, 2024} \\
\text{- End Date: December 8, 2024} \\
\text{- Reasoning: Made as a project for CS5170: AI in HCI} \\
\text{- Used AI: YES} \\
\text{- Difficulty: EASY} \\
\text{- Comments: I was again given a template for this, and I used AI to refactor the theme and make marginal changes. This project doesn't represent my current ability to make systems, but I wanted to polish it for my github.}
\end{array}
}$$

# Skill Shift

---

## Table of Contents
1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)
3. [Usage](#usage)
4. [License](#license)

---

## Overview

**SkillShift** is an AI-powered career guidance platform specifically designed to assist gig workers and seasoned professionals in transitioning to new industries. By leveraging Large Language Models (LLMs), the tool analyzes a user's current skills, job title, and preferences to provide in-depth insights into future industries, job market statistics, and required new skills.

---

## Screenshot

<p align="center">
  <img src="./images/image.png" alt="App Screenshot" width="600" />
</p>

---

## Setup Instructions

### Prerequisites

Before setting up, ensure the following are installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Vite](https://vitejs.dev/) (included in devDependencies)

### Installation Steps

1. **Clone the Repository**
   Clone the project repository to your local machine.

2. **Setup OpenAI Key**
   Add your OpenAI API key to the `openaiService.js` file located in the `server` directory.

3. **Install Nodemon Globally**
   Ensure nodemon is installed globally to simplify server management:
   ```bash
   npm install -g nodemon
   ```

4. **Start the Server**
   Navigate to the `server` directory and run the server:
   ```bash
   cd server
   nodemon index.js
   ```

5. **Start the Frontend**
   Navigate to the `frontend` directory and run the development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## Usage

1. Launch the server and frontend as outlined in the setup instructions.
2. Open the provided link in your browser (typically `http://localhost:5173`).
3. Enter your professional details into the form, including current job, skills, and target industries.
4. Submit the form to receive an AI-generated career transition roadmap, including job market data and recommended courses.

---

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to adapt, modify, and use the project in your own applications while adhering to the license terms.