import { createContext, useState , useEffect} from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load cart from localStorage when the app starts
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to add item to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // If product already in cart, increase quantity
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // If new product, add with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Function to remove item from cart
    const removeFromCart = (product) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) // Remove items with quantity 0
        );
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
