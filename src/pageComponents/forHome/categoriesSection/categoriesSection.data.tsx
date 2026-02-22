import beltImg from "@/assets/belt.png";
import strapsImg from "@/assets/lifting-strap.png";
import tapeRollImg from "@/assets/tape-roll.png";
import kneeSleeves from "@/assets/sleeves.png";

export const categories = [
  {
    name: "Lever Belts",
    filterKey: "lever-belts",
    color: "bg-brand",
    description: "Premium lifting belts for maximum support and performance.",
    image: beltImg,
  },
  {
    name: "Grip Tape",
    filterKey: "grip-tape",
    color: "bg-neutral-900",
    description:
      "High-quality grip tape to enhance your hold and boost your lifts.",
    image: tapeRollImg,
  },
  {
    name: "Lifting Straps",
    filterKey: "lifting-straps",
    color: "bg-red-950",
    description: "Heavy-duty straps to push your limits on every lift.",
    image: strapsImg,
  },
  {
    name: "Knee Sleeves",
    filterKey: "knee-sleeves",
    color: "bg-zinc-800",
    description:
      "Support and protection for your knees during intense workouts.",
    image: kneeSleeves,
  },
];
