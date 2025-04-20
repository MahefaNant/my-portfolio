/* eslint-disable react/no-unescaped-entities */
"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md text-center">
        <div className="mb-8 inline-block">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-full bg-primary/10" />
            {/* <Rocket className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-primary" /> */}
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <Image
                src="/static/images/mahefa-logo.png"
                alt="MAHEFA"
                className="object-cover"
                fill={true}
                priority={true}
                unoptimized={true}
              />
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Page not found
        </h1>

        <p className="mb-6 text-muted-foreground">
          The page you are looking for appears to have moved or does not exist.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild={true} className="group gap-2 rounded-full px-6">
            <Link href="/">
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            Error code : <span className="font-mono">404</span>
          </p>
        </div>
      </div>
    </div>
  );
}
