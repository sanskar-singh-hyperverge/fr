import React, { useState } from 'react';
import { Button, BuffetCard } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  title: string;
  description: string[];
  price: number;
  quantity: number;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'large',
      title: 'Large Menu',
      description: ['Large Popcorn', 'Large Coca Cola (400 mL)'],
      price: 30,
      quantity: 1
    },
    {
      id: 'medium',
      title: 'Medium Menu',
      description: ['Medium Popcorn', 'Medium Coca Cola (330 mL)'],
      price: 20,
      quantity: 0
    },
    {
      id: 'small',
      title: 'Small Menu',
      description: ['Small Popcorn', 'Small Coca Cola (250 mL)'],
      price: 15,
      quantity: 0
    },
    {
      id: 'double',
      title: 'M. Double Menu',
      description: ['Medium Popcorn (x2)', 'Medium Coca Cola (330 mL) (x2)'],
      price: 30,
      quantity: 0
    },
    {
      id: 'family',
      title: 'Family Menu',
      description: ['Large Popcorn (x2)', 'Large Coca Cola (400 mL) (x2)', 'Nachos'],
      price: 45,
      quantity: 0
    },
    {
      id: 'kids',
      title: 'Kids Menu',
      description: ['Small Popcorn', 'Small Juice', 'Candy'],
      price: 18,
      quantity: 0
    }
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = menuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-6 space-y-4">
          <div className="space-y-4">
            {menuItems.slice(0, 3).map((item) => (
              <BuffetCard
                key={item.id}
                imageSrc="https://picsum.photos/300/200"
                title={item.title}
                description={item.description}
                price={item.price}
                initialQuantity={item.quantity}
                minQuantity={0}
                maxQuantity={10}
                onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                customSize={{ width: "351px", height: "150px" }}
                className="bg-black/20 border border-purple-600/20 rounded-xl"
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white">•</span>
              <p className="text-white text-lg">Advantageous Dual Menus</p>
            </div>
            {menuItems.slice(3).map((item) => (
              <div key={item.id} className="mb-4">
                <BuffetCard
                  imageSrc="https://picsum.photos/300/200"
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  initialQuantity={item.quantity}
                  minQuantity={0}
                  maxQuantity={10}
                  onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                  customSize={{ width: "351px", height: "150px" }}
                  className="bg-black/20 border border-purple-600/20 rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalAmount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-white text-lg">Price:</span>
                <span className="text-green-700 text-2xl font-bold animate-pulse">${totalAmount}</span>
            </div>
            <Button
              label="Add to Cart"
              type="primary"
              size="small"
              onClick={() => navigate('/ticket_details')}
              className="ml-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;