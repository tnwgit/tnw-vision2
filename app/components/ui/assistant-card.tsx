import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Assistant } from "@/app/types";

interface AssistantCardProps {
  assistant: Assistant;
  className?: string;
}

// Functie om verschillende kleuren toe te wijzen aan assistenten op basis van hun ID
function getCardStyle(id: string) {
  const styleMap: Record<string, { borderColor: string, gradient: string }> = {
    'hotel-concierge': { 
      borderColor: 'border-t-[#3182ce]', 
      gradient: 'bg-gradient-to-r from-[#3182ce] to-[#5a9bd3]'
    },
    'hotel-booking': { 
      borderColor: 'border-t-[#7e3af2]', 
      gradient: 'bg-gradient-to-r from-[#5a67d8] to-[#7e3af2]'
    },
    'hotel-upsell': { 
      borderColor: 'border-t-[#16bdca]', 
      gradient: 'bg-gradient-to-r from-[#0d9488] to-[#16bdca]'
    },
    'legal-research': { 
      borderColor: 'border-t-[#ff9e2c]', 
      gradient: 'bg-gradient-to-r from-[#ff9e2c] to-[#e02424]'
    },
  };

  // Fallback stijl als de ID niet in de map staat
  return styleMap[id] || { 
    borderColor: 'border-t-[#3182ce]', 
    gradient: 'bg-gradient-to-r from-[#3182ce] to-[#7e3af2]'
  };
}

export function AssistantCard({ assistant, className }: AssistantCardProps) {
  const { id, name, description, image, benefits, organizationTypeId } = assistant;
  const { borderColor, gradient } = getCardStyle(id);
  
  return (
    <Card className={cn(`overflow-hidden hover:shadow-lg transition-all border-t-4 ${borderColor}`, className)}>
      <div className={`h-48 ${gradient} relative`}>
        {/* Placeholder for image - in a real app you'd use Next Image component */}
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-40" 
          style={{ backgroundImage: `url(${image || '/images/placeholder.jpg'})` }} 
        />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white text-2xl font-bold drop-shadow-md">{name}</h3>
        </div>
      </div>
      
      <CardContent className="pt-6 bg-[#f9fafb]">
        <p className="text-gray-600 mb-6">{description}</p>
        
        <h4 className="font-medium text-[#2c5282] mb-3">Key Benefits:</h4>
        <ul className="space-y-2">
          {benefits.slice(0, 3).map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#3dad7e] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{benefit}</span>
            </li>
          ))}
          {benefits.length > 3 && (
            <li className="text-sm text-[#3182ce] font-medium pl-7">
              +{benefits.length - 3} more benefits
            </li>
          )}
        </ul>
      </CardContent>
      
      <CardFooter className="border-t pt-6 gap-4 bg-white">
        <Button 
          asChild 
          variant="outline" 
          className="flex-1 border-[#5a9bd3] text-[#2c5282] hover:bg-[#f0f9ff]"
        >
          <Link href={`/organization/${organizationTypeId}/assistant/${id}`} className="w-full h-full flex items-center justify-center">
            Learn More
          </Link>
        </Button>
        <Button 
          asChild 
          variant={id.includes('hotel') ? 'gradient' : 
                  id.includes('legal') ? 'gradient-warm' : 
                  id.includes('municipality') ? 'gradient-teal' : 'gradient-mixed'}
          className="flex-1"
        >
          <Link href={`/organization/${organizationTypeId}/assistant/${id}/configure`} className="w-full h-full flex items-center justify-center">
            Configure
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 