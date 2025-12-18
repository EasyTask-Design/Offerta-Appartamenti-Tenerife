
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  category: 'core' | 'optional' | 'recurring';
  icon: string;
  benefits: string[];
}

export interface Package {
  name: string;
  price: string;
  items: string[];
}
