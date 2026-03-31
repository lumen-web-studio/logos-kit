"use client";

import Script from "next/script";
import type { ReactElement } from "react";

type Props = {
  measurementId: string | undefined;
};

export default function GoogleAnalytics({
  measurementId,
}: Props): ReactElement | null {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="worker"
      />
      <Script id="ga-init" strategy="worker">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
