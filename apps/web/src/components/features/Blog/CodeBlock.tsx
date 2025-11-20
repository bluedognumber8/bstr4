"use client";

import { styled } from "next-yak";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Pre = styled.pre`
  position: relative;
  background: var(--bg-inverse);
  border-radius: var(--radius-md);
  overflow: hidden; /* Clip the header */
  margin-bottom: 1.5em;
  border: 1px solid var(--border-subtle);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Lang = styled.span`
  font-size: 0.75rem;
  color: var(--fg-muted);
  font-family: var(--font-code);
  text-transform: uppercase;
`;

const CopyBtn = styled.button`
  background: none;
  border: none;
  color: var(--fg-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  transition: color 0.2s;

  &:hover {
    color: var(--fg-inverse);
  }
`;

const CodeArea = styled.div`
  padding: 16px;
  overflow-x: auto;

  code {
    font-family: var(--font-code);
    font-size: 0.9rem;
    color: var(--fg-inverse);
  }
`;

export const CodeBlock = ({ children, ...props }: any) => {
  const [copied, setCopied] = useState(false);

  // Extract text content from React children
  const getText = () => {
    try {
      return children.props.children;
    } catch (e) {
      return "";
    }
  };

  const handleCopy = async () => {
    const text = getText();

    try {
      // 1. Try Modern API (Requires HTTPS or Localhost)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 2. Fallback for Non-Secure (Mobile Dev)
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Move off-screen
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy"); // Legacy API works on HTTP
        document.body.removeChild(textArea);
      }

      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <Pre>
      <Header>
        <Lang>Code</Lang>
        <CopyBtn onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </CopyBtn>
      </Header>
      <CodeArea>{children}</CodeArea>
    </Pre>
  );
};
