"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { cn, getIcon } from "@/app/lib/utils";
import { OrganizationType } from "@/app/types";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";

interface OrganizationCardProps {
  organization: OrganizationType;
  className?: string;
}

// Functie om verschillende kleurstijlen toe te wijzen aan organisatietypes
function getOrganizationStyle(id: string) {
  const styleMap: Record<string, { borderColor: string, gradient: string, buttonVariant: string, bgColor: string, ctaVariant: string }> = {
    'hotel': { 
      borderColor: 'border-t-[#3182ce]', 
      gradient: 'bg-gradient-to-r from-[#3182ce] to-[#5a9bd3]',
      buttonVariant: 'gradient',
      bgColor: 'bg-blue-50',
      ctaVariant: 'cta-sky'
    },
    'legal': { 
      borderColor: 'border-t-[#ff9e2c]', 
      gradient: 'bg-gradient-to-r from-[#ff9e2c] to-[#e02424]',
      buttonVariant: 'gradient-warm',
      bgColor: 'bg-orange-50',
      ctaVariant: 'cta-orange'
    },
    'municipality': { 
      borderColor: 'border-t-[#16bdca]', 
      gradient: 'bg-gradient-to-r from-[#0d9488] to-[#16bdca]',
      buttonVariant: 'gradient-teal',
      bgColor: 'bg-teal-50',
      ctaVariant: 'cta-green'
    },
    'healthcare': { 
      borderColor: 'border-t-[#7e3af2]', 
      gradient: 'bg-gradient-to-r from-[#5a67d8] to-[#7e3af2]',
      buttonVariant: 'gradient-purple',
      bgColor: 'bg-purple-50',
      ctaVariant: 'cta-purple'
    },
    'accountant': {
      borderColor: 'border-t-[#0284c7]',
      gradient: 'bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]',
      buttonVariant: 'gradient',
      bgColor: 'bg-sky-50',
      ctaVariant: 'cta-sky'
    },
    'rental': {
      borderColor: 'border-t-[#059669]',
      gradient: 'bg-gradient-to-r from-[#059669] to-[#10b981]',
      buttonVariant: 'gradient-teal',
      bgColor: 'bg-emerald-50',
      ctaVariant: 'cta-green'
    }
  };

  // Fallback stijl als de ID niet in de map staat
  return styleMap[id] || { 
    borderColor: 'border-t-[#5a9bd3]', 
    gradient: 'bg-gradient-to-r from-[#3182ce] to-[#7e3af2]',
    buttonVariant: 'gradient-mixed',
    bgColor: 'bg-blue-50',
    ctaVariant: 'cta'
  };
}

export function OrganizationCard({ organization, className }: OrganizationCardProps) {
  const { id, name, description, icon, assistants, assistantsAvailable } = organization;
  const IconComponent = getIcon(icon.replace("-icon", ""));
  const { borderColor, gradient, buttonVariant, bgColor, ctaVariant } = getOrganizationStyle(id);
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("organizationTypes");
  const cardT = useTranslations("organizationCard");
  
  // Aantal assistenten bepalen, met fallback naar assistantsAvailable of 0
  const assistantCount = assistants?.length || assistantsAvailable || 0;
  
  const organizationUrl = `/${locale}/organization/${id}`;
  
  return (
    <Link href={organizationUrl} className="block">
      <Card className={cn(`hover:shadow-lg transition-all duration-300 border-t-4 ${borderColor} border-gray-100 shadow-sm hover:translate-y-[-5px] cursor-pointer`, className)}>
        <CardHeader className={`space-y-1 ${bgColor} rounded-t-lg`}>
          <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-2 shadow-sm`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl text-[#2c5282]">{t(`${id}.name`)}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <div className="h-24 overflow-hidden mb-4">
            <p className="text-gray-600">{t(`${id}.description`)}</p>
          </div>
          
          <div className="flex items-center text-sm text-[#4299e1] font-medium mb-3 mt-2">
            <span className="flex items-center bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              <span>{assistantCount}</span>
              <span className="ml-1">{t(`${id}.assistantsAvailable`)}</span>
            </span>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                {locale === 'nl' 
                  ? `AI gestuurde automatisering voor uw ${t(`${id}.name`).toLowerCase()}` 
                  : `AI-driven automation for your ${t(`${id}.name`).toLowerCase()}`
                }
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                {locale === 'nl'
                  ? 'Op maat gemaakte assistenten voor uw behoeften'
                  : 'Custom-made assistants for your needs'
                }
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-4 flex flex-col gap-2">
          <Button variant={ctaVariant as "cta" | "cta-green" | "cta-orange" | "cta-purple" | "cta-sky"} size="lg" className="w-full" onClick={(e) => e.preventDefault()}>
            <div className="w-full h-full flex items-center justify-center">
              {cardT('chooseType')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 