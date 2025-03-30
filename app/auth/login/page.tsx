"use client";

import { LoginForm } from "@/app/components/auth/login-form";
import { MainLayout } from "@/app/components/layout/main-layout";
import { Section } from "@/app/components/ui/section";

export default function LoginPage() {
  return (
    <MainLayout>
      <Section className="py-12">
        <LoginForm />
      </Section>
    </MainLayout>
  );
} 