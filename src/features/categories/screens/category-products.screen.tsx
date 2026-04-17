import { getProductsByCategory } from "@/features/products/server/product.actions";
import { getCategoryById } from "@/features/categories/server/category.actions";
import ProductCard from "@/features/products/componants/ProductCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

interface CategoryProductsScreenProps {
  categoryId: string;
}

export default async function CategoryProductsScreen({
  categoryId,
}: CategoryProductsScreenProps) {
  let productsResponse;
  let categoryResponse;

  try {
    [productsResponse, categoryResponse] = await Promise.all([
      getProductsByCategory(categoryId),
      getCategoryById(categoryId),
    ]);
  } catch (error) {
    return (
      <div className="container mx-auto p-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Category</h1>
        <p className="text-gray-600 mb-8">
          We encountered a problem fetching the products for this category. Please try again later.
        </p>
        <Link
          href="/categories"
          className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  const category = categoryResponse.data;
  const products = productsResponse.data;

  return (
    <>
      {/* Category Header */}
      <section className="bg-emerald-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:underline">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-inner hidden sm:block">
                <FontAwesomeIcon icon={faBoxOpen} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">{category.name}</h1>
                <p className="text-white/80">
                  Showing {products.length} products in this category
                </p>
              </div>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg self-start md:self-auto"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Categories
            </Link>
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
                We couldn't find any products in the {category.name} category.
              </p>
              <Link
                href="/categories"
                className="text-emerald-600 font-bold hover:underline"
              >
                Browse other categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
