import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

export default function Pricing() {
  return (
    <div className="container max-w-6xl py-10">
      <h1 className="text-center mb-16">
        Choose a plan for your learning journey
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="flex flex-col">
          <CardHeader className="h-14 px-4 justify-center bg-muted/50">
            <h3>Basic</h3>
          </CardHeader>
          <Separator />
          <CardContent className="px-6 flex flex-col items-center grow py-8">
            <h1 className="font-bold text-6xl mb-4">$0</h1>
            <div className="text-sm text-muted-foreground mb-8 text-center">
              Always free
            </div>
            <Separator className="mb-6" />
            <p className="mb-16 text-center">
              Access to all free courses and article contents
            </p>
            <div className="flex-1"></div>
            <Button
              variant="outline"
              className="text-primary hover:text-primary border-primary"
              asChild
            >
              <Link href={"/login"}>Sign up</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="h-14 px-4 justify-center bg-muted/50">
            <h3>Monthly</h3>
          </CardHeader>
          <Separator />
          <CardContent className="px-6 flex flex-col items-center grow py-8">
            <div className="flex items-baseline mb-4">
              <h1 className="font-bold text-6xl">$15</h1>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <div className="text-sm text-muted-foreground mb-8 text-center">
              Billed monthly
            </div>
            <Separator className="mb-6" />
            <p className="mb-16 text-center">
              Everything in basic plus paid courses and articles
            </p>
            <div className="flex-1"></div>
            <Button
              variant="outline"
              className="text-primary hover:text-primary border-primary"
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="h-14 px-4 justify-center bg-muted/50">
            <h3>Annually</h3>
          </CardHeader>
          <Separator />
          <CardContent className="px-6 flex flex-col items-center grow py-8">
            <div className="flex items-baseline mb-4">
              <h1 className="font-bold text-6xl">$12</h1>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <div className="text-sm text-muted-foreground mb-8 text-center">
              Billed annually. Saved 20% monthly.
            </div>
            <Separator className="mb-6" />
            <p className="mb-16 text-center">
              Everything in basic plus paid courses and articles
            </p>
            <div className="flex-1"></div>
            <Button
              variant="outline"
              className="text-primary hover:text-primary border-primary"
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
