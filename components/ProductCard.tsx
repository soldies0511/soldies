import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.isDrink && (
          <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            Food
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-slate-800 text-lg leading-tight">{product.name}</h3>
          <span className="font-bold text-emerald-600 text-lg">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
        
        <button 
          onClick={() => onAdd(product)}
          className="w-full mt-auto flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200 active:scale-95"
        >
          <Plus size={18} />
          <span>Add to Order</span>
        </button>
      </div>
    </div>
  );
};
