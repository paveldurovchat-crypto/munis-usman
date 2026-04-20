import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import fabricDetails from "@/assets/fabric-details.jpg";
import phoneCase from "@/assets/phone-case.jpg";
import embroideryHands from "@/assets/embroidery-hands.jpg";
import journal3 from "@/assets/journal-3.jpg";

export type Product = {
  slug: string;
  image: string;
  nameKey: string;
  descKey: string;
  tagKey: "collection.limited" | "collection.madeToOrder";
};

export const products: Product[] = [
  {
    slug: "emerald-dress",
    image: collection1,
    nameKey: "collection.item1Name",
    descKey: "collection.item1Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "pomegranate-scarf",
    image: embroideryHands,
    nameKey: "collection.item2Name",
    descKey: "collection.item2Desc",
    tagKey: "collection.madeToOrder",
  },
  {
    slug: "tashkent-coat",
    image: collection3,
    nameKey: "collection.item3Name",
    descKey: "collection.item3Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "sand-dress",
    image: journal3,
    nameKey: "collection.item4Name",
    descKey: "collection.item4Desc",
    tagKey: "collection.madeToOrder",
  },
  {
    slug: "ornament-case",
    image: phoneCase,
    nameKey: "collection.item5Name",
    descKey: "collection.item5Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "dawn-silk",
    image: fabricDetails,
    nameKey: "collection.item6Name",
    descKey: "collection.item6Desc",
    tagKey: "collection.madeToOrder",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
