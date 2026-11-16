
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  color: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    color: "White",
  },
  {
    id: 2,
    name: "Premium Leather Backpack",
    category: "Bags",
    price: 3299,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    color: "Black",
  },
  {
    id: 3,
    name: "Minimal Classic Watch",
    category: "Accessories",
    price: 1899,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    color: "Black",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 4999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    color: "Black",
  },
  {
    id: 5,
    name: "Casual Running Shoes",
    category: "Footwear",
    price: 2799,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    color: "Red",
  },
  {
    id: 6,
    name: "Everyday Shoulder Bag",
    category: "Bags",
    price: 2199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    color: "Brown",
  },
  {
    id: 7,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 1499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    color: "Black",
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Electronics",
    price: 5999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    color: "Silver",
  },
];
