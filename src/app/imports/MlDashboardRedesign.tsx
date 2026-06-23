import svgPaths from "./svg-w9b7jb9mrx";
import imgPrimitiveImg from "figma:asset/5fbdb4ac1a15224ab8b8d26f185ee2d0edc1a002.png";
import imgImage from "figma:asset/7a1b8aa84f6902158cf600df8819f4fa7a487bfc.png";
import imgImage1 from "figma:asset/8e5802d4b3cc893af9ee82b92a291b3c25ac07ad.png";
import imgImage2 from "figma:asset/802629f6784329de37fe370364bfa84bd6fd9761.png";
import imgImage3 from "figma:asset/b27a862e5d98a52b09366826c69206393bb56740.png";
import imgImage4 from "figma:asset/513ded018ec102f4590a77a1eb09dd0cb737a29b.png";

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[16.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-0">M</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#ff7a59] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[121.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Material Library</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[80px] items-center left-0 pb-px pl-[32px] pr-0 pt-0 top-0 w-[287px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container />
      <Text1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Aditya Birla Group</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#737373] text-[12px]">Premium Member</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[60px] top-[6px] w-[151px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[223px] size-[16px] top-[16px]" data-name="Button">
      <Icon />
    </div>
  );
}

function PrimitiveImg() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Primitive.img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPrimitiveImg} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[3.35544e+07px] size-[48px] top-0" data-name="Primitive.span">
      <PrimitiveImg />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button />
      <PrimitiveSpan />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[155px] items-start left-0 pb-px pt-[24px] px-[24px] top-[80px] w-[287px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">Overview</p>
      </div>
    </div>
  );
}

function NavItem() {
  return (
    <div className="absolute bg-[rgba(255,122,89,0.1)] content-stretch flex gap-[12px] h-[44px] items-center left-[16px] px-[16px] py-0 rounded-[10px] top-[16px] w-[255px]" data-name="NavItem">
      <Icon1 />
      <Text2 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute h-[1086.344px] left-0 top-[235px] w-[287px]" data-name="Navigation">
      <NavItem />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15ab6200} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Settings</p>
      </div>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-0 relative size-full">
          <Icon2 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14ca9100} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38966ca0} id="Vector_3" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Logout</p>
      </div>
    </div>
  );
}

function NavItem2() {
  return (
    <div className="h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-0 relative size-full">
          <Icon3 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[129px] items-start left-0 pb-0 pt-[17px] px-[16px] top-[1321.34px] w-[287px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <NavItem1 />
      <NavItem2 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white border-[#e5e5e5] border-[0px_1px_0px_0px] border-solid h-[1450.344px] left-0 top-0 w-[288px]" data-name="Sidebar">
      <Container1 />
      <Container4 />
      <Navigation />
      <Container5 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Satoshi',sans-serif] leading-[32px] left-0 not-italic text-[#171717] text-[24px] text-nowrap top-px">Overview</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Welcome back, Akriti</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[54px] relative shrink-0 w-[129.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Heading />
        <Paragraph2 />
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f5f5f5] h-[40px] left-0 rounded-[10px] top-0 w-[320px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] text-nowrap">Search...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[320px]" data-name="Container">
      <TextInput />
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[10px] size-[20px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p31962400} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1f3d9f80} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return <div className="absolute bg-[#ff7a59] left-[24px] rounded-[3.35544e+07px] size-[8px] top-[8px]" data-name="Text" />;
}

function Button1() {
  return (
    <div className="absolute bg-[#f5f5f5] left-[336px] rounded-[10px] size-[40px] top-0" data-name="Button">
      <Icon5 />
      <Text5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[40px] relative shrink-0 w-[376px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container7 />
        <Button1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px pt-0 px-[32px] relative size-full">
          <Container6 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p17599c00} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[#dcfce7] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[55.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">+12.5%</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Text6 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[36px] left-0 not-italic text-[#171717] text-[30px] text-nowrap top-px">24.5K</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Total Views</p>
    </div>
  );
}

function StatCard() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container10 />
          <Paragraph3 />
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#dcfce7] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[51.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">+5.2%</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Text7 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[36px] left-0 not-italic text-[#171717] text-[30px] text-nowrap top-px">89.2%</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Engagement</p>
    </div>
  );
}

function StatCard1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container12 />
          <Paragraph5 />
          <Paragraph6 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pe6b10c0} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4c21d00} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#f5f5f5] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[47.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-nowrap">3 new</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Text8 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[36px] left-0 not-italic text-[#171717] text-[30px] text-nowrap top-px">15</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Active Jobs</p>
    </div>
  );
}

function StatCard2() {
  return (
    <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container14 />
          <Paragraph7 />
          <Paragraph8 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18e6a68} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#dcfce7] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[83.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">+8 this week</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Text9 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[36px] left-0 not-italic text-[#171717] text-[30px] text-nowrap top-px">31</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Total Leads</p>
    </div>
  );
}

function StatCard3() {
  return (
    <div className="[grid-area:1_/_4] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container16 />
          <Paragraph9 />
          <Paragraph10 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[166px] relative shrink-0 w-full" data-name="Container">
      <StatCard />
      <StatCard1 />
      <StatCard2 />
      <StatCard3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Profile Completion</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-px">Keep your profile updated</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[52px] relative shrink-0 w-[158.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading1 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[36px] relative shrink-0 w-[62.734px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[36px] left-[63px] not-italic text-[#ff7a59] text-[30px] text-nowrap text-right top-px translate-x-[-100%]">83%</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Paragraph12 />
    </div>
  );
}

function Container20() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-127.5px] pr-[127.5px] py-0 relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container20 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[32px] left-[102.95px] not-italic text-[#ff7a59] text-[24px] text-center text-nowrap top-px translate-x-[-50%]">10</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#525252] text-[12px] text-center">Projects</p>
    </div>
  );
}

function MetricBox() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex flex-col gap-[4px] h-[86px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[14px] top-0 w-[239.328px]" data-name="MetricBox">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[32px] left-[102.94px] not-italic text-[#ff7a59] text-[24px] text-center text-nowrap top-px translate-x-[-50%]">04</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#525252] text-[12px] text-center">Portfolios</p>
    </div>
  );
}

function MetricBox1() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex flex-col gap-[4px] h-[86px] items-start left-[255.33px] pb-px pt-[17px] px-[17px] rounded-[14px] top-0 w-[239.328px]" data-name="MetricBox">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[32px] left-[102.97px] not-italic text-[#ff7a59] text-[24px] text-center text-nowrap top-px translate-x-[-50%]">50</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#525252] text-[12px] text-center">Images</p>
    </div>
  );
}

function MetricBox2() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex flex-col gap-[4px] h-[86px] items-start left-[510.66px] pb-px pt-[17px] px-[17px] rounded-[14px] top-0 w-[239.328px]" data-name="MetricBox">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[86px] relative shrink-0 w-full" data-name="Container">
      <MetricBox />
      <MetricBox1 />
      <MetricBox2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-white h-[244px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container19 />
          <PrimitiveDiv />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[28px] left-[25px] top-[25px] w-[66.297px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">My Jobs</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Active</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[12.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">15</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Drafts</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">05</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Closed</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">04</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[84px] items-start left-[25px] top-[69px] w-[338px]" data-name="Container">
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function ContentCard() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="ContentCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading2 />
      <Container26 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[28px] left-[25px] top-[25px] w-[72.391px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">My Blogs</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Published</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">30</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Drafts</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[14.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">10</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Pending</p>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">03</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[84px] items-start left-[25px] top-[69px] w-[338px]" data-name="Container">
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function ContentCard1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="ContentCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading3 />
      <Container30 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[28px] left-[25px] top-[25px] w-[138.281px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-px">{`Leads & Requests`}</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">My Leads</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[12.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-px">15</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">Requests</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[13.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-px">16</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[25px] top-[69px] w-[338px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function ContentCard2() {
  return (
    <div className="[grid-area:2_/_1] bg-[#ff7a59] place-self-stretch relative rounded-[16px] shrink-0" data-name="ContentCard">
      <div aria-hidden="true" className="absolute border border-[#ff7a59] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading4 />
      <Container33 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
            <path d={svgPaths.p31c92d00} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[97.781px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Subscription</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Heading5 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Plan</p>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Premium</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Valid Until</p>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Aug 15, 2024</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text28 />
      <Text29 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function ContentCard3() {
  return (
    <div className="[grid-area:2_/_2] bg-white place-self-stretch relative rounded-[16px] shrink-0" data-name="ContentCard">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container35 />
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_178fr)_minmax(0px,_1fr)] h-[348px] relative shrink-0 w-full" data-name="Container">
      <ContentCard />
      <ContentCard1 />
      <ContentCard2 />
      <ContentCard3 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Recent Activity</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1c647980} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13d22180} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[3.35544e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">New job posted: Senior Architect</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#737373] text-[12px]">2 hours ago</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph19 />
        <Paragraph20 />
      </div>
    </div>
  );
}

function ActivityItem() {
  return (
    <div className="content-stretch flex gap-[12px] h-[38px] items-start relative shrink-0 w-full" data-name="ActivityItem">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[3.35544e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Portfolio updated with 5 new images</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#737373] text-[12px]">1 day ago</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph21 />
        <Paragraph22 />
      </div>
    </div>
  );
}

function ActivityItem1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[38px] items-start relative shrink-0 w-full" data-name="ActivityItem">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#f3e8ff] relative rounded-[3.35544e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Blog published: Modern Architecture Trends</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#737373] text-[12px]">3 days ago</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph23 />
        <Paragraph24 />
      </div>
    </div>
  );
}

function ActivityItem2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[38px] items-start relative shrink-0 w-full" data-name="ActivityItem">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[146px] items-start relative shrink-0 w-full" data-name="Container">
      <ActivityItem />
      <ActivityItem1 />
      <ActivityItem2 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-white h-[240px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading6 />
          <Container46 />
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1108.344px] items-start left-0 top-0 w-[800px]" data-name="Container">
      <Container22 />
      <Container39 />
      <Container47 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-px">Quick Actions</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[20px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-px">Boost your visibility</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[170.3px] not-italic text-[#ff7a59] text-[16px] text-center text-nowrap top-[13px] translate-x-[-50%]">Advertise With Us</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-gradient-to-b from-[#ff7a59] h-[176px] relative rounded-[16px] shrink-0 to-[#ff6347] w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
          <Heading7 />
          <Paragraph25 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[28px] relative shrink-0 w-[55.25px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Gallery</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48.609px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[24.5px] not-italic text-[#ff7a59] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">View All</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Button3 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[163px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container51() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start overflow-clip place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <Image />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[163px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container52() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start overflow-clip place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <Image1 />
    </div>
  );
}

function Container53() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[163px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[107.328px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip rounded-[10px] size-[107.328px] top-0" data-name="Container">
      <Image2 />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[107.328px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[115.33px] overflow-clip rounded-[10px] size-[107.328px] top-0" data-name="Container">
      <Image3 />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[107.344px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[230.66px] overflow-clip rounded-[10px] size-[107.344px] top-0" data-name="Container">
      <Image4 />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[107.344px] relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-white h-[376.344px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container50 />
          <Container53 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Top Favourites</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
            <path d={svgPaths.p32640e00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
            <path d="M0.666667 7.33333V0.666667" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[13.71%] right-[13.71%] top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-5.74%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 5">
            <path d={svgPaths.p290cb600} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[17.79%_31.25%_60.75%_31.25%]" data-name="Vector">
        <div className="absolute inset-[-19.42%_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d={svgPaths.p683da00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Products</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container59 />
        <Text30 />
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">50</p>
      </div>
    </div>
  );
}

function FavRow() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="FavRow">
      <Container60 />
      <Text31 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.p6ae9d40} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p91474e0} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
            <path d="M2 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M6 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M6 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Portfolios</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container61 />
        <Text32 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">20</p>
      </div>
    </div>
  );
}

function FavRow1() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="FavRow">
      <Container62 />
      <Text33 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p341e6280} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Blogs</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.078px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container63 />
        <Text34 />
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[12.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">21</p>
      </div>
    </div>
  );
}

function FavRow2() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="FavRow">
      <Container64 />
      <Text35 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
            <path d={svgPaths.pb85f580} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Projects</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.016px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container65 />
        <Text36 />
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[20px] relative shrink-0 w-[14.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">10</p>
      </div>
    </div>
  );
}

function FavRow3() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="FavRow">
      <Container66 />
      <Text37 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[180px] items-start relative shrink-0 w-full" data-name="Container">
      <FavRow />
      <FavRow1 />
      <FavRow2 />
      <FavRow3 />
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-white h-[274px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading9 />
          <Container67 />
        </div>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#171717] text-[18px] text-nowrap top-px">Profile Info</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="bg-[#00c950] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[66.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Active now</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Text38 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#171717] text-[14px] text-nowrap top-px">Gurugram, Haryana</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#525252] text-[14px] text-nowrap top-px">Architectural Studio</p>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#ff7a59] text-[14px] text-nowrap top-px">www.studiomaterium.com</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[116px] items-start relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Paragraph26 />
      <Paragraph27 />
      <Link />
    </div>
  );
}

function Container72() {
  return (
    <div className="bg-white h-[210px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Heading10 />
          <Container71 />
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1108.344px] items-start left-[824px] top-0 w-[388px]" data-name="Container">
      <Container49 />
      <Container58 />
      <Container68 />
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[1108.344px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container73 />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[1370.344px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[32px] relative size-full">
          <Container17 />
          <Container74 />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1450.344px] items-start left-[288px] overflow-clip top-0 w-[1276px]" data-name="Main Content">
      <Header />
      <Container75 />
    </div>
  );
}

function User() {
  return (
    <div className="absolute left-[23.47px] size-[19.907px] top-[327.78px]" data-name="user">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="user">
          <path d={svgPaths.p39969ca0} id="Vector" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
          <path d={svgPaths.p1b12d200} id="Vector_2" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[23.47px] top-[326.12px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[59.96px] text-[#1f1f1f] text-[19.907px] text-nowrap top-[326.12px]">Profile Details</p>
      <User />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative size-[19.907px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d={svgPaths.p2269500} id="Vector" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
        </g>
      </svg>
    </div>
  );
}

function Layers() {
  return (
    <div className="absolute left-[23.47px] size-[19.907px] top-[613.12px]" data-name="layers">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4642_818)" id="layers">
          <path d={svgPaths.p15df2e80} id="Vector" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
          <path d={svgPaths.p19770b00} id="Vector_2" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
          <path d={svgPaths.p11c5ef80} id="Vector_3" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
        </g>
        <defs>
          <clipPath id="clip0_4642_818">
            <rect fill="white" height="19.9074" width="19.9074" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[23.47px] top-[610.63px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[59.96px] text-[#1f1f1f] text-[19.907px] text-nowrap top-[610.63px]">Content</p>
      <Layers />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[16px] top-[317px]">
      <div className="absolute bg-white h-[275.385px] left-[16px] top-[317px] w-[258.796px]" />
      <Group />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[365.94px]">Basic Details</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[401.61px]">KYC Details</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[437.27px]">Branch Details</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[472.94px]">Distribution Networks</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[508.61px]">{`Categories `}</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[72.4px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[544.28px]">Portfolio</p>
      <div className="absolute flex items-center justify-center left-[248.25px] size-[19.907px] top-[327.78px]">
        <div className="flex-none rotate-[180deg]">
          <ChevronDown />
        </div>
      </div>
      <Group1 />
      <div className="absolute inset-[42.9%_82.85%_56.75%_16.51%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p2d60eb80} id="Vector" stroke="var(--stroke-0, #1F1F1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65895" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="absolute bg-[#fafafa] h-[1450.344px] left-0 top-0 w-[1564px]" data-name="Dashboard">
      <Sidebar />
      <MainContent />
      <Group2 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[67.43px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[656.25px]">{`Catalogues `}</p>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[normal] left-[67.43px] text-[#1f1f1f] text-[16.589px] text-nowrap top-[691.92px]">{`Products `}</p>
    </div>
  );
}

export default function MlDashboardRedesign() {
  return (
    <div className="bg-white relative size-full" data-name="ML dashboard redesign">
      <Dashboard />
    </div>
  );
}