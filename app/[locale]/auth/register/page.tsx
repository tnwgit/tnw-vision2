"use client";

import { RegisterForm } from "@/app/components/auth/register-form";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";

export default function RegisterPage() {
  return (
    <MainLayout>
      <Section className="py-16 md:py-24">
        <RegisterForm />
      </Section>
    </MainLayout>
  );
} 