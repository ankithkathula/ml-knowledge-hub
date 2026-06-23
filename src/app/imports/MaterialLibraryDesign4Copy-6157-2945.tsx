import svgPaths from "./svg-0fdjpgmhlq";
import imgImageWithFallback from "figma:asset/18cc7e91b150935c332e14a89d759abf54eef048.png";
import imgImageWithFallback1 from "figma:asset/da9aadf68a7c63804ef29c5d30c494c8ce9f36cc.png";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import imgImageErrorLoadingImage from "figma:asset/8187c1a74e99a04a55d63f45406254e1b0404be7.png";
import imgStudentsLandingPage from "figma:asset/99c895728d474c0309af98540c13ddc788791b84.png";

function Text() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-[268.02px] top-[-5.01px] w-[95.765px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-nowrap">Job</p>
    </div>
  );
}

function StudentsLandingPage() {
  return (
    <div className="absolute h-[61.591px] left-0 top-0 w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#0a0a0a] text-[56px] top-[2.99px] w-[269px]">Hunt for a</p>
      <Text />
    </div>
  );
}

function StudentsLandingPage1() {
  return (
    <div className="absolute h-[116.974px] left-0 top-[85.59px] w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[533px]">Discover exciting career opportunities from top architecture firms, construction companies, and design studios. Our platform connects talented students with industry leaders looking for fresh perspectives.</p>
    </div>
  );
}

function StudentsLandingPage2() {
  return (
    <div className="absolute h-[58.487px] left-0 top-[226.57px] w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[517px]">Filter by location, specialization, and experience level to find the perfect match for your skills and aspirations.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[124.81px] size-[15.991px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d="M3.33152 7.99565H12.6598" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p2604450} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage3() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-0 rounded-[10px] top-[317.05px] w-[164.804px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[70.5px] not-italic text-[16px] text-center text-nowrap text-white top-[12.67px] translate-x-[-50%]">Explore Jobs</p>
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[365.048px] left-[32px] top-[145.46px] w-[544.565px]" data-name="Container">
      <StudentsLandingPage />
      <StudentsLandingPage1 />
      <StudentsLandingPage2 />
      <StudentsLandingPage3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[25.27px] size-[127.996px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 127.996 127.996">
        <g id="Icon">
          <path d={svgPaths.p2834c200} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
          <path d={svgPaths.p2f11f1f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[27.991px] left-0 top-[152px] w-[178.526px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-[89px] not-italic text-[#4a5565] text-[18px] text-center text-nowrap top-[0.5px] translate-x-[-50%]">Your dream job awaits</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[179.987px] relative shrink-0 w-[178.526px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[399.991px] items-center justify-center left-[640.55px] pl-0 pr-[0.013px] py-0 rounded-[24px] top-[128px] w-[544.565px]" data-name="Container" style={{ backgroundImage: "linear-gradient(143.702deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <Container1 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-white h-[655.983px] left-0 top-[768px] w-[1217.113px]" data-name="Section">
      <Container />
      <Container2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[131.713px] left-0 top-[118.17px] w-[462.052px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#ff7a59] text-[56px] top-[8px] w-[463px]">Seamless Collaboration</p>
    </div>
  );
}

function StudentsLandingPage4() {
  return (
    <div className="h-[246.365px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#0a0a0a] text-[56px] top-[2.99px] w-[331px]">Empowering Professionals</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#0a0a0a] text-[56px] top-[126.17px] w-[228px]">Through</p>
      <Text1 />
    </div>
  );
}

function StudentsLandingPage5() {
  return (
    <div className="h-[87.73px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[540px]">Join a vibrant community of students, professionals, and industry experts. Share ideas, collaborate on projects, and build meaningful connections that last a lifetime.</p>
    </div>
  );
}

function StudentsLandingPage6() {
  return (
    <div className="h-[58.487px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[516px]">Our platform facilitates networking, mentorship, and knowledge exchange, helping you grow both professionally and personally.</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[440.583px] items-start left-[608.56px] top-0 w-[544.565px]" data-name="Container">
      <StudentsLandingPage4 />
      <StudentsLandingPage5 />
      <StudentsLandingPage6 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[28.58px] size-[127.996px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 127.996 127.996">
        <g id="Icon">
          <path d={svgPaths.p222e0cc0} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
          <path d={svgPaths.p1c016a00} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
          <path d={svgPaths.p180c0500} id="Vector_3" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
          <path d={svgPaths.p3e8085d0} id="Vector_4" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10.6663" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[27.991px] left-0 top-[152px] w-[185.152px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-[93.5px] not-italic text-[#4a5565] text-[18px] text-center text-nowrap top-[0.5px] translate-x-[-50%]">{`Connect & Collaborate`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[179.987px] relative shrink-0 w-[185.152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex h-[399.991px] items-center justify-center left-0 pl-0 pr-[0.013px] py-0 rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-[20.3px] w-[544.565px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-[#f9fafb] h-[440.583px] left-[32px] top-[1551.98px] w-[1153.122px]" data-name="Section">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-0 top-[56.58px] w-[502.865px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-nowrap">Industry Knowledge</p>
    </div>
  );
}

function StudentsLandingPage7() {
  return (
    <div className="h-[123.183px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[56px] text-nowrap text-white top-[2.99px]">Broaden your</p>
      <Text2 />
    </div>
  );
}

function StudentsLandingPage8() {
  return (
    <div className="h-[116.974px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#d1d5dc] text-[18px] top-[0.34px] w-[517px]">Access a comprehensive library of resources, tutorials, and case studies curated by industry experts. Stay updated with the latest trends, technologies, and best practices in architecture and construction.</p>
    </div>
  );
}

function StudentsLandingPage9() {
  return (
    <div className="h-[58.487px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#d1d5dc] text-[18px] top-[0.34px] w-[532px]">From material innovations to sustainable design practices, expand your expertise and stay ahead of the curve.</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph2() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[123.196px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Material Libraries</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Paragraph2 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[102.457px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Design Trends</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Paragraph3 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph4() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[122.622px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Technical Guides</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Paragraph4 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[103.983px] items-start left-0 top-0 w-[260.283px]" data-name="Container">
      <Container7 />
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph5() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[92.804px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Case Studies</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Paragraph5 />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph6() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[101.296px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Best Practices</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Paragraph6 />
    </div>
  );
}

function Container17() {
  return <div className="absolute bg-[#ff7a59] left-0 rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Container" />;
}

function Paragraph7() {
  return (
    <div className="absolute h-[24px] left-[20px] top-0 w-[117.913px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[0.67px]">Industry Insights</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Paragraph7 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[103.983px] items-start left-[284.28px] top-0 w-[260.283px]" data-name="Container">
      <Container14 />
      <Container16 />
      <Container18 />
    </div>
  );
}

function StudentsLandingPage10() {
  return (
    <div className="h-[103.983px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <Container12 />
      <Container19 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[482.622px] items-start left-0 top-0 w-[544.565px]" data-name="Container">
      <StudentsLandingPage7 />
      <StudentsLandingPage8 />
      <StudentsLandingPage9 />
      <StudentsLandingPage10 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage11() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">Materials</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-0 rounded-[14px] top-0 w-[264.287px]" data-name="Container">
      <Icon3 />
      <StudentsLandingPage11 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage12() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">Sustainability</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-[280.28px] rounded-[14px] top-0 w-[264.287px]" data-name="Container">
      <Icon4 />
      <StudentsLandingPage12 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage13() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">BIM Technology</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-0 rounded-[14px] top-[129.64px] w-[264.287px]" data-name="Container">
      <Icon5 />
      <StudentsLandingPage13 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage14() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">Urban Design</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-[280.28px] rounded-[14px] top-[129.64px] w-[264.287px]" data-name="Container">
      <Icon6 />
      <StudentsLandingPage14 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage15() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">Construction Methods</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-0 rounded-[14px] top-[259.28px] w-[264.287px]" data-name="Container">
      <Icon7 />
      <StudentsLandingPage15 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[24px] size-[31.996px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage16() {
  return (
    <div className="absolute h-[19.983px] left-[24px] top-[68px] w-[214.617px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.83px]">Digital Fabrication</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid h-[113.648px] left-[280.28px] rounded-[14px] top-[259.28px] w-[264.287px]" data-name="Container">
      <Icon8 />
      <StudentsLandingPage16 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[372.926px] left-[608.56px] top-[54.85px] w-[544.565px]" data-name="Container">
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[482.622px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container27 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[738.613px] items-start left-0 pb-0 pt-[127.996px] px-[31.996px] top-[2120.56px] w-[1217.113px]" data-name="Section" style={{ backgroundImage: "linear-gradient(148.748deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 50%, rgb(16, 24, 40) 100%)" }}>
      <Container28 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[131.713px] left-0 top-[-5.01px] w-[368.204px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#ff7a59] text-[56px] top-[8px] w-[369px]">Worthy Events</p>
    </div>
  );
}

function StudentsLandingPage17() {
  return (
    <div className="absolute h-[123.183px] left-0 top-0 w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[#0a0a0a] text-[56px] top-[2.99px] w-[184px]">Attend</p>
      <Text3 />
    </div>
  );
}

function StudentsLandingPage18() {
  return (
    <div className="absolute h-[87.73px] left-0 top-[147.18px] w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[521px]">Participate in exclusive workshops, webinars, and networking events hosted by industry leaders. Gain insights, learn new skills, and make valuable connections.</p>
    </div>
  );
}

function StudentsLandingPage19() {
  return (
    <div className="absolute h-[58.487px] left-0 top-[258.91px] w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#4a5565] text-[18px] top-[0.34px] w-[498px]">From design competitions to career fairs, stay informed about opportunities that can accelerate your professional growth.</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[118.45px] size-[15.991px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_2983)" id="Icon">
          <path d="M5.33044 1.33261V3.99783" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M10.6609 1.33261V3.99783" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p16769700} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M1.99891 6.66304H13.9924" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2983">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StudentsLandingPage20() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-0 rounded-[10px] top-[349.4px] w-[158.439px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[67px] not-italic text-[16px] text-center text-nowrap text-white top-[12.67px] translate-x-[-50%]">View Events</p>
      <Icon9 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[397.396px] left-[640.55px] top-[179.3px] w-[544.565px]" data-name="Container">
      <StudentsLandingPage17 />
      <StudentsLandingPage18 />
      <StudentsLandingPage19 />
      <StudentsLandingPage20 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[499.996px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[499.996px] items-start left-[32px] overflow-clip rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[128px] w-[544.565px]" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-white h-[755.987px] left-0 top-[2859.17px] w-[1217.113px]" data-name="Section">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-[521.09px] top-[-5.01px] w-[139.996px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-center text-nowrap">Blogs</p>
    </div>
  );
}

function StudentsLandingPage21() {
  return (
    <div className="h-[61.591px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-[314.42px] not-italic text-[#0a0a0a] text-[56px] text-center top-[2.99px] translate-x-[-50%] w-[415px]">Read and Share</p>
      <Text4 />
    </div>
  );
}

function StudentsLandingPage22() {
  return (
    <div className="h-[58.487px] relative shrink-0 w-full" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-[384.4px] not-italic text-[#4a5565] text-[18px] text-center top-[0.34px] translate-x-[-50%] w-[753px]">Engage with thought-provoking articles, project showcases, and industry insights. Share your own experiences and learn from peers around the world.</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[144.078px] items-start left-[224.56px] top-0 w-[768px]" data-name="Container">
      <StudentsLandingPage21 />
      <StudentsLandingPage22 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[31.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d="M15.9978 9.33207V27.9962" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3991b0f0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage23() {
  return (
    <div className="absolute bg-[rgba(255,122,89,0.1)] content-stretch flex items-center justify-center left-[32px] pl-0 pr-[0.013px] py-0 rounded-[16px] size-[63.991px] top-[32px]" data-name="StudentsLandingPage">
      <Icon10 />
    </div>
  );
}

function StudentsLandingPage24() {
  return (
    <div className="absolute h-[27.991px] left-[32px] top-[119.99px] w-[297.378px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-0.17px]">Get Educated</p>
    </div>
  );
}

function StudentsLandingPage25() {
  return (
    <div className="absolute h-[51.991px] left-[32px] top-[163.97px] w-[297.378px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.5px] w-[290px]">Access in-depth articles on architecture, design, and construction practices.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-white border-[#f3f4f6] border-[0.835px] border-solid h-[275.622px] left-0 rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[363.039px]" data-name="Container">
      <StudentsLandingPage23 />
      <StudentsLandingPage24 />
      <StudentsLandingPage25 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[31.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d={svgPaths.p1a586d80} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p3e552f80} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage26() {
  return (
    <div className="absolute bg-[rgba(255,122,89,0.1)] content-stretch flex items-center justify-center left-[32px] pl-0 pr-[0.013px] py-0 rounded-[16px] size-[63.991px] top-[32px]" data-name="StudentsLandingPage">
      <Icon11 />
    </div>
  );
}

function StudentsLandingPage27() {
  return (
    <div className="absolute h-[27.991px] left-[32px] top-[119.99px] w-[297.378px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-0.17px]">Get Promoted</p>
    </div>
  );
}

function StudentsLandingPage28() {
  return (
    <div className="absolute h-[51.991px] left-[32px] top-[163.97px] w-[297.378px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.5px] w-[276px]">Showcase your work and gain visibility among industry professionals.</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white border-[#f3f4f6] border-[0.835px] border-solid h-[275.622px] left-[395.03px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[363.039px]" data-name="Container">
      <StudentsLandingPage26 />
      <StudentsLandingPage27 />
      <StudentsLandingPage28 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[31.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9957 31.9957">
        <g id="Icon">
          <path d={svgPaths.p1b2d4f00} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
          <path d={svgPaths.p8a7c9c0} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage29() {
  return (
    <div className="absolute bg-[rgba(255,122,89,0.1)] content-stretch flex items-center justify-center left-[32px] pl-0 pr-[0.013px] py-0 rounded-[16px] size-[63.991px] top-[32px]" data-name="StudentsLandingPage">
      <Icon12 />
    </div>
  );
}

function StudentsLandingPage30() {
  return (
    <div className="absolute h-[27.991px] left-[32px] top-[119.99px] w-[297.391px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-0.17px]">Receive Individualized</p>
    </div>
  );
}

function StudentsLandingPage31() {
  return (
    <div className="absolute h-[77.987px] left-[32px] top-[163.97px] w-[297.391px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[26px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.5px] w-[225px]">Get personalized feedback and mentorship from experienced professionals.</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-white border-[#f3f4f6] border-[0.835px] border-solid h-[275.622px] left-[790.07px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[363.052px]" data-name="Container">
      <StudentsLandingPage29 />
      <StudentsLandingPage30 />
      <StudentsLandingPage31 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[275.622px] left-[32px] top-[208.07px] w-[1153.122px]" data-name="Container">
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute bg-[#f9fafb] h-[483.691px] left-0 top-[3743.15px] w-[1217.113px]" data-name="Section">
      <Container31 />
      <Container35 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-[126.35px] top-[56.58px] w-[303.626px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-nowrap">professional</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-0 top-[118.17px] w-[445.409px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-nowrap">academic identity</p>
    </div>
  );
}

function StudentsLandingPage32() {
  return (
    <div className="absolute h-[184.774px] left-0 top-0 w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[56px] text-nowrap text-white top-[2.99px]">Effortlessly enhance</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-0 not-italic text-[56px] text-white top-[64.58px] w-[127px]">your</p>
      <Text5 />
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-[429.98px] not-italic text-[56px] text-nowrap text-white top-[64.58px]">or</p>
      <Text6 />
    </div>
  );
}

function StudentsLandingPage33() {
  return (
    <div className="absolute h-[87.73px] left-0 top-[208.77px] w-[544.565px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-0 not-italic text-[#d1d5dc] text-[18px] top-[0.34px] w-[513px]">Create a compelling digital portfolio that showcases your best work. Stand out to potential employers and collaborators with a professional profile that reflects your unique skills and vision.</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3eeeaa80} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2f14bd80} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[rgba(255,122,89,0.2)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27.991px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px]">Create your profile</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#99a1af] text-[16px] top-[0.67px] w-[440px]">Build a comprehensive portfolio with your projects, skills, and achievements.</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[83.987px] relative shrink-0 w-[480.574px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.996px] items-start relative size-full">
        <Heading3 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[15.991px] h-[83.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(255,122,89,0.2)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27.991px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px]">Get visible: Individuals</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#99a1af] text-[16px] top-[0.67px] w-[459px]">Connect with peers, mentors, and industry professionals in your field.</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[83.987px] relative shrink-0 w-[480.574px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.996px] items-start relative size-full">
        <Heading4 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[15.991px] h-[83.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[rgba(255,122,89,0.2)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[27.991px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px]">Tell a track and retell</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#99a1af] text-[16px] top-[0.67px] w-[480px]">Share your journey, document your growth, and inspire others with your story.</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[83.987px] relative shrink-0 w-[480.574px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.996px] items-start relative size-full">
        <Heading5 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[15.991px] h-[83.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function StudentsLandingPage34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[299.961px] items-start left-0 top-[328.5px] w-[544.565px]" data-name="StudentsLandingPage">
      <Container38 />
      <Container41 />
      <Container44 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[130.72px] size-[15.991px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d="M3.33152 7.99565H12.6598" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p2604450} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage35() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-0 rounded-[10px] top-[660.46px] w-[170.713px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[73px] not-italic text-[16px] text-center text-nowrap text-white top-[12.67px] translate-x-[-50%]">Create Profile</p>
      <Icon16 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[708.457px] left-0 top-0 w-[544.565px]" data-name="Container">
      <StudentsLandingPage32 />
      <StudentsLandingPage33 />
      <StudentsLandingPage34 />
      <StudentsLandingPage35 />
    </div>
  );
}

function Container46() {
  return <div className="absolute bg-[rgba(255,122,89,0.2)] blur-3xl filter h-[769.991px] left-[-17.5px] top-[-35px] w-[384.995px]" data-name="Container" />;
}

function ImageWithFallback1() {
  return (
    <div className="h-[675.991px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[675.991px] items-start left-[12px] overflow-clip rounded-[40px] top-[12px] w-[325.996px]" data-name="Container">
      <ImageWithFallback1 />
    </div>
  );
}

function Container48() {
  return <div className="absolute bg-[#101828] h-[24px] left-[110.99px] rounded-bl-[24px] rounded-br-[24px] top-0 w-[127.996px]" data-name="Container" />;
}

function Container49() {
  return (
    <div className="absolute h-[699.991px] left-0 rounded-[48px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[349.996px]" data-name="Container" style={{ backgroundImage: "linear-gradient(116.565deg, rgb(30, 41, 57) 0%, rgb(16, 24, 40) 100%)" }}>
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[699.991px] left-[705.83px] top-[4.23px] w-[349.996px]" data-name="Container">
      <Container46 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[708.457px] relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container50 />
    </div>
  );
}

function Section5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[964.448px] items-start left-0 pb-0 pt-[127.996px] px-[31.996px] top-[4354.84px] w-[1217.113px]" data-name="Section" style={{ backgroundImage: "linear-gradient(141.606deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 50%, rgb(16, 24, 40) 100%)" }}>
      <Container51 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[70.122px] items-start left-[438.52px] top-[-5.01px] w-[495.743px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[61.6px] not-italic relative shrink-0 text-[#ff7a59] text-[56px] text-center text-nowrap">Start Your Journey?</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[61.591px] left-[40.55px] top-[158px] w-[1136.009px]" data-name="Heading 2">
      <p className="absolute font-['Satoshi',sans-serif] leading-[61.6px] left-[320.24px] not-italic text-[#0a0a0a] text-[56px] text-center top-[2.99px] translate-x-[-50%] w-[237px]">Ready to</p>
      <Text7 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[58.487px] left-[272.56px] top-[243.59px] w-[672px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[29.25px] left-[336.5px] not-italic text-[#4a5565] text-[18px] text-center top-[0.34px] translate-x-[-50%] w-[615px]">Join thousands of students and young professionals building their careers in architecture and construction.</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[175.25px] size-[19.996px] top-[17.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d="M4.16576 9.99783H15.8299" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p26f0a080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff7a59] h-[55.983px] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(255,122,89,0.3),0px_4px_6px_-4px_rgba(255,122,89,0.3)] shrink-0 w-[227.243px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[100.5px] not-italic text-[16px] text-center text-nowrap text-white top-[16.66px] translate-x-[-50%]">Create Your Profile</p>
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[122.92px] size-[19.996px] top-[18.82px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d="M4.16576 9.99783H15.8299" id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p26f0a080} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[57.652px] relative rounded-[14px] shrink-0 w-[175.748px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[73.83px] not-italic text-[#101828] text-[16px] text-center text-nowrap top-[17.5px] translate-x-[-50%]">Learn More</p>
        <Icon18 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex gap-[15.991px] h-[57.652px] items-center justify-center left-[40.55px] top-[342.07px] w-[1136.009px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Section6() {
  return (
    <div className="absolute bg-white h-[497.713px] left-0 opacity-0 top-[5319.29px] w-[1217.113px]" data-name="Section">
      <Heading1 />
      <Paragraph11 />
      <Container52 />
    </div>
  );
}

function ImageMaterialLibrary() {
  return (
    <div className="absolute h-[31.996px] left-0 top-0 w-[137.53px]" data-name="Image (Material Library)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[45.47px] left-0 top-[56px] w-[352.37px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] w-[325px]">{`India's First unique digital platform transforming the construction industry ecosystem.`}</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_3013)" id="Icon">
          <path d={svgPaths.p339c5880} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3013">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-white relative rounded-[2.80107e+07px] shrink-0 size-[39.991px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[2.80107e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.835px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_3056)" id="Icon">
          <path d={svgPaths.p7b76580} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3056">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-white relative rounded-[2.80107e+07px] shrink-0 size-[39.991px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[2.80107e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.835px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_3008)" id="Icon">
          <path d={svgPaths.p1715cb00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p1e6b6df2} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M11.6603 4.33098H11.667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3008">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-white relative rounded-[2.80107e+07px] shrink-0 size-[39.991px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[2.80107e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.835px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_2955)" id="Icon">
          <path d={svgPaths.p306283f0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.pe568400} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.pa1d0600} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2955">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-white relative rounded-[2.80107e+07px] shrink-0 size-[39.991px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[2.80107e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.835px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[39.991px] items-center left-0 top-[125.46px] w-[352.37px]" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[171.991px] left-0 top-0 w-[352.37px]" data-name="Container">
      <ImageMaterialLibrary />
      <Paragraph12 />
      <Container53 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Company</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[58.017px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">About Us</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[49.239px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Careers</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[33.783px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Press</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[28.735px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Blog</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link7 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[132px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[171.991px] items-start left-[400.37px] top-0 w-[152.191px]" data-name="Container">
      <Heading2 />
      <List />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Resources</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[76.357px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Help Center</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link8 />
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[73.304px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Community</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link9 />
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[44.126px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Guides</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link10 />
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[52.891px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Partners</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link11 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[132px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[171.991px] items-start left-[600.56px] top-0 w-[152.178px]" data-name="Container">
      <Heading6 />
      <List1 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Legal</p>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[86.922px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Privacy Policy</p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link12 />
    </div>
  );
}

function Link13() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[104.374px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Terms of Service</p>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link13 />
    </div>
  );
}

function Link14() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[85.8px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Cookie Policy</p>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link14 />
    </div>
  );
}

function Link15() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[65.857px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Disclaimer</p>
    </div>
  );
}

function ListItem11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link15 />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[132px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
      <ListItem11 />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[171.991px] items-start left-[800.74px] top-0 w-[152.191px]" data-name="Container">
      <Heading7 />
      <List2 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Products</p>
    </div>
  );
}

function Link16() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[44.022px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Brands</p>
    </div>
  );
}

function ListItem12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link16 />
    </div>
  );
}

function Link17() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[62.622px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Designers</p>
    </div>
  );
}

function ListItem13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link17 />
    </div>
  );
}

function Link18() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[46.357px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Studios</p>
    </div>
  );
}

function ListItem14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link18 />
    </div>
  );
}

function Link19() {
  return (
    <div className="absolute content-stretch flex h-[17.53px] items-start left-0 top-[3.34px] w-[55.096px]" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Students</p>
    </div>
  );
}

function ListItem15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Link19 />
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[132px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem12 />
      <ListItem13 />
      <ListItem14 />
      <ListItem15 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.991px] h-[171.991px] items-start left-[1000.93px] top-0 w-[152.191px]" data-name="Container">
      <Heading8 />
      <List3 />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[171.991px] relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6157_3016)" id="Icon">
          <path d={svgPaths.p27514000} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p2de84a40} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3016">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Email</p>
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex h-[17.53px] items-start relative shrink-0 w-full" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">contact@platform.com</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[47.974px] relative shrink-0 w-[144.691px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.33px] items-start relative size-full">
        <Paragraph13 />
        <Link20 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[47.974px] items-start left-0 top-0 w-[368.374px]" data-name="Container">
      <Icon23 />
      <Container60 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6157_3005)" id="Icon">
          <path d={svgPaths.p27951900} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3005">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Phone</p>
    </div>
  );
}

function Link21() {
  return (
    <div className="content-stretch flex h-[17.53px] items-start relative shrink-0 w-full" data-name="Link">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">+91 123 456 7890</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[47.974px] relative shrink-0 w-[115.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.33px] items-start relative size-full">
        <Paragraph14 />
        <Link21 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[47.974px] items-start left-[392.37px] top-0 w-[368.374px]" data-name="Container">
      <Icon24 />
      <Container62 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6157_3026)" id="Icon">
          <path d={svgPaths.p3ec37780} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p3ab65100} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6157_3026">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Address</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Mumbai, Maharashtra, India</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[43.957px] relative shrink-0 w-[175.904px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.991px] items-start relative size-full">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[47.974px] items-start left-[784.75px] top-0 w-[368.374px]" data-name="Container">
      <Icon25 />
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[47.974px] relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Container63 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col h-[80.804px] items-start pb-0 pt-[32.831px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container66 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[317.009px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">© 2025 Construction Platform. All rights reserved.</p>
      </div>
    </div>
  );
}

function Link22() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[45.73px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Privacy</p>
      </div>
    </div>
  );
}

function Link23() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[37.761px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Terms</p>
      </div>
    </div>
  );
}

function Link24() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[50.87px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Cookies</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[182.361px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <Link22 />
        <Link23 />
        <Link24 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[52.813px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pt-[0.835px] px-0 relative size-full">
          <Paragraph17 />
          <Container68 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[48px] h-[513.587px] items-start left-0 pb-0 pt-[63.992px] px-[31.996px] top-[5817.83px] w-[1217.113px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[0.835px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
      <Container59 />
      <Container67 />
      <Container69 />
    </div>
  );
}

function Container70() {
  return <div className="absolute h-[768px] left-0 opacity-10 top-0 w-[1217.113px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 122, 89) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(rgb(255, 122, 89) 0.13021%, rgba(0, 0, 0, 0) 0.13021%)" }} />;
}

function ImageErrorLoadingImage() {
  return (
    <div className="absolute left-[564.55px] size-[88.004px] top-[339.99px]" data-name="Image (Error loading image)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageErrorLoadingImage} />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[768px] left-0 top-0 w-[1217.113px]" data-name="ImageWithFallback">
      <ImageErrorLoadingImage />
    </div>
  );
}

function StudentsLandingPage36() {
  return (
    <div className="absolute h-[768px] left-0 top-0 w-[1217.113px]" data-name="StudentsLandingPage">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[237.72%] left-0 max-w-none top-0 w-full" src={imgStudentsLandingPage} />
        </div>
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.6)] inset-0 to-[rgba(0,0,0,0.8)] via-1/2" />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute h-[768px] left-0 top-0 w-[1217.113px]" data-name="Container">
      <ImageWithFallback2 />
      <StudentsLandingPage36 />
    </div>
  );
}

function Container72() {
  return <div className="blur border-[1.67px] border-[rgba(255,122,89,0.3)] border-solid filter rounded-[2.80107e+07px] size-[138.512px]" data-name="Container" />;
}

function Container73() {
  return <div className="blur border-[1.67px] border-[rgba(255,255,255,0.2)] border-solid filter rounded-[16px] size-[225.516px]" data-name="Container" />;
}

function Icon26() {
  return (
    <div className="absolute left-[20px] size-[15.991px] top-[11.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_2998)" id="Icon">
          <path d={svgPaths.p73ad200} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M13.3261 1.99891V4.66413" id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M14.6587 3.33152H11.9935" id="Vector_3" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M2.66522 11.3272V12.6598" id="Vector_4" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M3.33152 11.9935H1.99891" id="Vector_5" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2998">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StudentsLandingPage37() {
  return (
    <div className="absolute h-[19.983px] left-[43.98px] top-[9.99px] w-[231.796px]" data-name="StudentsLandingPage">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[116px] not-italic text-[14px] text-center text-nowrap text-white top-[0.83px] translate-x-[-50%]">Join 50,000+ Aspiring Professionals</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute bg-[rgba(255,122,89,0.2)] border-[0.835px] border-[rgba(255,122,89,0.4)] border-solid h-[41.635px] left-[233.82px] rounded-[2.80107e+07px] top-0 w-[297.443px]" data-name="Container">
      <Icon26 />
      <StudentsLandingPage37 />
    </div>
  );
}

function StudentsLandingPage38() {
  return (
    <div className="absolute content-stretch flex h-[120.209px] items-start left-[283.3px] top-[-7.51px] w-[417.796px]" data-name="StudentsLandingPage">
      <p className="font-['Satoshi',sans-serif] leading-[105.6px] not-italic relative shrink-0 text-[#ff7a59] text-[96px] text-center text-nowrap tracking-[-2.4px]">Tomorrow</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[105.6px] left-[32px] top-[73.63px] w-[701.1px]" data-name="Heading 1">
      <p className="absolute font-['Satoshi',sans-serif] leading-[105.6px] left-[142px] not-italic text-[96px] text-center text-nowrap text-white top-[4.49px] tracking-[-2.4px] translate-x-[-50%]">Shape</p>
      <StudentsLandingPage38 />
    </div>
  );
}

function StudentsLandingPage39() {
  return (
    <div className="absolute content-stretch flex h-[60.104px] items-start left-[113.49px] top-[59.17px] w-[474.104px]" data-name="StudentsLandingPage">
      <p className="font-['Satoshi',sans-serif] leading-[60px] not-italic relative shrink-0 text-[#ff7a59] text-[48px] text-center text-nowrap">Endless Opportunities</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute h-[120px] left-[32px] top-[203.23px] w-[701.1px]" data-name="Container">
      <p className="absolute font-['Satoshi',sans-serif] leading-[60px] left-[350.26px] not-italic text-[48px] text-[rgba(255,255,255,0.9)] text-center text-nowrap top-[2.17px] translate-x-[-50%]">Your Journey, Our Platform,</p>
      <StudentsLandingPage39 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[51.991px] left-[46.54px] top-[347.23px] w-[672px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[26px] left-[336.08px] not-italic text-[16px] text-[rgba(255,255,255,0.7)] text-center top-[0.5px] translate-x-[-50%] w-[625px]">Connect with industry leaders, showcase your projects, and discover opportunities that shape your future in architecture and construction.</p>
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-[173.07px] size-[19.996px] top-[17.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d="M4.16576 9.99783H15.8299" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p26f0a080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage40() {
  return (
    <div className="bg-[#ff7a59] h-[55.983px] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(255,122,89,0.3),0px_4px_6px_-4px_rgba(255,122,89,0.3)] shrink-0 w-[225.065px]" data-name="StudentsLandingPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[99.5px] not-italic text-[16px] text-center text-nowrap text-white top-[16.66px] translate-x-[-50%]">Start Your Journey</p>
        <Icon27 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[197.88px] size-[19.996px] top-[18.82px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d="M4.16576 9.99783H15.8299" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p26f0a080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
      </svg>
    </div>
  );
}

function StudentsLandingPage41() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[57.652px] relative rounded-[14px] shrink-0 w-[250.709px]" data-name="StudentsLandingPage">
      <div aria-hidden="true" className="absolute border-[0.835px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[111.83px] not-italic text-[16px] text-center text-nowrap text-white top-[17.5px] translate-x-[-50%]">Explore Opportunities</p>
        <Icon28 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex gap-[15.991px] h-[57.652px] items-center justify-center left-[32px] pl-0 pr-[0.013px] py-0 top-[447.22px] w-[701.1px]" data-name="Container">
      <StudentsLandingPage40 />
      <StudentsLandingPage41 />
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute h-[504.874px] left-[226px] top-[131.56px] w-[765.091px]" data-name="Container">
      <Container74 />
      <Heading />
      <Container75 />
      <Paragraph18 />
      <Container76 />
    </div>
  );
}

function Section7() {
  return (
    <div className="absolute h-[768px] left-0 overflow-clip top-0 w-[1217.113px]" data-name="Section">
      <Container70 />
      <Container71 />
      <div className="absolute flex items-center justify-center left-[22.84px] size-[149.892px] top-[55.04px]" style={{ "--transform-inner-width": "3.328125", "--transform-inner-height": "3.328125" } as React.CSSProperties}>
        <div className="flex-none rotate-[4.925deg]">
          <Container72 />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[801.2px] size-[317.877px] top-[460.41px]" style={{ "--transform-inner-width": "3.328125", "--transform-inner-height": "3.328125" } as React.CSSProperties}>
        <div className="flex-none rotate-[40.347deg]">
          <Container73 />
        </div>
      </div>
      <Container77 />
    </div>
  );
}

function StudentsLandingPage42() {
  return (
    <div className="bg-white h-[6331.422px] overflow-clip relative shrink-0 w-full" data-name="StudentsLandingPage">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
      <Section7 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[6331.422px] items-start left-0 overflow-clip top-0 w-[1217.113px]" data-name="App">
      <StudentsLandingPage42 />
    </div>
  );
}

function Container78() {
  return <div className="absolute blur-[100px] filter left-[203.51px] opacity-[0.488] rounded-[2.80107e+07px] size-[479.81px] top-[-1.51px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 479.81 479.81\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -33.928 -33.928 0 239.91 239.91)\\\'><stop stop-color=\\\'rgba(255,122,89,0.15)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(255,122,89,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container79() {
  return <div className="absolute blur-[120px] filter left-[557.96px] opacity-[0.393] rounded-[2.80107e+07px] size-[574.886px] top-[269.76px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 574.89 574.89\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -40.651 -40.651 0 287.44 287.44)\\\'><stop stop-color=\\\'rgba(173,70,255,0.12)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(173,70,255,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container80() {
  return <div className="absolute blur-[110px] filter left-[126.36px] opacity-[0.344] rounded-[2.80107e+07px] size-[562.388px] top-[146.61px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 562.39 562.39\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -39.767 -39.767 0 281.19 281.19)\\\'><stop stop-color=\\\'rgba(43,127,255,0.1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(43,127,255,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container81() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[707.91px] opacity-[0.052] rounded-[2.80107e+07px] size-[4.849px] top-[434.41px]" data-name="Container" />;
}

function Container82() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[216.98px] opacity-[0.013] rounded-[2.80107e+07px] size-[4.222px] top-[534.67px]" data-name="Container" />;
}

function Container83() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[845.59px] opacity-[0.17] rounded-[2.80107e+07px] size-[6.663px] top-[306.78px]" data-name="Container" />;
}

function Container84() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[68.05px] opacity-[0.546] rounded-[2.80107e+07px] size-[9.411px] top-[717.81px]" data-name="Container" />;
}

function Container85() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[674.13px] opacity-[0.081] rounded-[2.80107e+07px] size-[5.333px] top-[251.04px]" data-name="Container" />;
}

function Container86() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[102.74px] opacity-[0.084] rounded-[2.80107e+07px] size-[5.383px] top-[493.75px]" data-name="Container" />;
}

function Container87() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[349.28px] opacity-[0.221] rounded-[2.80107e+07px] size-[7.288px] top-[339.32px]" data-name="Container" />;
}

function Container88() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[182.72px] opacity-[0.173] rounded-[2.80107e+07px] size-[6.684px] top-[37.8px]" data-name="Container" />;
}

function Container89() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[639.18px] opacity-[0.046] rounded-[2.80107e+07px] size-[4.757px] top-[527.48px]" data-name="Container" />;
}

function Container90() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[736.12px] opacity-[0.015] rounded-[2.80107e+07px] size-[4.246px] top-[494.59px]" data-name="Container" />;
}

function Container91() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[1090.49px] opacity-[0.053] rounded-[2.80107e+07px] size-[4.88px] top-[523.9px]" data-name="Container" />;
}

function Container92() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[1014.68px] opacity-[0.657] rounded-[2.80107e+07px] size-[9.581px] top-[71.75px]" data-name="Container" />;
}

function Container93() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[916.78px] opacity-[0.21] rounded-[2.80107e+07px] size-[7.166px] top-[291.92px]" data-name="Container" />;
}

function Container94() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[816.34px] opacity-[0.498] rounded-[2.80107e+07px] size-[9.269px] top-[557.85px]" data-name="Container" />;
}

function Container95() {
  return <div className="absolute bg-[rgba(255,122,89,0.1)] left-[514.43px] opacity-[0.019] rounded-[2.80107e+07px] size-[4.308px] top-[451px]" data-name="Container" />;
}

function AnimatedBackground() {
  return (
    <div className="absolute h-[768px] left-0 top-0 w-[1217.113px]" data-name="AnimatedBackground">
      <Container78 />
      <Container79 />
      <Container80 />
      <Container81 />
      <Container82 />
      <Container83 />
      <Container84 />
      <Container85 />
      <Container86 />
      <Container87 />
      <Container88 />
      <Container89 />
      <Container90 />
      <Container91 />
      <Container92 />
      <Container93 />
      <Container94 />
      <Container95 />
    </div>
  );
}

function ImageMaterialLibrary1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[154.748px]" data-name="Image (Material Library)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_2994)" id="Icon">
          <path d={svgPaths.p97fa180} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p23d62a00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2994">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[54.183px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[27.5px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Pincode</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3f4f6] h-[36.991px] relative rounded-[10px] shrink-0 w-[102.17px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center pl-[12px] pr-0 py-0 relative size-full">
        <Icon29 />
        <Text8 />
      </div>
    </div>
  );
}

function Link25() {
  return (
    <div className="h-[21px] opacity-70 relative shrink-0 w-[123.665px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#9747ff] text-[14.7px] text-nowrap top-[0.83px]">Knowledge Center</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex gap-[15.991px] h-[36.991px] items-center left-0 top-0 w-[576.561px]" data-name="Container">
      <ImageMaterialLibrary1 />
      <Button2 />
      <Link25 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g clipPath="url(#clip0_6157_2968)" id="Icon">
          <path d={svgPaths.p75dec80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M7.99565 1.33261V2.66522" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M7.99565 13.3261V14.6587" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p2a246b40} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p22214900} id="Vector_5" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M1.33261 7.99565H2.66522" id="Vector_6" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d="M13.3261 7.99565H14.6587" id="Vector_7" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p3fed5600} id="Vector_8" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p55d8600} id="Vector_9" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2968">
            <rect fill="white" height="15.9913" width="15.9913" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-start left-[305.77px] pb-0 pl-[7.996px] pr-0 pt-[7.996px] rounded-[10px] size-[31.983px] top-[2.5px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function Container97() {
  return <div className="absolute bg-[#d1d5dc] h-[19.996px] left-[349.75px] top-[8.49px] w-[0.991px]" data-name="Container" />;
}

function Button4() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-start left-[362.74px] px-[12px] py-0 top-[8px] w-[69.483px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14.7px] text-center text-nowrap">Sign In</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex h-[36.991px] items-start left-[444.22px] px-[16px] py-[8px] rounded-[10px] top-0 w-[84.352px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14.7px] text-center text-nowrap text-white">Sign Up</p>
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-[8px] size-[19.996px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6157_2989)" id="Icon">
          <path d={svgPaths.p3e6d8200} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p14993980} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p2efd8100} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6157_2989">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex items-center justify-center left-[23.99px] rounded-[2.80107e+07px] size-[15.991px] top-[-3.99px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[12.6px] text-center text-nowrap text-white">0</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute left-[540.57px] rounded-[10px] size-[35.987px] top-[0.5px]" data-name="Button">
      <Icon31 />
      <Text9 />
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute h-[36.991px] left-[576.56px] top-0 w-[576.561px]" data-name="Container">
      <Button3 />
      <Container97 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[47.648px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[24.5px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Brands</p>
      </div>
    </div>
  );
}

function Container99() {
  return <div className="bg-[#d1d5dc] h-[19.996px] shrink-0 w-[0.991px]" data-name="Container" />;
}

function Button8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[61.07px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[31px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Products</p>
      </div>
    </div>
  );
}

function Link26() {
  return (
    <div className="h-[21px] relative shrink-0 w-[57.47px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#364153] text-[14.7px] text-nowrap top-[0.83px]">Services</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[89.791px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[45.5px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Professionals</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[21px] items-center left-[375.08px] top-[8px] w-[402.952px]" data-name="Navigation">
      <Button7 />
      <Container99 />
      <Button8 />
      <Container99 />
      <Link26 />
      <Container99 />
      <Button9 />
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[36.991px] relative shrink-0 w-full" data-name="Container">
      <Container96 />
      <Container98 />
      <Navigation />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[65.817px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_0.835px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[0.835px] pt-[13.996px] px-[31.996px] relative size-full">
        <Container100 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[68.62px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[88.617px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Flooring</p>
        <Icon32 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-[67.53px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.522px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Lighting</p>
        <Icon33 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-[67.81px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.809px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Sanitary</p>
        <Icon34 />
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-[134.02px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[154.017px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[69.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">{`Doors & Windows`}</p>
        <Icon35 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[100.23px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[120.222px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[52px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Wall Finishes</p>
        <Icon36 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="absolute left-[64.03px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[84.026px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[34.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Kitchen</p>
        <Icon37 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-[78.68px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[98.674px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[41.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Hardware</p>
        <Icon38 />
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-[52.25px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[72.248px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[28px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">HVAC</p>
        <Icon39 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="absolute left-[74.9px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[94.891px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[39.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[6.83px] translate-x-[-50%]">Electrical</p>
        <Icon40 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="basis-0 grow h-[33px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center justify-center relative size-full">
          <Button10 />
          <Button11 />
          <Button12 />
          <Button13 />
          <Button14 />
          <Button15 />
          <Button16 />
          <Button17 />
          <Button18 />
        </div>
      </div>
    </div>
  );
}

function Link27() {
  return (
    <div className="h-[21px] relative shrink-0 w-[94.657px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[12px] not-italic text-[#e5e7eb] text-[14.7px] text-nowrap top-[0.83px]">View All →</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[56.987px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container101 />
          <Link27 />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2d2d2d] h-[57.822px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#364153] border-[0.835px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-0 pt-[0.835px] px-[31.996px] relative size-full">
        <Container102 />
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[124.474px] items-start left-0 pb-[0.835px] pt-0 px-0 top-0 w-[1217.113px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_0.835px] border-solid inset-0 pointer-events-none" />
      <Header />
      <Header1 />
    </div>
  );
}

export default function MaterialLibraryDesign4Copy() {
  return (
    <div className="bg-white relative size-full" data-name="MATERIAL LIBRARY design 4 (Copy)">
      <App />
      <AnimatedBackground />
      <Header2 />
    </div>
  );
}