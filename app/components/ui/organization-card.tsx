"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { cn, getIcon } from "@/app/lib/utils";
import { OrganizationType } from "@/app/types";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface OrganizationCardProps {
  organization: OrganizationType;
  className?: string;
}

// Functie om verschillende kleurstijlen toe te wijzen aan organisatietypes
function getOrganizationStyle(id: string) {
  const styleMap: Record<string, { borderColor: string, gradient: string, buttonVariant: string }> = {
    'hotel': { 
      borderColor: 'border-t-[#3182ce]', 
      gradient: 'bg-gradient-to-r from-[#3182ce] to-[#5a9bd3]',
      buttonVariant: 'gradient'
    },
    'legal': { 
      borderColor: 'border-t-[#ff9e2c]', 
      gradient: 'bg-gradient-to-r from-[#ff9e2c] to-[#e02424]',
      buttonVariant: 'gradient-warm'
    },
    'municipality': { 
      borderColor: 'border-t-[#16bdca]', 
      gradient: 'bg-gradient-to-r from-[#0d9488] to-[#16bdca]',
      buttonVariant: 'gradient-teal'
    },
    'healthcare': { 
      borderColor: 'border-t-[#7e3af2]', 
      gradient: 'bg-gradient-to-r from-[#5a67d8] to-[#7e3af2]',
      buttonVariant: 'gradient-purple'
    }
  };

  // Fallback stijl als de ID niet in de map staat
  return styleMap[id] || { 
    borderColor: 'border-t-[#5a9bd3]', 
    gradient: 'bg-gradient-to-r from-[#3182ce] to-[#7e3af2]',
    buttonVariant: 'gradient-mixed'
  };
}

export function OrganizationCard({ organization, className }: OrganizationCardProps) {
  const { id, name, description, icon, assistants } = organization;
  const IconComponent = getIcon(icon.replace("-icon", ""));
  const { borderColor, gradient, buttonVariant } = getOrganizationStyle(id);
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("organizationTypes");
  
  return (
    <Card className={cn(`hover:shadow-md transition-all border-t-4 ${borderColor} border-gray-100 shadow-sm`, className)}>
      <CardHeader className="space-y-1">
        <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-2 shadow-sm`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl text-[#2c5282]">{t(`${id}.name`)}</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#f9fafb]">
        <div className="h-24 overflow-hidden mb-2">
          <p className="text-gray-600">{t(`${id}.description`)}</p>
        </div>
        <p className="text-sm text-[#4299e1] font-medium">
          {assistants.length} {t(`${id}.assistantsAvailable`)}
        </p>
      </CardContent>
      <CardFooter className="bg-white">
        <Button asChild variant={buttonVariant as "gradient" | "gradient-warm" | "gradient-teal" | "gradient-purple" | "gradient-mixed"} className="w-full">
          <Link href={`/${locale}/organization/${id}`} className="w-full h-full flex items-center justify-center">
            {locale === 'nl' ? 'Bekijk assistenten' : 'View assistants'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 