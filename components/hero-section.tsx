"use client";

import React from "react";
import Link from "next/link";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";
import { LogoCloud } from "./logo-cloud";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
} as const;

export default function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* ------------------ TITLE ------------------ */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-5xl font-medium md:text-6xl"
              >
                Stop UPI Scams Before They Happen.
              </TextEffect>

              {/* ------------------ SUBTITLE ------------------ */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg"
              >
                FraudShield uses OCR + AI to detect fake UPI pages, refund
                scams, impersonation messages, QR traps and phishing sites —
                directly from your browser.
              </TextEffect>

              {/* ------------------ CTA + AI PREVIEW ------------------ */}
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                {/* CTA Button */}
                <div className="mx-auto max-w-sm">
                  <Link href="/analyze">
                    <Button
                      size="lg"
                      className="rounded-xl text-lg w-full h-14 flex items-center gap-2"
                    >
                      Launch Scanner
                      <SendHorizonal className="size-5" />
                    </Button>
                  </Link>
                </div>

                {/* ------------------ AI PREVIEW MOCKUP ------------------ */}
                <div
                  aria-hidden
                  className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                >
                  <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-4xl border p-2 mask-[linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                    <div className="relative h-96 overflow-hidden rounded-3xl border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                  </div>

                  <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-4xl border p-2 backdrop-blur-3xl mask-[linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                    <div className="bg-background space-y-2 overflow-hidden rounded-3xl border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                      <AIResultMock />

                      <div className="bg-muted rounded-2xl p-4 pb-16 dark:bg-white/5"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>

        <LogoCloud />
      </main>
    </>
  );
}

/* ------------------ AI PREVIEW COMPONENT ------------------ */
const AIResultMock = () => {
  return (
    <div className="relative space-y-3 rounded-2xl bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-red-400">
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2L1 21h22L12 2zm0 5l7 12H5l7-12zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z"
          />
        </svg>
        <div className="text-sm font-medium">Fraud Risk</div>
      </div>

      <div className="space-y-3">
        <div className="text-foreground border-b border-white/10 pb-3 text-sm font-medium">
          Suspicious UPI ID detected — possible refund scam attempt.
        </div>

        <div className="space-y-1">
          <div className="space-x-1">
            <span className="text-foreground text-xl font-medium">91%</span>
            <span className="text-muted-foreground text-xs">Risk Score</span>
          </div>

          <div className="flex h-5 items-center rounded bg-linear-to-r from-red-500 to-orange-500 px-2 text-xs text-white">
            refund_scam
          </div>
        </div>
      </div>
    </div>
  );
};
