const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// تقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// قاعدة بيانات المنتجات الأولية
let products = [
    {
        id: 1,
        name: 'تيشرت صيفي أسود قطن Premium',
        price: 320,
        category: 'تيشرتات',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80'
    },
    {
        id: 2,
        name: 'تيشرت أبيض اوفر سايز العصري',
        price: 350,
        category: 'تيشرتات',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80'
    },
    {
        id: 3,
        name: 'بنطلون جينز أزرق كلاسيك',
        price: 550,
        category: 'بناطيل',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80'
    }
];

// API لجلب المنتجات
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API لإضافة منتج جديد بواسطة صاحب المتجر
app.post('/api/products', (req, res) => {
    const { name, price, category, image } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'يرجى إدخال اسم المنتج والسعر' });
    }
    const newProduct = {
        id: Date.now(),
        name,
        price: Number(price),
        category: category || 'عام',
        image: image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80'
    };
    products.push(newProduct);
    res.json({ message: 'تم إضافة المنتج بنجاح!', product: newProduct });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`سيرفر متجر صلاح أبو محمد يعمل على http://localhost:${PORT}`);
});