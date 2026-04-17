import BrandProductsScreen from "@/features/brands/screens/brand-products.screen";
import { getBrandById } from "@/features/brands/server/brand.actions";
import { Metadata } from "next";

interface BrandProductsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: BrandProductsPageProps): Promise<Metadata> {
    const { id } = await params;
    try {
        const response = await getBrandById(id);
        return {
            title: `${response.data.name} Products | FreshCart`,
            description: `Shop products from ${response.data.name} brand at FreshCart.`,
        };
    } catch {
        return {
            title: "Brand Products | FreshCart",
        };
    }
}

export default async function BrandProductsPage({
    params,
}: BrandProductsPageProps) {
    const { id } = await params;
    return <BrandProductsScreen brandId={id} />;
}
