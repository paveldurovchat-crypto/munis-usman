import caseBukharaHand from "@/assets/case-bukhara-hand.jpg";
import caseSamarkandDome from "@/assets/case-samarkand-dome.jpg";
import caseSamarkandArch from "@/assets/case-samarkand-arch.jpg";
import caseOrangeOrnament from "@/assets/case-orange-ornament.jpg";
import caseSwallowPomegranate from "@/assets/case-swallow-pomegranate.jpg";
import casePomegranateWoman from "@/assets/case-pomegranate-woman.jpg";
import caseBukharaAirpods from "@/assets/case-bukhara-airpods.jpg";
import caseSamarkandStone from "@/assets/case-samarkand-stone.jpg";
import jacketMusician from "@/assets/jacket-musician.jpg";
import artPomegranateWoman from "@/assets/art-pomegranate-woman.jpg";

export type Product = {
  slug: string;
  image: string;
  nameKey: string;
  descKey: string;
  tagKey: "collection.limited" | "collection.madeToOrder";
};

export const products: Product[] = [
  {
    slug: "case-bukhara",
    image: caseBukharaHand,
    nameKey: "collection.item1Name",
    descKey: "collection.item1Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "case-samarkand-dome",
    image: caseSamarkandDome,
    nameKey: "collection.item2Name",
    descKey: "collection.item2Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "case-samarkand-arch",
    image: caseSamarkandArch,
    nameKey: "collection.item3Name",
    descKey: "collection.item3Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "case-orange-ornament",
    image: caseOrangeOrnament,
    nameKey: "collection.item4Name",
    descKey: "collection.item4Desc",
    tagKey: "collection.madeToOrder",
  },
  {
    slug: "case-swallow-pomegranate",
    image: caseSwallowPomegranate,
    nameKey: "collection.item5Name",
    descKey: "collection.item5Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "case-pomegranate-woman",
    image: casePomegranateWoman,
    nameKey: "collection.item6Name",
    descKey: "collection.item6Desc",
    tagKey: "collection.madeToOrder",
  },
  {
    slug: "case-bukhara-sky",
    image: caseBukharaAirpods,
    nameKey: "collection.item7Name",
    descKey: "collection.item7Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "case-samarkand-stone",
    image: caseSamarkandStone,
    nameKey: "collection.item8Name",
    descKey: "collection.item8Desc",
    tagKey: "collection.limited",
  },
  {
    slug: "jacket-musician",
    image: jacketMusician,
    nameKey: "collection.item9Name",
    descKey: "collection.item9Desc",
    tagKey: "collection.madeToOrder",
  },
  {
    slug: "art-pomegranate-woman",
    image: artPomegranateWoman,
    nameKey: "collection.item10Name",
    descKey: "collection.item10Desc",
    tagKey: "collection.madeToOrder",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
