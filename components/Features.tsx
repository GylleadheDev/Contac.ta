"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, Palette, Shield, Zap, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const features = [
  {
    title: "Lightning Fast",
    description:
      "Optimized performance with blazing fast load times and smooth interactions for the best user experience.",
    icon: Rocket,
    actionLabel: "Learn More",
  },
  {
    title: "Beautiful Design",
    description:
      "Stunning modern interface with carefully crafted components and attention to every detail.",
    icon: Palette,
    actionLabel: "View Components",
  },
  {
    title: "Enterprise Ready",
    description:
      "Built with security and scalability in mind, perfect for businesses of any size.",
    icon: Shield,
    actionLabel: "Get Started",
  },
  {
    title: "Powerful Features",
    description:
      "Advanced capabilities and integrations to help you build amazing products faster.",
    icon: Zap,
    actionLabel: "Explore Features",
  },
];

export function FeaturesSec() {
  return (
    <section className="w-full my-20 ">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-teal-500  dark:bg-gradient-to-r dark:to-blue-600 dark:from-[#EA755F]">
                Features 
              </span>{" "}
              with performance
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            On more modern platforms, it is increasingly difficult to make it easier to use the solution

            </p>

            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             Read about the features that will change your business
              
            </p>
          </div>
        </div>

        {/* Features Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group dark:bg-white dark:text-slate-900 flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-h-[320px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-xl border-2 dark:border-blue-500 border-orange-500"
              >
                <CardHeader>
                  <div className="mb-4 dark:bg-slate-900  inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary dark:text-blue-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardDescription className=" text-slate-900 text-md flex-grow">
                    {feature.description}
                  </CardDescription>

                 
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
