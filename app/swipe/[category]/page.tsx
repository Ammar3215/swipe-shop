import { categories, type Category } from '@/app/config/categories';
import CategoryContent from './CategoryContent';

export function generateStaticParams() {
  return categories.map(category => ({
    category,
  }));
}

interface Props {
  params: {
    category: Category;
  };
}

export default function CategoryPage({ params }: Props) {
  return <CategoryContent category={params.category} />;
} 