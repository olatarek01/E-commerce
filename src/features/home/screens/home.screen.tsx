import DealsBanner from "../componants/DealsBanner";
import FeaturedProducts from "../componants/FeaturedProducts";
import Newsletter from "../componants/Newsletter";
import OurCategories from "../componants/OurCategories";
import PromoBanner from "../componants/PromoBanner";
import Slider from "../componants/Slider";

export default function HomeScreen() {
  return (
    <>
      <Slider />
      <PromoBanner />
      <OurCategories />
      <DealsBanner />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
