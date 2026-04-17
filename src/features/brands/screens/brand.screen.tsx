import { getAllBrands } from "@/features/brands/server/brand.actions";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function BrandsScreen() {
    let response;
    try {
        response = await getAllBrands();
    } catch (error) {
        console.error("Failed to load brands:", error);
        response = { data: [] };
    }

    const brands = response?.data ?? [];

    return (
        <>
            {/* Purple Header Banner */}
            <section className="bg-indigo-600 py-12 text-white">
                <div className="container mx-auto px-4">
                    <nav className="text-sm mb-6 opacity-90">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium">Brands</span>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-inner">
                            <FontAwesomeIcon icon={faTags} className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-1">Top Brands</h1>
                            <p className="text-white/80">
                                Shop from your favorite brands
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Grid */}
            <section id="brands" className="py-16 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {brands.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">
                                No brands available now.
                            </div>
                        ) : (
                            brands.map((brand) => (
                                <Link
                                    href={`/brands/${brand._id}`}
                                    key={brand._id}
                                    className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100 flex flex-col items-center justify-center aspect-square"
                                >
                                    <div className="relative w-full h-3/4 mb-4 group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            fill
                                            src={brand.image}
                                            alt={brand.name}
                                            className="object-contain"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                                        />
                                    </div>
                                    <div className="mt-auto flex flex-col items-center">
                                        <h3 className="font-semibold text-sm text-gray-800 group-hover:text-indigo-700 transition-colors uppercase tracking-tight">
                                            {brand.name}
                                        </h3>
                                        <div className="h-4 overflow-hidden">
                                            <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <span className="text-[10px] text-indigo-500 font-bold">
                                                    View Products →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
