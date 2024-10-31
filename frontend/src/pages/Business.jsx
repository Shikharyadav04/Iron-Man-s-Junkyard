import { assets } from '@/assets/assets';
import Scroll from '../components/Scroll';
import React from 'react';
import BackgroundBeams from "../components/BackgroundBeams";

const content = [
  {
    title: "Career Growth Opportunities",
    description:
      "Joining Scrapman Company opens up a pathway for significant career growth in the waste management and recycling industry. As a leading waste collection company, Scrapman prioritizes the professional development of its employees. With access to training programs, mentorship, and a clear progression framework, employees can enhance their skills and knowledge, positioning themselves for promotions and leadership roles. The company’s commitment to fostering talent creates a motivating work environment that encourages continuous learning.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src={assets.scrapman}
          width={200}
          height={100}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Contribution to Environmental Sustainability",
    description:
      "By working with Scrapman, employees play a crucial role in promoting environmental sustainability. The company focuses on recycling and waste reduction, contributing to a cleaner planet. Being part of this mission allows employees to feel a sense of purpose and pride in their work, knowing that their efforts directly impact the environment. Engaging in initiatives that promote recycling not only benefits the community but also enhances employees' understanding of sustainable practices, making them advocates for eco-friendly solutions.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src={assets.scrapman}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Competitive Compensation and Benefits",
    description:
      "Scrapman Company offers competitive compensation packages that reflect the industry standards. Employees receive comprehensive benefits, including health insurance, retirement plans, and paid time off. Additionally, the company may provide performance-based bonuses and incentives to reward hard work and dedication. This commitment to employee well-being ensures that staff feel valued and motivated to perform their best, fostering a positive workplace culture.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <img
          src={assets.scrapman}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Team Collaboration and Community Engagement",
    description:
      "At Scrapman, teamwork is at the heart of the company's operations. Employees are encouraged to collaborate across various departments, fostering a sense of camaraderie and support. The company also actively engages with the community through outreach programs and partnerships aimed at promoting recycling awareness. This involvement not only enhances employee morale but also strengthens relationships with local residents and organizations, creating a sense of belonging and shared responsibility for the environment.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src={assets.scrapman}
          width={200}
          height={100}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

const Business = () => {
  return (
    <div className="flex-col relative p-10 gap-20 overflow-hidden">
      {/* BackgroundBeams positioned behind */}
      
      
      

      {/* Scroll component in foreground */}
      <div className="relative z-10">
        <Scroll content={content} />
      </div>

        
        
        
    </div>
  );
};

export default Business;
