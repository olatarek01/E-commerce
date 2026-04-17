import CategoryProductsScreen from "@/features/categories/screens/category-products.screen";

type CategoryDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function CategoryDetailsPage({
    params,
}: CategoryDetailsPageProps) {
    const { id } = await params;

    if (!id || id === "undefined" || id === "[id]") {
        return (
            <div className="container mx-auto p-20 text-center">
                <h1 className="text-2xl font-bold">Invalid Category</h1>
                <p>No category ID was provided.</p>
            </div>
        );
    }

    return (
        <>
            <CategoryProductsScreen categoryId={id} />
        </>
    );
}
