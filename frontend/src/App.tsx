/**
 * @file App.tsx
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description Root application component that renders the career transition query form.
 */

import "./styles.css";
import "./App.css";

import QueryForm from "./components/QueryForm";

/**
 * Root application component.
 * Renders the QueryForm for user input.
 *
 * @returns {JSX.Element} The top-level application layout.
 *
 * @example
 * <App />
 */
function App() {
  return (
    <div>
      <QueryForm />
    </div>
  );
}

export default App;
