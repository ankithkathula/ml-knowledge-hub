import svgPaths from "./svg-6jn22oqmlt";
import imgBrandsPage from "figma:asset/ca5428909333f4c4f971f236d54995fefadf0bc1.png";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import imgImage21 from "figma:asset/a10311d06637ea1d996e4a1f05ec9243d7b2f3e9.png";

function BrandsPage() {
  return (
    <div className="absolute h-[666.391px] left-0 top-0 w-[1903px]" data-name="BrandsPage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBrandsPage} />
    </div>
  );
}

function BrandsPage1() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.4)] h-[666.391px] left-0 to-[rgba(0,0,0,0.6)] top-0 via-50% via-[rgba(0,0,0,0.3)] w-[1903px]" data-name="BrandsPage" />;
}

function Container() {
  return (
    <div className="absolute h-[666.391px] left-0 top-0 w-[1903px]" data-name="Container">
      <BrandsPage />
      <BrandsPage1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[84px] relative shrink-0 w-[792.203px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[84px] relative w-[792.203px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[84px] left-[396.5px] not-italic text-[84px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">Explore the Materials</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[28px] relative shrink-0 w-[639.266px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[639.266px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-[320px] not-italic text-[20px] text-[rgba(255,255,255,0.9)] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Discover leading construction material brands and manufacturers</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[666.391px] items-center justify-center left-0 pb-[0.016px] pt-0 px-0 top-0 w-[1903px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[666.391px] left-0 overflow-clip top-0 w-[1903px]" data-name="Section">
      <Container />
      <Container1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1066 11.1066" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Search brands, categories, or products...</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] h-[46px] items-center left-[149px] px-[17px] py-px rounded-[10px] top-[734px] w-[1679px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon />
      <TextInput />
    </div>
  );
}

function BrandsPage2() {
  return (
    <div className="absolute bg-white h-[2706.39px] left-0 overflow-clip top-0 w-[1903px]" data-name="BrandsPage">
      <Section />
      <Container2 />
    </div>
  );
}

function ImageMaterialLibrary() {
  return (
    <div className="h-[36px] relative shrink-0 w-[154.75px]" data-name="Image (Material Library)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] w-[154.75px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap whitespace-pre">Pincode</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-gray-100 h-[36px] relative rounded-[10px] shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center px-[12px] py-0 relative w-[128px]">
        <Icon1 />
        <TextInput1 />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[121.672px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[121.672px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#9747ff] text-[14px] text-nowrap top-px whitespace-pre">Knowledge Center</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[36px] items-center left-0 top-0 w-[768px]" data-name="Container">
      <ImageMaterialLibrary />
      <Container3 />
      <Link />
    </div>
  );
}

function Icon2() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[33.33%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
              <path d={svgPaths.p31080000} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-1/2 right-1/2 top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.67px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
              <path d="M0.666667 0.666667V2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[83.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.67px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
              <path d="M0.666667 0.666667V2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_73.58%_73.58%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
              <path d={svgPaths.p2178fec0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_20.54%_20.54%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
              <path d={svgPaths.p2178fec0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[8.33%] right-[83.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
              <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[83.33%] right-[8.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
              <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_73.58%_20.54%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
              <path d={svgPaths.p1dae0c80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_20.54%_73.58%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
              <path d={svgPaths.p1dae0c80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[499px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[32px] top-[2px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[#d1d5dc] h-[20px] left-[543px] top-[8px] w-px" data-name="Container" />;
}

function Button1() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[556px] px-[12px] py-0 top-[8px] w-[68.703px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-nowrap whitespace-pre">Sign In</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#ff7a59] box-border content-stretch flex h-[36px] items-start left-[636.7px] px-[16px] py-[8px] rounded-[10px] top-0 w-[83.297px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Sign Up</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4183_398)" id="Icon">
          <path d={svgPaths.p32514c00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2734ea00} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35b01b80} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_4183_398">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex items-center justify-center left-[24px] rounded-[3.35544e+07px] size-[16px] top-[-4px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">0</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute left-[732px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon3 />
      <Text />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[36px] left-[768px] top-0 w-[768px]" data-name="Container">
      <Button />
      <Container5 />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[45.406px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[45.406px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Brands</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#d1d5dc] h-[20px] relative shrink-0 w-px" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] w-px" />
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.188px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[58.188px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Products</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.766px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[54.766px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Services</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Professionals</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[20px] items-center left-[572.54px] top-[8px] w-[390.922px]" data-name="Navigation">
      <Button4 />
      <Container7 />
      <Link1 />
      <Container7 />
      <Link2 />
      <Container7 />
      <Link3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container6 />
      <Navigation />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[65px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[65px] items-start pb-px pt-[14px] px-[183.5px] relative w-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[65.97px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[85.969px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[85.969px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Flooring</p>
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[64.92px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[84.922px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[84.922px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Lighting</p>
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[65.19px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[85.188px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[85.188px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Sanitary</p>
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[128.3px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[148.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[148.297px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">{`Doors & Windows`}</p>
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[96.08px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[116.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[116.078px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Wall Finishes</p>
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[61.59px] size-[12px] top-[10px]" data-name="Icon">
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
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[81.594px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[81.594px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Kitchen</p>
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[75.55px] size-[12px] top-[10px]" data-name="Icon">
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
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[95.547px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[95.547px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Hardware</p>
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[50.38px] size-[12px] top-[10px]" data-name="Icon">
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
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[70.375px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[70.375px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">HVAC</p>
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[71.94px] size-[12px] top-[10px]" data-name="Icon">
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
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[91.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[91.938px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[8px] not-italic text-[14px] text-gray-200 text-nowrap top-[7px] whitespace-pre">Electrical</p>
        <Icon12 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center justify-center pl-0 pr-[0.016px] py-0 relative w-full">
          <Button5 />
          <Button6 />
          <Button7 />
          <Button8 />
          <Button9 />
          <Button10 />
          <Button11 />
          <Button12 />
          <Button13 />
        </div>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[93.703px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[93.703px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[12px] not-italic text-[14px] text-gray-200 text-nowrap top-px whitespace-pre">View All →</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Link4 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2d2d2d] h-[49px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#364153] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[49px] items-start pb-0 pt-px px-[183.5px] relative w-full">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] box-border content-stretch flex flex-col h-[115px] items-start left-0 pb-px pt-0 px-0 top-0 w-[1903px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Header />
      <Header1 />
    </div>
  );
}

function BrandsPage3() {
  return (
    <div className="absolute h-[24px] left-[844px] top-[880px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage4() {
  return (
    <div className="absolute h-[24px] left-[1485px] top-[880px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage5() {
  return (
    <div className="absolute h-[24px] left-[1167px] top-[880px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage6() {
  return (
    <div className="absolute h-[24px] left-[1167px] top-[1064px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage7() {
  return (
    <div className="absolute h-[24px] left-[844px] top-[1247px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage8() {
  return (
    <div className="absolute h-[24px] left-[1485px] top-[1247px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[767px] top-[848px]">
      <div className="absolute bg-white h-[352px] left-[767px] rounded-[20px] top-[848px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[352px] left-[1408px] rounded-[20px] top-[848px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[174px] left-[1087px] rounded-[20px] top-[848px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[272px] left-[1087px] rounded-[20px] top-[1036px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[767px] rounded-[20px] top-[1214px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[1408px] rounded-[20px] top-[1214px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1099px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1200px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1279px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1279px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1124px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1225px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1304px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1304px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1149px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1250px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1329px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1329px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1174px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1275px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1354px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1354px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1015px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1015px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1040px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1040px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1065px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1065px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1090px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1090px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1115px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1115px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1140px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1140px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1165px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1165px] w-[106px]">{`Paint & Coatings`}</p>
      <div className="absolute h-[45px] left-[793px] rounded-[10px] top-[861px] w-[46px]" data-name="image 21">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1434px] rounded-[10px] top-[861px] w-[46px]" data-name="image 25">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1117px] rounded-[10px] top-[861px] w-[46px]" data-name="image 23">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1117px] rounded-[10px] top-[1045px] w-[46px]" data-name="image 24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[793px] rounded-[10px] top-[1225px] w-[46px]" data-name="image 22">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1434px] rounded-[10px] top-[1225px] w-[46px]" data-name="image 26">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <BrandsPage3 />
      <BrandsPage4 />
      <BrandsPage5 />
      <BrandsPage6 />
      <BrandsPage7 />
      <BrandsPage8 />
    </div>
  );
}

function BrandsPage9() {
  return (
    <div className="absolute h-[24px] left-[844px] top-[1466px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage10() {
  return (
    <div className="absolute h-[24px] left-[1485px] top-[1466px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage11() {
  return (
    <div className="absolute h-[24px] left-[1167px] top-[1466px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage12() {
  return (
    <div className="absolute h-[24px] left-[1167px] top-[1650px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage13() {
  return (
    <div className="absolute h-[24px] left-[844px] top-[1833px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage14() {
  return (
    <div className="absolute h-[24px] left-[1485px] top-[1833px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[767px] top-[1434px]">
      <div className="absolute bg-white h-[352px] left-[767px] rounded-[20px] top-[1434px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[352px] left-[1408px] rounded-[20px] top-[1434px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[174px] left-[1087px] rounded-[20px] top-[1434px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[272px] left-[1087px] rounded-[20px] top-[1622px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[767px] rounded-[20px] top-[1800px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[1408px] rounded-[20px] top-[1800px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1685px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1786px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1865px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1865px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1710px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1811px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1890px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1890px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1735px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1836px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1760px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1172px] not-italic text-[#6a7282] text-[14px] top-[1861px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1601px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1601px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1626px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1626px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1651px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1651px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1676px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1676px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1701px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1701px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1726px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1726px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[848px] not-italic text-[#6a7282] text-[14px] top-[1751px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[1489px] not-italic text-[#6a7282] text-[14px] top-[1751px] w-[106px]">{`Paint & Coatings`}</p>
      <div className="absolute h-[45px] left-[793px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 21">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1434px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 25">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1117px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 23">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1117px] rounded-[10px] top-[1631px] w-[46px]" data-name="image 24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[793px] rounded-[10px] top-[1811px] w-[46px]" data-name="image 22">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[1434px] rounded-[10px] top-[1811px] w-[46px]" data-name="image 26">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <BrandsPage9 />
      <BrandsPage10 />
      <BrandsPage11 />
      <BrandsPage12 />
      <BrandsPage13 />
      <BrandsPage14 />
    </div>
  );
}

function BrandsPage15() {
  return (
    <div className="absolute h-[24px] left-[221px] top-[880px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage16() {
  return (
    <div className="absolute h-[24px] left-[862px] top-[880px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage17() {
  return (
    <div className="absolute h-[24px] left-[544px] top-[880px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage18() {
  return (
    <div className="absolute h-[24px] left-[544px] top-[1064px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage19() {
  return (
    <div className="absolute h-[24px] left-[221px] top-[1247px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage20() {
  return (
    <div className="absolute h-[24px] left-[862px] top-[1247px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[144px] top-[848px]">
      <div className="absolute bg-white h-[352px] left-[144px] rounded-[20px] top-[848px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[352px] left-[785px] rounded-[20px] top-[848px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[174px] left-[464px] rounded-[20px] top-[848px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[272px] left-[464px] rounded-[20px] top-[1036px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[144px] rounded-[20px] top-[1214px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[785px] rounded-[20px] top-[1214px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1099px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1200px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1279px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1279px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1124px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1225px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1304px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1304px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[965px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1149px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1250px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1329px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1329px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[990px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1174px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1275px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1354px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1354px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1015px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1015px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1040px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1040px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1065px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1065px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1090px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1090px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1115px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1115px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1140px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1140px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1165px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1165px] w-[106px]">{`Paint & Coatings`}</p>
      <div className="absolute h-[45px] left-[170px] rounded-[10px] top-[861px] w-[46px]" data-name="image 21">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[811px] rounded-[10px] top-[861px] w-[46px]" data-name="image 25">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[494px] rounded-[10px] top-[861px] w-[46px]" data-name="image 23">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[494px] rounded-[10px] top-[1045px] w-[46px]" data-name="image 24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[170px] rounded-[10px] top-[1225px] w-[46px]" data-name="image 22">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[811px] rounded-[10px] top-[1225px] w-[46px]" data-name="image 26">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <BrandsPage15 />
      <BrandsPage16 />
      <BrandsPage17 />
      <BrandsPage18 />
      <BrandsPage19 />
      <BrandsPage20 />
    </div>
  );
}

function BrandsPage21() {
  return (
    <div className="absolute h-[24px] left-[221px] top-[1466px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage22() {
  return (
    <div className="absolute h-[24px] left-[862px] top-[1466px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage23() {
  return (
    <div className="absolute h-[24px] left-[544px] top-[1466px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage24() {
  return (
    <div className="absolute h-[24px] left-[544px] top-[1650px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage25() {
  return (
    <div className="absolute h-[24px] left-[221px] top-[1833px] w-[177px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function BrandsPage26() {
  return (
    <div className="absolute h-[24px] left-[862px] top-[1833px] w-[176px]" data-name="BrandsPage">
      <p className="absolute font-['Actor:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-px whitespace-pre">Paints and Coats</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[144px] top-[1434px]">
      <div className="absolute bg-white h-[352px] left-[144px] rounded-[20px] top-[1434px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[352px] left-[785px] rounded-[20px] top-[1434px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[174px] left-[464px] rounded-[20px] top-[1434px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[272px] left-[464px] rounded-[20px] top-[1622px] w-[295px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[144px] rounded-[20px] top-[1800px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <div className="absolute bg-white h-[180px] left-[785px] rounded-[20px] top-[1800px] w-[294px]">
        <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1501px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1685px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1786px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1865px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1865px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1526px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1710px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1811px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1890px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1890px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1551px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1735px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1836px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1915px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1576px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1760px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[549px] not-italic text-[#6a7282] text-[14px] top-[1861px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1940px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1601px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1601px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1626px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1626px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1651px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1651px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1676px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1676px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1701px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1701px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1726px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1726px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[225px] not-italic text-[#6a7282] text-[14px] top-[1751px] w-[106px]">{`Paint & Coatings`}</p>
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[866px] not-italic text-[#6a7282] text-[14px] top-[1751px] w-[106px]">{`Paint & Coatings`}</p>
      <div className="absolute h-[45px] left-[170px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 21">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[811px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 25">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[494px] rounded-[10px] top-[1447px] w-[46px]" data-name="image 23">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[494px] rounded-[10px] top-[1631px] w-[46px]" data-name="image 24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[170px] rounded-[10px] top-[1811px] w-[46px]" data-name="image 22">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <div className="absolute h-[45px] left-[811px] rounded-[10px] top-[1811px] w-[46px]" data-name="image 26">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[10px]">
          <div className="absolute bg-[#ff7a59] inset-0 rounded-[10px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage21} />
          </div>
        </div>
      </div>
      <BrandsPage21 />
      <BrandsPage22 />
      <BrandsPage23 />
      <BrandsPage24 />
      <BrandsPage25 />
      <BrandsPage26 />
    </div>
  );
}

export default function MaterialLibraryDesign() {
  return (
    <div className="bg-white relative size-full" data-name="MATERIAL LIBRARY design 12">
      <BrandsPage2 />
      <Header2 />
      <Group />
      <Group2 />
      <Group1 />
      <Group3 />
    </div>
  );
}