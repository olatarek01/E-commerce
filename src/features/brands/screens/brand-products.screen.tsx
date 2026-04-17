import { getProductsByBrand } from "@/features/products/server/product.actions";
import { getBrandById } from "@/features/brands/server/brand.actions";
import ProductCard from "@/features/products/componants/ProductCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBoxOpen, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface BrandProductsScreenProps {
    brandId: string;
}

export default async function BrandProductsScreen({
    brandId,
}: BrandProductsScreenProps) {
    let productsResponse;
    let brandResponse;

    try {
        [productsResponse, brandResponse] = await Promise.all([
            getProductsByBrand(brandId),
            getBrandById(brandId),
        ]);
    } catch (error) {
        return (
            <div className="container mx-auto p-20 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Brand</h1>
                <p className="text-gray-600 mb-8">
                    We encountered a problem fetching the products for this brand. Please try again later.
                </p>
                <Link
                    href="/brands"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                >
                    Back to Brands
                </Link>
            </div>
        );
    }

    const brand = brandResponse.data;
    const products = productsResponse.data;

    return (
        <>
            {/* Brand Header (Green) */}
            <section className="bg-emerald-500 py-12 text-white">
                <div className="container mx-auto px-4">
                    <nav className="text-sm mb-6 opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href="/brands" className="hover:underline">
                            Brands
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium">{brand.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-lg w-20 h-20 relative overflow-hidden flex items-center justify-center">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-1">{brand.name}</h1>
                                <p className="text-white/80 uppercase tracking-wide text-xs font-semibold">
                                    Shop {brand.name} products
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/brands"
                            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg self-start md:self-auto"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Back to Brands
                        </Link>
                    </div>
                </div>
            </section>

            {/* Active Filters Bar */}
            <section className="bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                            <FontAwesomeIcon icon={faFilter} className="text-xs" />
                            <span>Active Filters:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full flex items-center gap-2 border border-indigo-100">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                <span className="font-medium">{brand.name}</span>
                                <Link href="/brands">
                                    <FontAwesomeIcon icon={faTimes} className="text-[10px] hover:text-indigo-800 transition-colors" />
                                </Link>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors ml-2">Clear all</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-gray-500 text-sm font-medium">Showing {products.length} products</span>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-gray-50/50 min-h-[400px]">
                <div className="container mx-auto px-4">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} info={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-gray-400 mb-4">
                                <FontAwesomeIcon
                                    icon={faBoxOpen}
                                    className="text-6xl opacity-20"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                No Products Found
                            </h2>
                            <p className="text-gray-500 mb-8">
                                We couldn't find any products for the {brand.name} brand.
                            </p>
                            <Link
                                href="/brands"
                                className="text-indigo-600 font-bold hover:underline"
                            >
                                Browse other brands
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
