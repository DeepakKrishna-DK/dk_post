"use client";

import { ClickSpark } from "./fancy-components";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClickSpark sparkColor="#00E5FF" sparkSize={5} sparkRadius={25} sparkCount={12} duration={500}>
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </ClickSpark>
    </>
  );
}
