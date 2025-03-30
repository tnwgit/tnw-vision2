import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MainLayout } from '@/app/components/layout/main-layout';
import { Button } from '@/app/components/ui/button';

export default function NotFound() {
  const t = useTranslations('notFound');
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t('subtitle')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('description')}
          </p>
          <Button variant="gradient">
            <Link href="/" className="w-full h-full flex items-center justify-center">
              {t('backHome')}
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
} 