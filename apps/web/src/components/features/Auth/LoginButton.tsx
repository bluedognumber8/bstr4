"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { styled, css } from "next-yak";
import { User } from "lucide-react"; // Using Lucide icon as fallback

const Button = styled.button`
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--fg-primary);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background-color: var(--bg-surface-hover);
    border-color: var(--border-strong);
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

// Placeholder for loading state to prevent layout shift
const Placeholder = styled(Button)`
  opacity: 0.5;
  cursor: default;
`;

export const LoginButton = () => {
  const { data: session, status } = useSession();

  // 1. Loading State (Prevents "Login" flashing before "User" appears)
  if (status === "loading") {
    return (
      <Placeholder>
        <User size={16} /> ...
      </Placeholder>
    );
  }

  // 2. Logged In State
  if (session && session.user) {
    return (
      <Button onClick={() => signOut()}>
        {session.user.image ? (
          <Avatar src={session.user.image} alt="User Avatar" />
        ) : (
          <User size={16} />
        )}
        {session.user.name?.split(" ")[0]}
      </Button>
    );
  }

  // 3. Logged Out State
  // Calling signIn() without args opens the provider list (Google + Mock)
  return <Button onClick={() => signIn()}>Log In</Button>;
};
