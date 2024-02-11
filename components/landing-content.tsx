"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "The Seasoned Developer",
    avatar: "S",
    title: "Software Developer",
    description:
      "Even with years of experience, this AI has saved me countless hours. Whether it's optimizing existing code, suggesting cleaner logic, or helping me tackle a new framework, this tool is an invaluable member of my development team.",
  },
  {
    name: "The Designer's Sidekick",
    avatar: "D",
    title: "Designer",
    description:
      "This AI is a game-changer for my design workflow! It generates image variations faster than I can sketch them, giving me instant inspiration. Whether I need a basic UI mockup or an eye-catching illustration, this tool speeds up my process while opening new creative possibilities.",
  },
  {
    name: "The Marketing Whiz",
    avatar: "M",
    title: "Marketer",
    description:
      "Being a solo marketer, I need all the help I can get. This AI is my secret weapon. It writes snappy ad copy, crafts engaging social posts, and even puts together short, attention-grabbing videos for my campaigns. The time it saves me is worth its weight in gold.",
  },
  {
    name: "The Aspiring Coder",
    avatar: "C",
    title: "Student",
    description:
      "As a programming newbie, I get stuck...a lot. This AI has been my study buddy. It generates code snippets to explain concepts, debugs my work, and suggests clever ways to tackle problems. I'm learning faster and building confidence thanks to this tool.",
  },
  {
    name: "The Overwhelmed Writer",
    avatar: "W",
    title: "Content writer",
    description:
      "Writer's block is my worst enemy. This AI gets me going!  Need a captivating intro? No problem. Stuck on a plot point? It offers creative story twists. Even basic grammar checks! It's like having a brainstorming partner and editor all in one.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
