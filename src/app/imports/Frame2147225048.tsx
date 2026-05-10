import svgPaths from "./svg-dni0crv5bh";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import imgImageUser from "figma:asset/5fbdb4ac1a15224ab8b8d26f185ee2d0edc1a002.png";

function ImageMaterialLibrary() {
  return (
    <div className="h-[36px] relative shrink-0 w-[154.75px]" data-name="Image (Material Library)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
    </div>
  );
}

function IconamoonProfileFill() {
  return (
    <div className="absolute left-[8px] size-[16px] top-[8px]" data-name="iconamoon:profile-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="iconamoon:profile-fill">
          <path clipRule="evenodd" d={svgPaths.p267da900} fill="var(--fill-0, #D5D1D1)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#eaeaea] overflow-clip relative rounded-[250px] shrink-0 size-[32px]">
      <IconamoonProfileFill />
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-[164px]">
      <Frame />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#171717] text-[16px] text-nowrap">Eco Surfaces Co.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d={svgPaths.p3be27100} id="Vector" stroke="var(--stroke-0, #FF6A3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1c796280} id="Vector_2" stroke="var(--stroke-0, #FF6A3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1b0e1d80} id="Vector_3" stroke="var(--stroke-0, #FF6A3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p324edb70} id="Vector_4" stroke="var(--stroke-0, #FF6A3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[57.091px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#FF6A3D] text-[14px] text-nowrap top-[0.83px]">Overview</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[39.978px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[15.991px] pr-0 py-0 relative size-full">
          <Icon />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g id="Icon">
          <path d={svgPaths.p9f79ea0} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p398f5200} id="Vector_2" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[83.504px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[42px] not-italic text-[#737373] text-[14px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Profile Details</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[115.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon1 />
        <Text />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.pfc47d00} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[39.978px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15.991px] py-0 relative size-full">
          <Container />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <Icon2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-[204.157px]" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Basic Details</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[16.01px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.27px]">Certifications</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[16.01px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.27px]">KYC Details</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Distribution Networks</p>
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Categories</p>
    </div>
  );
}

function Link6() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Portfolio</p>
    </div>
  );
}

function Link7() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Leads</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[204.157px]" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full">
      <Button />
      <Container1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[19.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6011_506)" id="Icon">
          <path d={svgPaths.p207e9800} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p17a6c280} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d="M8.33152 7.49837H6.66522" id="Vector_3" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d="M13.3304 10.831H6.66522" id="Vector_4" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d="M13.3304 14.1636H6.66522" id="Vector_5" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6011_506">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-[49.565px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[20px] left-[25px] not-italic text-[#525252] text-[14px] text-center text-nowrap top-[0.83px] translate-x-[-50%]">Content</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[81.561px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon3 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.pfc47d00} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[39.978px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[110.622px] items-center px-[15.991px] py-0 relative size-full">
          <Container2 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <Icon4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Stores</p>
    </div>
  );
}

function Link9() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Products</p>
    </div>
  );
}

function Link10() {
  return (
    <div className="h-[35.974px] relative rounded-[10px] shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[15.99px] not-italic text-[#737373] text-[14px] text-nowrap top-[8.83px]">Catalogues</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[204.157px]" data-name="Container">
      <Link8 />
      <Link9 />
      <Link10 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Container3 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Link />
      <Frame32 />
      <Container4 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame102 />
      <Frame33 />
    </div>
  );
}

export function Navigation() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex flex-col gap-[48px] items-start overflow-clip p-[24px] relative self-stretch shrink-0 w-[280px]" data-name="Navigation">
      <ImageMaterialLibrary />
      <Frame109 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[31.996px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#171717] text-[24px] text-nowrap top-[0.83px]">Overview</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#737373] text-[14px] text-nowrap top-[0.83px]">Welcome Aakriti</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[51.978px] relative shrink-0 w-[129.47px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function ImageUser() {
  return (
    <div className="basis-0 grow h-[39.991px] min-h-px min-w-px relative rounded-[2.80107e+07px] shrink-0" data-name="Image (User)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2.80107e+07px] size-full" src={imgImageUser} />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center left-[391.97px] size-[39.991px] top-0" data-name="Button">
      <ImageUser />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[39.991px] items-center left-0 overflow-clip pl-[40px] pr-[16px] py-0 rounded-[10px] top-0 w-[319.996px]" data-name="Text Input">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] text-nowrap">Search...</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[12px] size-[15.991px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.p1421ff80} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p17632600} id="Vector_2" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[39.991px] left-0 top-0 w-[319.996px]" data-name="Container">
      <TextInput />
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[9.99px] size-[19.996px] top-[9.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9957 19.9957">
        <g clipPath="url(#clip0_6011_575)" id="Icon">
          <path d={svgPaths.p335f0800} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
          <path d={svgPaths.p2b663200} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6663" />
        </g>
        <defs>
          <clipPath id="clip0_6011_575">
            <rect fill="white" height="19.9957" width="19.9957" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return <div className="absolute bg-[#FF6A3D] left-[24px] rounded-[2.80107e+07px] size-[7.996px] top-[8px]" data-name="Text" />;
}

function Button3() {
  return (
    <div className="absolute bg-[#f5f5f5] left-[335.99px] rounded-[10px] size-[39.991px] top-0" data-name="Button">
      <Icon6 />
      <Text2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[39.991px] relative shrink-0 w-[431.961px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
        <Container6 />
        <Button3 />
      </div>
    </div>
  );
}

export function Header() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_0.835px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16.835px] pt-[16px] px-[31.996px] relative w-full">
          <Container5 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0 w-full">
      <p className="basis-0 font-['Satoshi:Regular',sans-serif] grow leading-[21px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white">{`Profile `}</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Satoshi:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-white">Keep your profile updated</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame5 />
    </div>
  );
}

function IconamoonProfileFill1() {
  return (
    <div className="absolute left-[18.29px] size-[36.571px] top-[18.29px]" data-name="iconamoon:profile-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.5714 36.5714">
        <g id="iconamoon:profile-fill">
          <path clipRule="evenodd" d={svgPaths.p2343700} fill="var(--fill-0, #D5D1D1)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame110() {
  return (
    <div className="bg-white overflow-clip relative rounded-[571.429px] shrink-0 size-[73.143px]">
      <IconamoonProfileFill1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute left-0 size-[80px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="Group 2">
          <g id="Group 1">
            <path d={svgPaths.p10f2b500} fill="var(--fill-0, #E7E7E7)" id="Ellipse 19" />
          </g>
          <path d={svgPaths.p30530280} fill="var(--fill-0, #FF6A3D)" id="Ellipse 18" />
        </g>
      </svg>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex gap-[11.429px] items-center mb-[-11px] p-[3.429px] relative shrink-0 w-[80px]">
      <Frame110 />
      <Group1 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center mb-[-11px] px-[8px] py-[2px] relative rounded-[32px] shrink-0">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#FF6A3D] text-[12px] text-nowrap">100%</p>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex flex-col h-[89px] items-center pb-[11px] pt-0 px-0 relative shrink-0 w-[80px]">
      <Frame119 />
      <Frame103 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Content">
      <Frame120 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[20px] not-italic relative shrink-0 text-center text-white w-full">
      <p className="font-['Satoshi:Medium',sans-serif] h-[20px] relative shrink-0 text-[16px] w-full">Eco Surfaces Co.</p>
      <p className="font-['Satoshi:Regular',sans-serif] h-[20px] relative shrink-0 text-[10px] w-full">www.ecosurfaces.com</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[159px]">
      <Content />
      <Frame2 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative w-full">
          <p className="font-['Satoshi:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#FF6A3D] text-[12px] text-center text-nowrap">View Public Profile</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#FF6A3D] opacity-80 relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative w-full">
          <p className="font-['Satoshi:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">Edit Profile</p>
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame31 />
      <Frame6 />
    </div>
  );
}

function Certifications() {
  return (
    <div className="content-stretch flex flex-col items-center justify-between p-[24px] relative rounded-[10px] self-stretch shadow-[0px_2px_6px_0px_rgba(144,146,148,0.2)] shrink-0 w-[320px]" data-name="Certifications" style={{ backgroundImage: "linear-gradient(213.433deg, #FF8A65 14.124%, #FF6A3D 100.37%)" }}>
      <Frame30 />
      <Frame1 />
      <Frame34 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(163,163,163,0.05)] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[300px] shrink-0">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#FF6A3D] text-[12px] text-nowrap">View All</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="basis-0 font-['Satoshi:Regular',sans-serif] grow leading-[21px] min-h-px min-w-px not-italic relative shrink-0 text-[#171717] text-[16px]">{`Leads & Inquiries`}</p>
      <Frame4 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame15 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Satoshi:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#a3a3a3] text-[12px]">Track and manage inquiries from potential clients</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[749px]">
      <Frame7 />
      <Frame13 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p13a96ac0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p254f3200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[2.80107e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.013px] py-0 relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">248</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-white w-full">
      <p className="font-['Satoshi:Medium',sans-serif] relative shrink-0 text-[16px] w-full">Profile Views</p>
      <p className="font-['Satoshi:Regular',sans-serif] relative shrink-0 text-[10px] w-full">Last 30 days</p>
    </div>
  );
}

export function Frame20() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shadow-[0px_2px_6px_0px_rgba(144,146,148,0.2)] shrink-0" style={{ backgroundImage: "linear-gradient(196.553deg, #FF8A65 14.124%, #FF6A3D 100.37%)" }}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center p-[24px] relative w-full">
          <Container9 />
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p13a96ac0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p254f3200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[2.80107e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.013px] py-0 relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">1,240</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-white w-full">
      <p className="font-['Satoshi:Medium',sans-serif] relative shrink-0 text-[16px] w-full">Product Clicks</p>
      <p className="font-['Satoshi:Regular',sans-serif] relative shrink-0 text-[10px] w-full">Last 30 days</p>
    </div>
  );
}

export function Frame22() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shadow-[0px_2px_6px_0px_rgba(144,146,148,0.2)] shrink-0" style={{ backgroundImage: "linear-gradient(196.553deg, #FFAB91 14.124%, #FF6A3D 100.37%)" }}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center p-[24px] relative w-full">
          <Container11 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

export function Frame26() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame20 />
      <Frame22 />
    </div>
  );
}

export function Frame105() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <div className="basis-0 grow flex flex-col gap-[24px] items-start min-h-px min-w-px relative shrink-0">
        <Frame8 />
        <div className="bg-[#f5f5f5] h-[200px] relative rounded-[10px] shrink-0 w-full">
          <p className="absolute font-['Satoshi:Regular',sans-serif] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">Leads Activity Chart</p>
        </div>
      </div>
      <Certifications />
    </div>
  );
}

export function Frame107() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <h3 className="text-xl font-normal text-[#171717] uppercase tracking-tight">Recent Inquiries</h3>
      <div className="bg-white border border-gray-100 rounded-[10px] p-6 w-full shadow-sm">
        <p className="text-gray-400 text-sm italic">You have no new inquiries at the moment.</p>
      </div>
    </div>
  );
}
