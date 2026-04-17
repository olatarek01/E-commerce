export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface BrandMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

export interface SingleBrandResponse {
    data: Brand;
}

export interface BrandResponse {
    results: number;
    metadata: BrandMetadata;
    data: Brand[];
}
