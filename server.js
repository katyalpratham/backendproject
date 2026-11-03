import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory Database
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    image: "images/pizza.jpg",
    description: "Classic Italian pizza with melting mozzarella, fresh cherry tomatoes, and aromatic basil leaves."
  },
  {
    id: 2,
    name: "Pepperoni Feast Pizza",
    price: 399,
    category: "Pizza",
    image: "images/pepperoni.jpg",
    description: "Loaded with double crispy pepperoni slices, melted mozzarella, and fresh oregano."
  },
  {
    id: 3,
    name: "Cheese Burger",
    price: 199,
    category: "Burger",
    image: "images/burger.jpg",
    description: "Juicy flame-grilled beef patty with melted cheddar, fresh lettuce, tomato, and house signature sauce."
  },
  {
    id: 4,
    name: "Crispy Chicken Burger",
    price: 229,
    category: "Burger",
    image: "images/burger.jpg",
    description: "Crispy fried chicken breast, spicy mayonnaise, pickles, and shredded lettuce on a toasted bun."
  },
  {
    id: 5,
    name: "Butter Chicken with Naan",
    price: 349,
    category: "Indian Food",
    image: "images/butter_chicken.jpg",
    description: "Tender roasted chicken cooked in a rich, creamy tomato butter sauce, served with butter naan."
  },
  {
    id: 6,
    name: "Hyderabadi Chicken Biryani",
    price: 329,
    category: "Indian Food",
    image: "images/butter_chicken.jpg",
    description: "Aromatic basmati rice cooked with succulent chicken, saffron, and exotic spices, served with raita."
  },
  {
    id: 7,
    name: "Chocolate Lava Cake",
    price: 149,
    category: "Desserts",
    image: "images/dessert.jpg",
    description: "Warm chocolate cake with a molten liquid chocolate center, served with vanilla scoop."
  },
  {
    id: 8,
    name: "New York Cheesecake",
    price: 179,
    category: "Desserts",
    image: "images/dessert.jpg",
    description: "Classic creamy cheesecake on a buttery graham crust, topped with sweet strawberry sauce."
  },
  {
    id: 9,
    name: "Virgin Mojito",
    price: 119,
    category: "Drinks",
    image: "images/pizza.jpg",
    description: "Refreshing blend of fresh mint, lime wedges, simple syrup, and sparkling club soda."
  },
  {
    id: 10,
    name: "Mango Lassi",
    price: 99,
    category: "Drinks",
    image: "images/pepperoni.jpg",
    description: "Traditional sweet yogurt drink blended with fresh mango pulp and cardamom."
  }
];

const orders = [];

// API Routes

// GET /api/menu - Get all menu items
app.get('/api/menu', (req, res) => {
  res.status(200).json(menuItems);
});

// GET /api/menu/:id - Get specific menu item
app.get('/api/menu/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = menuItems.find(i => i.id === itemId);
  
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Food item not found" });
  }
});

// POST /api/order - Place a new order
app.post('/api/order', (req, res) => {
  const { customerName, phone, address, paymentMethod, items, totalAmount } = req.body;

  // Simple validation
  if (!customerName || !phone || !address || !paymentMethod || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Missing required order details" });
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    customerName,
    phone,
    address,
    paymentMethod,
    items,
    totalAmount,
    status: "Confirmed",
    timestamp: new Date()
  };

  orders.push(newOrder);

  // Return success with order details
  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    order: newOrder
  });
});

// Serve HTML Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Fallback route for SPA or 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
