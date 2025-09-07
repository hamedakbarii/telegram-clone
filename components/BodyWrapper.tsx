// components/BodyWrapper.tsx (alternative approach)
"use client";

import { useEffect } from "react";

interface BodyWrapperProps {
  children: React.ReactNode;
  className: string;
}

export default function BodyWrapper({ children, className }: BodyWrapperProps) {
  useEffect(() => {
    // Apply body classes after hydration to prevent mismatch
    document.body.className = className;
  }, [className]);

  return <>{children}</>;
}

// Then in layout.tsx:
// import BodyWrapper from "@/components/BodyWrapper";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
    // <html lang="en">
    //   <body suppressHydrationWarning={true}>
    //     <BodyWrapper className={`${vazirmatn.variable} antialiased bg-white text-black font-vazirmatn`}>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         {children}
    //       </Suspense>
    //     </BodyWrapper>
    //   </body>
    // </html>
//   );
// }