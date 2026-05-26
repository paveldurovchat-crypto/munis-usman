export type ProductCategory = "accessories" | "cloth" | "home" | "couture";

export type ProductColor = { name: string; hex: string };
export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  image?: string | null;
  nameKey: string;
  descKey: string;

  nameKey: string;
  descKey: string;
  tagKey: "collection.limited" | "collection.madeToOrder";
  category: ProductCategory;
  price: number;
  colors?: ProductColor[];
  specs?: ProductSpec[];
};

const caseSpecs = (material = "эко кожа"): ProductSpec[] => [
  { label: "Тип", value: "чехол" },
  { label: "Материал", value: material },
];

export const products: Product[] = [
  {
    slug: "case-bukhara",
    image: caseBukharaHand,
    nameKey: "collection.item1Name",
    descKey: "collection.item1Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 25,
    colors: [
      { name: "Ночь", hex: "#1a1a1a" },
      { name: "Терракота", hex: "#8B4513" },
    ],
    specs: caseSpecs(),
  },
  {
    slug: "case-samarkand-dome",
    image: caseSamarkandDome,
    nameKey: "collection.item2Name",
    descKey: "collection.item2Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 25,
    colors: [
      { name: "Бирюза", hex: "#2d8a9e" },
      { name: "Слоновая кость", hex: "#F5EDD8" },
    ],
    specs: caseSpecs(),
  },
  {
    slug: "case-samarkand-arch",
    image: caseSamarkandArch,
    nameKey: "collection.item3Name",
    descKey: "collection.item3Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 28,
    colors: [{ name: "Индиго", hex: "#1e3a5f" }],
    specs: caseSpecs(),
  },
  {
    slug: "case-orange-ornament",
    image: caseOrangeOrnament,
    nameKey: "collection.item4Name",
    descKey: "collection.item4Desc",
    tagKey: "collection.madeToOrder",
    category: "accessories",
    price: 32,
    colors: [
      { name: "Оранжевый", hex: "#d97742" },
      { name: "Слоновая кость", hex: "#F5EDD8" },
    ],
    specs: [
      { label: "Тип", value: "чехол" },
      { label: "Материал", value: "ручная роспись" },
      { label: "Производство", value: "на заказ" },
    ],
  },
  {
    slug: "case-swallow-pomegranate",
    image: caseSwallowPomegranate,
    nameKey: "collection.item5Name",
    descKey: "collection.item5Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 28,
    colors: [
      { name: "Песок", hex: "#EDE0C4" },
      { name: "Гранат", hex: "#8B1E2D" },
    ],
    specs: caseSpecs(),
  },
  {
    slug: "case-pomegranate-woman",
    image: casePomegranateWoman,
    nameKey: "collection.item6Name",
    descKey: "collection.item6Desc",
    tagKey: "collection.madeToOrder",
    category: "accessories",
    price: 34,
    colors: [{ name: "Слоновая кость", hex: "#F5EDD8" }],
    specs: [
      { label: "Тип", value: "чехол" },
      { label: "Материал", value: "ручная роспись" },
      { label: "Производство", value: "на заказ" },
    ],
  },
  {
    slug: "case-bukhara-sky",
    image: caseBukharaAirpods,
    nameKey: "collection.item7Name",
    descKey: "collection.item7Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 22,
    colors: [{ name: "Небо", hex: "#7dd3fc" }],
    specs: [
      { label: "Тип", value: "чехол AirPods" },
      { label: "Материал", value: "эко кожа" },
    ],
  },
  {
    slug: "case-samarkand-stone",
    image: caseSamarkandStone,
    nameKey: "collection.item8Name",
    descKey: "collection.item8Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 25,
    colors: [
      { name: "Камень", hex: "#a0938a" },
      { name: "Ночь", hex: "#1a1a1a" },
    ],
    specs: caseSpecs(),
  },
  {
    slug: "case-tashkent-night",
    image: caseTashkentNight,
    nameKey: "collection.item11Name",
    descKey: "collection.item11Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 26,
    colors: [{ name: "Сумерки", hex: "#3E5040" }],
    specs: caseSpecs(),
  },
  {
    slug: "case-swallow-blossom",
    image: caseSwallowBlossom,
    nameKey: "collection.item12Name",
    descKey: "collection.item12Desc",
    tagKey: "collection.limited",
    category: "accessories",
    price: 26,
    colors: [
      { name: "Сакура", hex: "#f9a8a8" },
      { name: "Сюзане", hex: "#3E5040" },
    ],
    specs: caseSpecs(),
  },
  {
    slug: "jacket-musician",
    image: jacketMusician,
    nameKey: "collection.item9Name",
    descKey: "collection.item9Desc",
    tagKey: "collection.madeToOrder",
    category: "cloth",
    price: 350,
    colors: [
      { name: "Уголь", hex: "#2a2a2a" },
      { name: "Слоновая кость", hex: "#F5EDD8" },
    ],
    specs: [
      { label: "Тип", value: "жакет" },
      { label: "Материал", value: "шерсть и вышивка" },
      { label: "Производство", value: "на заказ" },
    ],
  },
  {
    slug: "art-pomegranate-woman",
    image: artPomegranateWoman,
    nameKey: "collection.item10Name",
    descKey: "collection.item10Desc",
    tagKey: "collection.madeToOrder",
    category: "couture",
    price: 480,
    colors: [{ name: "Гранат", hex: "#8B1E2D" }],
    specs: [
      { label: "Тип", value: "авторская иллюстрация" },
      { label: "Материал", value: "бумага, акварель, рама" },
      { label: "Производство", value: "на заказ" },
    ],
  },
  {
    slug: "art-ikat-bride-light",
    image: artIkatBrideLight,
    nameKey: "collection.item13Name",
    descKey: "collection.item13Desc",
    tagKey: "collection.madeToOrder",
    category: "couture",
    price: 520,
    colors: [
      { name: "Свет", hex: "#F5EDD8" },
      { name: "Золото", hex: "#C4992D" },
    ],
    specs: [
      { label: "Тип", value: "авторский наряд" },
      { label: "Материал", value: "икат и вышивка" },
    ],
  },
  {
    slug: "art-ikat-bride-dark",
    image: artIkatBrideDark,
    nameKey: "collection.item14Name",
    descKey: "collection.item14Desc",
    tagKey: "collection.madeToOrder",
    category: "couture",
    price: 540,
    colors: [
      { name: "Ночь", hex: "#1a1a2e" },
      { name: "Золото", hex: "#C4992D" },
    ],
    specs: [
      { label: "Тип", value: "авторский наряд" },
      { label: "Материал", value: "икат и вышивка" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
