import { Shield, Wrench, Target, Trophy, ArrowRight, Heart } from "lucide-react";

export const whoWeAreText =
  "GymGear was built by lifters, for lifters. We started in a garage gym with one mission: create equipment that performs as hard as you do. Every product we sell has been tested under real iron — because we believe the gear you trust should never be the weakest link in your chain.";

export const standardsPillars = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Competition-Grade Materials",
    description:
      "Premium leather, reinforced stitching, and industrial-grade hardware — built to outlast your PRs.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Stress-Tested Design",
    description:
      "Every product is put through rigorous real-world testing before it ever reaches our shelves.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Purpose-Built Fit",
    description:
      "Engineered for function first. No gimmicks, no filler — just gear that works the way you need it to.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Athlete-Approved",
    description:
      "Trusted by competitive powerlifters, bodybuilders, and CrossFit athletes worldwide.",
  },
];

export const metricsData = [
  { value: "10K+", label: "Athletes Equipped" },
  { value: "50+", label: "Products Tested" },
  { value: "4.9★", label: "Average Rating" },
];

export const trustText =
  "Every order is backed by our 30-day satisfaction guarantee. If it doesn't perform, we'll make it right — no questions asked.";

export const guaranteePoints = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "30-Day Guarantee",
    desc: "Doesn't perform? Full refund. No hoops.",
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    title: "Free Shipping Over $100",
    desc: "Straight to your door, no extra charge.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Built By Lifters",
    desc: "We use this gear. We know what works.",
  },
];

export const ctaText = "Shop the Full Line";
