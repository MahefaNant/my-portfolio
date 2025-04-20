/* eslint-disable react/no-unescaped-entities */
"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full border-8 border-dashed border-destructive/20" />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-20 w-20 text-destructive" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Oops! Server error
        </h1>

        <p className="mb-6 text-muted-foreground">
          An unexpected error has occurred. Please try again later.
        </p>

        <div>
          <Button
            onClick={() => reset()}
            className="group gap-2 rounded-full px-6"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>

        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-left">
          <p className="text-sm font-medium text-muted-foreground">
            Error details:
          </p>
          <code className="mt-2 block overflow-x-auto rounded bg-muted p-2 text-sm text-destructive">
            {error.message}
          </code>
        </div>
      </div>
    </div>
  );
}
