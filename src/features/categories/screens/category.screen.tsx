import { getAllCategories } from "@/features/categories/server/category.actions";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryScreen() {
  let response;
  try {
    response = await getAllCategories();
  } catch (error) {
    console.error("Failed to load categories on category screen:", error);
    response = { data: [] };
  }

  const categories = response?.data ?? [];

  return (
    <>
      {/* Green Header Banner */}
      <section className="bg-emerald-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium">Categories</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-inner">
              <FontAwesomeIcon icon={faLayerGroup} className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">All Categories</h1>
              <p className="text-white/80">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {categories.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No categories available.
              </div>
            ) : (
              categories.map((category) => {
                return (
                  <Link
                    href={`/categories/${category._id}`}
                    key={category._id}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 group ring-1 ring-gray-100"
                  >
                    <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-50 mb-6 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        fill
                        src={category.image}
                        alt={category.name}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
