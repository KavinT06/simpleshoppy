import { useState, useEffect } from 'react';
import { products } from '../data/products'; // Import the static data
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductList() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Use the static data instead of fetching
        setFilteredProducts(products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
    }, []);

    // Filter products based on search term and category
    useEffect(() => {
        let result = products;
        
        // Filter by search term
        if (searchTerm) {
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Filter by category
        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }
        
        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    if (loading) return <LoadingSpinner />;
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full p-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="md:w-1/2">
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {filteredProducts.length === 0 ? (
                <p className="text-center py-8">No products found matching your criteria.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;