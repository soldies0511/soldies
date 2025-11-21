import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Product, SugarLevel, IceLevel, Topping, CartItem } from '../types';
import { TOPPINGS, SUGAR_OPTIONS, ICE_OPTIONS } from '../constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [sugar, setSugar] = useState<SugarLevel>(SugarLevel.REGULAR);
  const [ice, setIce] = useState<IceLevel>(IceLevel.REGULAR_ICE);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSugar(SugarLevel.REGULAR);
      setIce(IceLevel.REGULAR_ICE);
      setSelectedToppings([]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings(prev => 
      prev.some(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const basePrice = product.price;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = basePrice + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      product,
      sugar: product.isDrink ? sugar : undefined,
      ice: product.isDrink ? ice : undefined,
      toppings: selectedToppings,
      quantity,
      totalPrice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-scaleUp">
        
        {/* Image & Visuals Section */}
        <div className="w-full md:w-5/12 bg-slate-50 flex flex-col">
          <div className="h-64 md:h-1/2 overflow-hidden relative">
             <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 bg-white/80 p-2 rounded-full md:hidden hover:bg-white"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Flavor Radar Chart using Recharts */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center border-t border-slate-200">
             <h4 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-2">Flavor Profile</h4>
             {product.flavorProfile ? (
               <div className="w-full h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={product.flavorProfile}>
                     <PolarGrid stroke="#e2e8f0" />
                     <PolarAngleAxis dataKey="attribute" tick={{ fill: '#64748b', fontSize: 10 }} />
                     <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                     <Radar
                       name={product.name}
                       dataKey="value"
                       stroke="#059669"
                       strokeWidth={2}
                       fill="#10b981"
                       fillOpacity={0.3}
                     />
                     <Tooltip />
                   </RadarChart>
                 </ResponsiveContainer>
               </div>
             ) : (
               <div className="flex flex-col items-center text-slate-400 gap-2">
                 <AlertCircle />
                 <span className="text-xs">No profile available</span>
               </div>
             )}
          </div>
        </div>

        {/* Customization Section */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{product.name}</h2>
              <p className="text-slate-500 mt-1 text-sm">{product.description}</p>
            </div>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-slate-100 rounded-full">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          {product.isDrink && (
            <div className="space-y-6 mb-6">
              {/* Sugar Level */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Sugar Level</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {SUGAR_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSugar(opt)}
                      className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
                        sugar === opt 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ice Level */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Ice Level</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {ICE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setIce(opt)}
                      className={`py-2 px-1 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
                        ice === opt 
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-100' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Toppings */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Toppings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPPINGS.map(topping => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                      <span className={`text-sm ${isSelected ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{topping.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">+${topping.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
             <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl w-full sm:w-auto justify-center">
               <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-100 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                 <Minus size={20} />
               </button>
               <span className="text-lg font-bold text-slate-800 w-8 text-center">{quantity}</span>
               <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-100"
              >
                 <Plus size={20} />
               </button>
             </div>

             <button 
              onClick={handleAddToCart}
              className="w-full flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
               <span>Add to Order</span>
               <span className="bg-white/20 px-2 py-0.5 rounded text-sm ml-2">${totalPrice.toFixed(2)}</span>
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper icons for the counter
const Minus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
