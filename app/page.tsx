import { redirect } from 'next/navigation';
import { defaultLocale } from './i18n/config';

// Deze pagina zorgt voor onmiddellijke omleiding naar de standaard taalversie
export default function RootPage() {
  // Stuur bezoekers van de root-route door naar de standaardtaalversie
  redirect(`/${defaultLocale}`);
} 