"use client";

import { Drawer as VaulDrawer } from "vaul";
import { styled, keyframes, css } from "next-yak";
import { ReactNode } from "react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledOverlay = styled(VaulDrawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9998;
  animation: ${fadeIn} 0.2s ease-out;
  backdrop-filter: blur(2px);
`;

const StyledContent = styled(VaulDrawer.Content)`
  background-color: var(--bg-surface);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 90%;
  max-height: 96%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
  border-top: 1px solid var(--border-subtle);

  &:focus {
    outline: none;
  }
`;

const HandleContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const Handle = styled.div`
  width: 48px;
  height: 5px;
  border-radius: 99px;
  background-color: var(--border-strong);
`;

/* --- ACCESSIBILITY HELPERS --- */

// Used to hide the title from sight but keep it for Screen Readers
const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const StyledTitle = styled(VaulDrawer.Title)<{ $hidden?: boolean }>`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg-primary);
  margin-bottom: 16px;
  text-align: center;

  ${(props) => props.$hidden && visuallyHidden}
`;

/* --- COMPONENT --- */

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  children: ReactNode;

  // Added Accessibility Props
  title?: string;
  hideTitle?: boolean;
}

export const Drawer = ({
  open,
  onOpenChange,
  trigger,
  children,
  title = "Drawer", // Default title if none provided
  hideTitle = false,
}: DrawerProps) => {
  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground
    >
      {trigger && <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>}

      <VaulDrawer.Portal>
        <StyledOverlay />
        <StyledContent>
          {/* Handle Logic */}
          <HandleContainer>
            <Handle />
          </HandleContainer>

          {/* 
            ACCESSIBILITY FIX: 
            Render the Title component. 
            If hideTitle is true, it applies the css to hide it visually.
          */}
          <StyledTitle $hidden={hideTitle}>{title}</StyledTitle>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
            {children}
          </div>
        </StyledContent>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};
