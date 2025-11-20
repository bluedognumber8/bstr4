"use client";

import { styled } from "next-yak";
import { AlertTriangle, CheckCircle, ShoppingBag } from "lucide-react";
export { CodeBlock } from "./CodeBlock";

// --- HELPER: Extract text for IDs ---
const getText = (node: any): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node?.props?.children) return getText(node.props.children);
  return "";
};

// --- 1. Smart Headings (Auto-ID) ---
// We define styles directly here to avoid 'css' mixin errors in next-yak

const StyledH2 = styled.h2`
  font-family: var(--font-heading);
  color: var(--fg-primary);
  font-weight: 700;
  scroll-margin-top: 100px; /* Prevent header from covering title on jump */

  margin-top: 2.5em;
  margin-bottom: 0.75em;
  font-size: 1.8rem;
`;

const StyledH3 = styled.h3`
  font-family: var(--font-heading);
  color: var(--fg-primary);
  font-weight: 700;
  scroll-margin-top: 100px;

  margin-top: 2em;
  margin-bottom: 0.5em;
  font-size: 1.4rem;
`;

export const H2 = ({ children }: any) => {
  const text = getText(children);
  const id = text.toLowerCase().replace(/[^\w]+/g, "-");
  return <StyledH2 id={id}>{children}</StyledH2>;
};

export const H3 = ({ children }: any) => {
  const text = getText(children);
  const id = text.toLowerCase().replace(/[^\w]+/g, "-");
  return <StyledH3 id={id}>{children}</StyledH3>;
};

// --- 2. Callout ---
const CalloutBox = styled.div<{ $type: "info" | "warning" }>`
  padding: 16px;
  border-radius: 8px;
  margin: 24px 0;
  background-color: ${({ $type }) =>
    $type === "warning" ? "rgba(234, 179, 8, 0.1)" : "rgba(59, 130, 246, 0.1)"};
  border-left: 4px solid
    ${({ $type }) => ($type === "warning" ? "#EAB308" : "#3B82F6")};
  color: var(--fg-primary);
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const Callout = ({ type = "info", children }: any) => {
  return (
    <CalloutBox $type={type}>
      {type === "warning" ? (
        <AlertTriangle size={20} />
      ) : (
        <CheckCircle size={20} />
      )}
      <div>{children}</div>
    </CalloutBox>
  );
};

// --- 3. Product Card ---
const ProductWidget = styled.div`
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
  padding: 16px;
  border-radius: 12px;
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const ProductCard = ({ title, price }: any) => {
  return (
    <ProductWidget>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <ShoppingBag size={24} color="var(--action-primary)" />
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: "1.1rem",
              color: "var(--fg-primary)",
            }}
          >
            {title}
          </h4>
          <p style={{ margin: 0, color: "var(--fg-secondary)" }}>
            From <strong>${price}</strong>
          </p>
        </div>
      </div>
      <button
        style={{
          backgroundColor: "var(--action-primary)",
          color: "var(--bg-inverse)",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Buy Now
      </button>
    </ProductWidget>
  );
};
