export interface Reward {
  id: number;
  nameAr: string;
  nameEn: string;
  emoji: string;
  points: number;
  desc: string;
}

export const rewards: Reward[] = [
  { id: 1, nameAr: 'مشروب مجاني',       nameEn: 'Free Drink',       emoji: '🥤', points: 50,  desc: 'أي مشروب من قائمتنا مجاناً مع طلبك القادم' },
  { id: 2, nameAr: 'حلى مجاني',         nameEn: 'Free Dessert',     emoji: '🍰', points: 80,  desc: 'أي حلى من قائمتنا مجاناً' },
  { id: 3, nameAr: 'دجاجة مقرمشة',      nameEn: 'Free Chicken',     emoji: '🍗', points: 100, desc: 'قطعة دجاج مقرمشة واحدة مجاناً' },
  { id: 4, nameAr: 'خصم 20٪',           nameEn: '20% Discount',     emoji: '🏷️', points: 150, desc: 'خصم 20٪ على طلبك التالي بدون حد أدنى' },
  { id: 5, nameAr: 'وجبة دبل باكت',     nameEn: 'Double Bucket',    emoji: '🍱', points: 200, desc: 'وجبة دبل باكت كاملة مع مشروب وطرف' },
  { id: 6, nameAr: 'وجبة عيلة',         nameEn: 'Family Meal',      emoji: '👨‍👩‍👧', points: 350, desc: 'وجبة عيلة كاملة تكفي 4 أشخاص' },
];
