import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHeadset, faShieldAlt, faTruck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PromoBanner() {
  const features = [{
    icon: faTruck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    bgColor: "bg-blue-50",
    color: "text-blue-500",
  },
  {
    icon: faShieldAlt,
    title: "Safe Payment",
    description: "100% secure payment",
    bgColor: "bg-emerald-50",
    color: "text-emerald-500",
  },
  {
    icon: faUndo,
    title: "Easy Returns",
    description: "14 days money back guarantee",
    bgColor: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    icon: faHeadset,
    title: "24/7 Support",
    description: "Dedicated support team",
    bgColor: "bg-purple-50",
    color: "text-purple-500"
  }
  ]
  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-emerald-100 group"
              >
                <div
                  className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}
                >
                  <FontAwesomeIcon icon={feature.icon} className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-tight">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
