import beltImg from "@/assets/belt.webp";
import strapsImg from "@/assets/lifting-strap.webp";
import tapeRollImg from "@/assets/tape-roll.webp";
import kneeSleeves from "@/assets/sleeves.webp";

export const categories = [
  {
    nameKey: "categories.leverBelts",
    descriptionKey: "categories.leverBeltsDesc",
    filterKey: "lever-belts",
    color: "bg-brand",
    image: beltImg,
  },
  {
    nameKey: "categories.gripTape",
    descriptionKey: "categories.gripTapeDesc",
    filterKey: "grip-tape",
    color: "bg-neutral-900 dark:bg-neutral-700",
    image: tapeRollImg,
  },
  {
    nameKey: "categories.liftingStraps",
    descriptionKey: "categories.liftingStrapsDesc",
    filterKey: "lifting-straps",
    color: "bg-red-950",
    image: strapsImg,
  },
  {
    nameKey: "categories.kneeSleeves",
    descriptionKey: "categories.kneeSleevesDesc",
    filterKey: "knee-sleeves",
    color: "bg-zinc-800 dark:bg-zinc-600",
    image: kneeSleeves,
  },
];
