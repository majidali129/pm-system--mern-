import type { FallbackProps } from "react-error-boundary";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(error);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Card className="py-6">
        <CardContent className="flex-center flex-col !gap-y-3">
          <h3>Something went wrong! 😒</h3>
          <p>{(error as Error).message}</p>
          <Button size="lg" onClick={resetErrorBoundary}>
            {" "}
            Try again
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
