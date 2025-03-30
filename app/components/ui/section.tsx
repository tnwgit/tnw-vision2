import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  id?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  centered?: boolean;
  tinted?: boolean;
}

export function Section({
  title,
  description,
  className,
  children,
  id,
  titleClassName,
  descriptionClassName,
  containerClassName,
  centered = false,
  tinted = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tinted && "bg-gray-50",
        className
      )}
      {...props}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {(title || description) && (
          <div className={cn("mb-16", centered && "text-center")}>
            {title && (
              <h2 className={cn("text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", titleClassName)}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cn("mt-4 text-lg text-gray-600 max-w-3xl", centered && "mx-auto", descriptionClassName)}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
} 