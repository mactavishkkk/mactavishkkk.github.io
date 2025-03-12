export type Offer = {
  id: string;
  title: string;
  originalPrice: number;
  offerPrice: number;
  category: string;
  description: string;
  isActive: boolean;
  owner?: {
    companyName?: string | null;
  };
};
