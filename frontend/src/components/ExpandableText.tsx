/**
 * @file ExpandableText.tsx
 * @project SkillShift
 * @author Nakul Rajpal
 * @created 2026-03-14
 * @description A React component that truncates long text and provides
 *              a toggle button to expand or collapse the full content.
 */

import { useState } from "react";

interface Props {
  cap?: number;
  children: String;
}

/**
 * Renders text truncated to a character cap with a "More"/"Less" toggle.
 * If the text is shorter than the cap, it renders in full without a button.
 *
 * @param {number} [cap=100] - Maximum number of characters to show before truncating.
 * @param {String} children - The text content to display.
 * @returns {JSX.Element} The expandable text component.
 *
 * @example
 * <ExpandableText cap={50}>{"Some very long text content..."}</ExpandableText>
 */
const ExpandableText = ({ cap = 100, children }: Props) => {
  if (children.length <= cap) return <p>{children}</p>;

  const [showLess, setShowLess] = useState(true);
  const toggle = () => {
    setShowLess(!showLess);
  };

  return (
    <>
      <p>{showLess ? children.slice(0, cap) + "..." : children}</p>
      <button className="btn btn-secondary" onClick={toggle}>
        {showLess ? "More" : "Less"}
      </button>
    </>
  );
};

export default ExpandableText;
