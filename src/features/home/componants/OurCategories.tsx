import { getAllCategories } from "@/features/categories/server/category.actions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function OurCategories() {
  let response;
  try {
    response = await getAllCategories();
  } catch (error) {
    console.error("Failed to load categories in OurCategories:", error);
    response = { data: [] };
  }

  const categories = response?.data ?? [];

  return (
    <>
      <section id="categories" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                Shop By <span className="text-emerald-600">Category</span>
              </h2>
            </div>
            {""}
            <Link
              href="/categories"
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center cursor-pointer"
            >
              View All Categories
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No categories available right now.
              </div>
            ) : (
              categories.map((category) => (
                <Link
                  href={`/categories/${category._id}`}
                  key={category._id}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-emerald-100 group flex flex-col items-center"
                >
                  <div className="h-24 w-24 overflow-hidden bg-emerald-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      width={120}
                      height={120}
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
