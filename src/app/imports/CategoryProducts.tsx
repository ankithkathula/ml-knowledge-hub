import svgPaths from "./svg-r75tvdw7a3";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";

function Button() {
  return (
    <div className="h-[24px] relative shrink-0 w-[42.297px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[21.5px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-px translate-x-[-50%]">Home</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[4.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-px">/</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[62.203px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[31.5px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-px translate-x-[-50%]">Products</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-px">Wallpapers</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Text />
      <Button1 />
      <Text />
      <Text1 />
    </div>
  );
}

function Sidebar() {
  return <div className="h-[2372px] shrink-0 w-[280px]" data-name="Sidebar" />;
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[169.25px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-px w-[170px]">Showing 1-12 of 12 products</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">Search products...</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 bg-white grow h-[38px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[17px] py-px relative size-full">
          <Icon />
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-px">Sort By:</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[33px] relative shrink-0 w-[215.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[38px] relative shrink-0 w-[507.203px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container3 />
    </div>
  );
}

function ImageErrorLoadingImage() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function CategoryDetailPage() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback />
      <Button2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Johnson Tiles</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[0.5px] not-italic text-[#101828] text-[16px] text-nowrap top-0">Premium Wallpapers Modern 453</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[27px] relative shrink-0 w-[93.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[94px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹304/Piece
        </p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[32.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[33px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹595
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[51px]">49% OFF</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[83.047px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">800x800mm</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[91.05px] rounded-[4px] top-0 w-[45.719px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">10mm</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[144.77px] rounded-[4px] top-0 w-[43.234px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Matte</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text5 />
      <Text6 />
      <Text7 />
    </div>
  );
}

function CategoryDetailPage1() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph1 />
      <Heading1 />
      <Container5 />
      <Paragraph2 />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage />
          <CategoryDetailPage1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback1() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#fb2c36] content-stretch flex h-[24px] items-start left-[12px] px-[8px] py-[4px] rounded-[8px] top-[354px] w-[81.547px]" data-name="Container">
      <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Out of Stock</p>
    </div>
  );
}

function CategoryDetailPage2() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback1 />
      <Button3 />
      <Container8 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Somany</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Luxury 126</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[63.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[64px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹64/Set
        </p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[28.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[29px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹521
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[52px]">88% OFF</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[83.047px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">800x800mm</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[91.05px] rounded-[4px] top-0 w-[44.391px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">12mm</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[143.44px] rounded-[4px] top-0 w-[39.641px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Satin</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text10 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function CategoryDetailPage3() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph3 />
      <Heading2 />
      <Container9 />
      <Paragraph4 />
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage2 />
          <CategoryDetailPage3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage1() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback2() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon3 />
    </div>
  );
}

function CategoryDetailPage4() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback2 />
      <Button4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Somany</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Elite 704</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text">
      <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[93px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ₹444/Piece
      </p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[34.813px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">4x4</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[42.81px] rounded-[4px] top-0 w-[44.922px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">18mm</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[95.73px] rounded-[4px] top-0 w-[47.531px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Glossy</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[105px] w-[358px]" data-name="Container">
      <Text14 />
      <Text15 />
      <Text16 />
    </div>
  );
}

function CategoryDetailPage5() {
  return (
    <div className="h-[141.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph5 />
      <Heading3 />
      <Text13 />
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage4 />
          <CategoryDetailPage5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback3() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function CategoryDetailPage6() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback3 />
      <Button5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Kajaria</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Royal 204</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[27px] relative shrink-0 w-[78.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[79px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹364/Box
        </p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[28.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[29px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹613
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text17 />
      <Text18 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[48px]">41% OFF</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[34.813px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">4x4</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[42.81px] rounded-[4px] top-0 w-[44.922px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">18mm</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[95.73px] rounded-[4px] top-0 w-[50.578px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Natural</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text19 />
      <Text20 />
      <Text21 />
    </div>
  );
}

function CategoryDetailPage7() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph6 />
      <Heading4 />
      <Container14 />
      <Paragraph7 />
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="[grid-area:2_/_1] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage6 />
          <CategoryDetailPage7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage2() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback4() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function CategoryDetailPage8() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback4 />
      <Button6 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">RAK Ceramics</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Imperial 130</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[27px] relative shrink-0 w-[94.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[95px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹300/Piece
        </p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[21px] relative shrink-0 w-[33.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[34px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹648
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[52px]">54% OFF</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[82.859px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">600x600mm</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[90.86px] rounded-[4px] top-0 w-[44.391px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">12mm</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[143.25px] rounded-[4px] top-0 w-[57.125px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Textured</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text24 />
      <Text25 />
      <Text26 />
    </div>
  );
}

function CategoryDetailPage9() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph8 />
      <Heading5 />
      <Container17 />
      <Paragraph9 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="[grid-area:2_/_2] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage8 />
          <CategoryDetailPage9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback5() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon6 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#fb2c36] content-stretch flex h-[24px] items-start left-[12px] px-[8px] py-[4px] rounded-[8px] top-[354px] w-[81.547px]" data-name="Container">
      <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Out of Stock</p>
    </div>
  );
}

function CategoryDetailPage10() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback5 />
      <Button7 />
      <Container20 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Kajaria</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Designer 832</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[27px] relative shrink-0 w-[57.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[58px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹61/Set
        </p>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[21px] relative shrink-0 w-[28.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[29px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹421
        </p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text27 />
      <Text28 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[52px]">86% OFF</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[34.813px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">4x4</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[42.81px] rounded-[4px] top-0 w-[45.719px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">10mm</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[96.53px] rounded-[4px] top-0 w-[57.125px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Textured</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text29 />
      <Text30 />
      <Text31 />
    </div>
  );
}

function CategoryDetailPage11() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph10 />
      <Heading6 />
      <Container21 />
      <Paragraph11 />
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="[grid-area:2_/_3] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage10 />
          <CategoryDetailPage11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage3() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback6() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage3 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#fb2c36] content-stretch flex h-[24px] items-start left-[12px] px-[8px] py-[4px] rounded-[8px] top-[354px] w-[81.547px]" data-name="Container">
      <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Out of Stock</p>
    </div>
  );
}

function CategoryDetailPage12() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback6 />
      <Button8 />
      <Container24 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Kajaria</p>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Signature 191</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[27px] relative shrink-0 w-[71.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[72px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹100/Set
        </p>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[21px] relative shrink-0 w-[30.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[31px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹573
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text32 />
      <Text33 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[51px]">83% OFF</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[34.641px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">4x8</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[42.64px] rounded-[4px] top-0 w-[41.266px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">8mm</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[91.91px] rounded-[4px] top-0 w-[50.578px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Natural</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text34 />
      <Text35 />
      <Text36 />
    </div>
  );
}

function CategoryDetailPage13() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph12 />
      <Heading7 />
      <Container25 />
      <Paragraph13 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="[grid-area:3_/_1] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage12 />
          <CategoryDetailPage13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback7() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function CategoryDetailPage14() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback7 />
      <Button9 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">RAK Ceramics</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Classic 952</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[27px] relative shrink-0 w-[69.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[70px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹167/Box
        </p>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[21px] relative shrink-0 w-[31.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[32px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹352
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text37 />
      <Text38 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[51px]">53% OFF</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[82.859px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">600x600mm</p>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[90.86px] rounded-[4px] top-0 w-[44.594px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">15mm</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[143.45px] rounded-[4px] top-0 w-[56.719px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Polished</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text39 />
      <Text40 />
      <Text41 />
    </div>
  );
}

function CategoryDetailPage15() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph14 />
      <Heading8 />
      <Container28 />
      <Paragraph15 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="[grid-area:3_/_2] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage14 />
          <CategoryDetailPage15 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage4() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback8() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage4 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function CategoryDetailPage16() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback8 />
      <Button10 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Nitco</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Modern 838</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[27px] relative shrink-0 w-[74.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[75px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹130/Box
        </p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[21px] relative shrink-0 w-[25.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[26px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹191
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[50px]">32% OFF</p>
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[82.859px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">600x600mm</p>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[90.86px] rounded-[4px] top-0 w-[44.391px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">12mm</p>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[143.25px] rounded-[4px] top-0 w-[39.641px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Satin</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text44 />
      <Text45 />
      <Text46 />
    </div>
  );
}

function CategoryDetailPage17() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph16 />
      <Heading9 />
      <Container31 />
      <Paragraph17 />
      <Container32 />
    </div>
  );
}

function Container33() {
  return (
    <div className="[grid-area:3_/_3] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage16 />
          <CategoryDetailPage17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback9() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function CategoryDetailPage18() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback9 />
      <Button11 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Century Ply</p>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Luxury 409</p>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute h-[27px] left-[16px] top-[70px] w-[77.453px]" data-name="Text">
      <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[78px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ₹452/Box
      </p>
    </div>
  );
}

function Text48() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[34.094px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">2x4</p>
    </div>
  );
}

function Text49() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[42.09px] rounded-[4px] top-0 w-[44.922px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">18mm</p>
    </div>
  );
}

function Text50() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[95.02px] rounded-[4px] top-0 w-[50.578px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Natural</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[105px] w-[358px]" data-name="Container">
      <Text48 />
      <Text49 />
      <Text50 />
    </div>
  );
}

function CategoryDetailPage19() {
  return (
    <div className="h-[141.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph18 />
      <Heading10 />
      <Text47 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="[grid-area:4_/_1] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage18 />
          <CategoryDetailPage19 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage5() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback10() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage5 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[#fb2c36] content-stretch flex h-[24px] items-start left-[12px] px-[8px] py-[4px] rounded-[8px] top-[354px] w-[81.547px]" data-name="Container">
      <p className="font-['Satoshi',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Out of Stock</p>
    </div>
  );
}

function CategoryDetailPage20() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback10 />
      <Button12 />
      <Container36 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Kajaria</p>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Elite 732</p>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[27px] relative shrink-0 w-[82.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[83px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹90/Piece
        </p>
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[21px] relative shrink-0 w-[31.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[21px] left-0 line-through text-[#99a1af] text-[14px] top-px w-[32px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          ₹687
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[27px] items-center left-[16px] top-[70px] w-[358px]" data-name="Container">
      <Text51 />
      <Text52 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[105px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] top-0 w-[50px]">87% OFF</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[83.047px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">800x800mm</p>
    </div>
  );
}

function Text54() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[91.05px] rounded-[4px] top-0 w-[45.719px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">10mm</p>
    </div>
  );
}

function Text55() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[144.77px] rounded-[4px] top-0 w-[39.641px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Satin</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[131px] w-[358px]" data-name="Container">
      <Text53 />
      <Text54 />
      <Text55 />
    </div>
  );
}

function CategoryDetailPage21() {
  return (
    <div className="h-[167.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph19 />
      <Heading11 />
      <Container37 />
      <Paragraph20 />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="[grid-area:4_/_2] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage20 />
          <CategoryDetailPage21 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageWithFallback11() {
  return <div className="absolute left-0 size-[390px] top-0" data-name="ImageWithFallback" />;
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13f2e300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon12 />
    </div>
  );
}

function CategoryDetailPage22() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback11 />
      <Button13 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Greenply</p>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[24px] left-[16px] overflow-clip top-[38px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-px">Premium Wallpapers Royal 275</p>
    </div>
  );
}

function Text56() {
  return (
    <div className="absolute h-[27px] left-[16px] top-[70px] w-[71.219px]" data-name="Text">
      <p className="absolute font-['Satoshi','Noto_Sans:Regular',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-px w-[72px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ₹376/Set
      </p>
    </div>
  );
}

function Text57() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-0 rounded-[4px] top-0 w-[82.859px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">600x600mm</p>
    </div>
  );
}

function Text58() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[90.86px] rounded-[4px] top-0 w-[41.266px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">8mm</p>
    </div>
  );
}

function Text59() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20.5px] left-[140.13px] rounded-[4px] top-0 w-[47.531px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16.5px] left-[8px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[3px]">Glossy</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[20.5px] left-[16px] top-[105px] w-[358px]" data-name="Container">
      <Text57 />
      <Text58 />
      <Text59 />
    </div>
  );
}

function CategoryDetailPage23() {
  return (
    <div className="h-[141.5px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph21 />
      <Heading12 />
      <Text56 />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="[grid-area:4_/_3] bg-white place-self-stretch relative rounded-[20px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <CategoryDetailPage22 />
          <CategoryDetailPage23 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] h-[2310px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container11 />
      <Container13 />
      <Container16 />
      <Container19 />
      <Container23 />
      <Container27 />
      <Container30 />
      <Container33 />
      <Container35 />
      <Container39 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="basis-0 grow h-[2372px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container4 />
        <Container42 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[32px] h-[2372px] items-start relative shrink-0 w-full" data-name="Container">
      <Sidebar />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[2484px] items-start left-[151.5px] pb-0 pt-[32px] px-[32px] top-[400px] w-[1600px]" data-name="Container">
      <Container />
      <Container44 />
    </div>
  );
}

function ImageWithFallback12() {
  return <div className="absolute h-[400px] left-[8px] top-0 w-[1895px]" data-name="ImageWithFallback" />;
}

function Container46() {
  return <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.4)] h-[400px] left-[13px] to-[rgba(0,0,0,0.6)] top-0 via-50% via-[rgba(0,0,0,0.3)] w-[1895px]" data-name="Container" />;
}

function Container47() {
  return (
    <div className="absolute h-[400px] left-[-13px] top-0 w-[1916px]" data-name="Container">
      <ImageWithFallback12 />
      <Container46 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[84px] relative shrink-0 w-[409.25px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[84px] left-[205.13px] not-italic text-[84px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Wallpapers</p>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[28px] relative shrink-0 w-[462.281px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-[231.5px] not-italic text-[20px] text-[rgba(255,255,255,0.9)] text-center top-0 translate-x-[-50%] w-[463px]">Discover premium wallpapers products and materials</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[400px] items-center justify-center left-0 top-0 w-[1903px]" data-name="Container">
      <Heading />
      <Paragraph22 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[400px] left-0 overflow-clip top-0 w-[1903px]" data-name="Section">
      <Container47 />
      <Container48 />
    </div>
  );
}

function CategoryDetailPage24() {
  return (
    <div className="absolute bg-white h-[2884px] left-0 top-0 w-[1903px]" data-name="CategoryDetailPage">
      <Container45 />
      <Section />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[27px] left-[24px] top-[24px] w-[230px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[27px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-px">Filters</p>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[21px] relative shrink-0 w-[74.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[37.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Price Range</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 10L8 6L4 10" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Button">
      <Text60 />
      <Icon13 />
    </div>
  );
}

function NumberInput() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-[103.641px]" data-name="Number Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(16,24,40,0.5)] text-nowrap">0</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[24px] relative shrink-0 w-[6.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-px">-</p>
      </div>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-[103.641px]" data-name="Number Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(16,24,40,0.5)] text-nowrap">1000</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] h-[38px] items-center relative shrink-0 w-full" data-name="Container">
      <NumberInput />
      <Text61 />
      <NumberInput1 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[71px] items-start left-[24px] top-[75px] w-[230px]" data-name="Container">
      <Button14 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[170px] w-[230px]" data-name="Container" />;
}

function Text62() {
  return (
    <div className="h-[21px] relative shrink-0 w-[84.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[42.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Sub Category</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 10L8 6L4 10" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Button">
      <Text62 />
      <Icon14 />
    </div>
  );
}

function Checkbox() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text63() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[104.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-0">Architectural Films</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <Checkbox />
      <Text63 />
    </div>
  );
}

function Checkbox1() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text64() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[91.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-0">Functional Films</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <Checkbox1 />
      <Text64 />
    </div>
  );
}

function Checkbox2() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text65() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[77.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-0">Graphic Films</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[19.5px] items-center relative shrink-0 w-full" data-name="Label">
      <Checkbox2 />
      <Text65 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[74.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[107.5px] items-start left-[24px] top-[187px] w-[230px]" data-name="Container">
      <Button15 />
      <Container52 />
    </div>
  );
}

function Container54() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[318.5px] w-[230px]" data-name="Container" />;
}

function Text66() {
  return (
    <div className="h-[21px] relative shrink-0 w-[68.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[34.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Application</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[335.5px] w-[230px]" data-name="Button">
      <Text66 />
      <Icon15 />
    </div>
  );
}

function Container55() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[380.5px] w-[230px]" data-name="Container" />;
}

function Text67() {
  return (
    <div className="h-[21px] relative shrink-0 w-[24.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[12.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Size</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[397.5px] w-[230px]" data-name="Button">
      <Text67 />
      <Icon16 />
    </div>
  );
}

function Container56() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[442.5px] w-[230px]" data-name="Container" />;
}

function Text68() {
  return (
    <div className="h-[21px] relative shrink-0 w-[59.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[30px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Thickness</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[459.5px] w-[230px]" data-name="Button">
      <Text68 />
      <Icon17 />
    </div>
  );
}

function Container57() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[504.5px] w-[230px]" data-name="Container" />;
}

function Text69() {
  return (
    <div className="h-[21px] relative shrink-0 w-[34.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[17.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Color</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[521.5px] w-[230px]" data-name="Button">
      <Text69 />
      <Icon18 />
    </div>
  );
}

function Container58() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[566.5px] w-[230px]" data-name="Container" />;
}

function Text70() {
  return (
    <div className="h-[21px] relative shrink-0 w-[35.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[18px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Finish</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[583.5px] w-[230px]" data-name="Button">
      <Text70 />
      <Icon19 />
    </div>
  );
}

function Container59() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[628.5px] w-[230px]" data-name="Container" />;
}

function Text71() {
  return (
    <div className="h-[21px] relative shrink-0 w-[36.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[18.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Brand</p>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[24px] top-[645.5px] w-[230px]" data-name="Button">
      <Text71 />
      <Icon20 />
    </div>
  );
}

function Container60() {
  return <div className="absolute bg-[#e5e7eb] h-px left-[24px] top-[690.5px] w-[230px]" data-name="Container" />;
}

function Checkbox3() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text72() {
  return (
    <div className="h-[21px] relative shrink-0 w-[47.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-px">In Store</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[24px] top-[707.5px] w-[230px]" data-name="Label">
      <Checkbox3 />
      <Text72 />
    </div>
  );
}

function Checkbox4() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text73() {
  return (
    <div className="h-[21px] relative shrink-0 w-[89.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-px">Show Samples</p>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[24px] top-[744.5px] w-[230px]" data-name="Label">
      <Checkbox4 />
      <Text73 />
    </div>
  );
}

function CategoryDetailPage25() {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[807.5px] left-[183.5px] rounded-[10px] top-[480px] w-[280px]" data-name="CategoryDetailPage">
      <Heading13 />
      <Container50 />
      <Container51 />
      <Container53 />
      <Container54 />
      <Button16 />
      <Container55 />
      <Button17 />
      <Container56 />
      <Button18 />
      <Container57 />
      <Button19 />
      <Container58 />
      <Button20 />
      <Container59 />
      <Button21 />
      <Container60 />
      <Label3 />
      <Label4 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white h-[2884px] left-0 overflow-clip top-0 w-[1903px]" data-name="App">
      <CategoryDetailPage24 />
      <CategoryDetailPage25 />
    </div>
  );
}

function ImageMaterialLibrary() {
  return (
    <div className="h-[36px] relative shrink-0 w-[154.75px]" data-name="Image (Material Library)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
    </div>
  );
}

function Icon21() {
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
    <div className="basis-0 grow h-[20.969px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14.7px] text-nowrap">Pincode</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="bg-[#f3f4f6] h-[36.969px] relative rounded-[10px] shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[12px] py-0 relative size-full">
        <Icon21 />
        <TextInput1 />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[21px] opacity-70 relative shrink-0 w-[120.141px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#9747ff] text-[14.7px] text-nowrap top-px">Knowledge Center</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[36.969px] items-center left-0 top-[0.02px] w-[768px]" data-name="Container">
      <ImageMaterialLibrary />
      <Container61 />
      <Link />
    </div>
  );
}

function Icon22() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[33.33%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
              <path d={svgPaths.p31080000} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-1/2 right-1/2 top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.67px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 2.66667">
              <path d="M0.666667 0.666667V2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[83.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.67px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 2.66667">
              <path d="M0.666667 0.666667V2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_73.58%_73.58%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.27333 2.27333">
              <path d={svgPaths.p2178fec0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_20.54%_20.54%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.27333 2.27333">
              <path d={svgPaths.p2178fec0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[8.33%] right-[83.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 1.33333">
              <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[83.33%] right-[8.33%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-50%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 1.33333">
              <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[73.58%_73.58%_20.54%_20.54%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.27333 2.27333">
              <path d={svgPaths.p1dae0c80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[20.54%_20.54%_73.58%_73.58%]" data-name="Vector">
          <div className="absolute inset-[-70.92%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.27333 2.27333">
              <path d={svgPaths.p1dae0c80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute content-stretch flex items-start left-[499.69px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[32px] top-[2.5px]" data-name="Button">
      <Icon22 />
    </div>
  );
}

function Container63() {
  return <div className="absolute bg-[#d1d5dc] h-[20px] left-[543.69px] top-[8.5px] w-px" data-name="Container" />;
}

function Button23() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-start left-[556.69px] px-[12px] py-0 top-[8px] w-[68.203px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14.7px] text-center text-nowrap">Sign In</p>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex h-[37px] items-start left-[636.89px] px-[16px] py-[8px] rounded-[10px] top-0 w-[83.109px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14.7px] text-center text-nowrap text-white">Sign Up</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4767_1113)" id="Icon">
          <path d={svgPaths.p32514c00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2734ea00} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35b01b80} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_4767_1113">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text74() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex items-center justify-center left-[24px] rounded-[3.35544e+07px] size-[16px] top-[-4px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[12.6px] text-center text-nowrap text-white">0</p>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute left-[732px] rounded-[10px] size-[36px] top-[0.5px]" data-name="Button">
      <Icon23 />
      <Text74 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[37px] left-[768px] top-0 w-[768px]" data-name="Container">
      <Button22 />
      <Container63 />
      <Button23 />
      <Button24 />
      <Button25 />
    </div>
  );
}

function Button26() {
  return (
    <div className="h-[21px] relative shrink-0 w-[47.688px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[24px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%]">Brands</p>
      </div>
    </div>
  );
}

function Container65() {
  return <div className="bg-[#d1d5dc] h-[20px] shrink-0 w-px" data-name="Container" />;
}

function Button27() {
  return (
    <div className="h-[21px] relative shrink-0 w-[61.094px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[31px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%]">Products</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[57.5px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#364153] text-[14.7px] text-nowrap top-px">Services</p>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[45px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%]">Professionals</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[21px] items-center left-[566.44px] top-[8px] w-[403.125px]" data-name="Navigation">
      <Button26 />
      <Container65 />
      <Button27 />
      <Container65 />
      <Link1 />
      <Container65 />
      <Button28 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Container64 />
      <Navigation />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-px pt-[14px] px-[183.5px] relative size-full">
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[68.66px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button29() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[88.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Flooring</p>
        <Icon24 />
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-[67.58px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button30() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Lighting</p>
        <Icon25 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-[67.86px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button31() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.859px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Sanitary</p>
        <Icon26 />
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-[134.11px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button32() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[154.109px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[69.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">{`Doors & Windows`}</p>
        <Icon27 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[100.28px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button33() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[120.281px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[52.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Wall Finishes</p>
        <Icon28 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[64.08px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button34() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[84.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[34.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Kitchen</p>
        <Icon29 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[78.73px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button35() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[98.734px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[41.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Hardware</p>
        <Icon30 />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-[52.28px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button36() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[72.281px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[28.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">HVAC</p>
        <Icon31 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[74.94px] size-[12px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button37() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[94.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[39.5px] not-italic text-[#e5e7eb] text-[14.7px] text-center text-nowrap top-[7px] translate-x-[-50%]">Electrical</p>
        <Icon32 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="basis-0 grow h-[33px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center relative size-full">
        <Button29 />
        <Button30 />
        <Button31 />
        <Button32 />
        <Button33 />
        <Button34 />
        <Button35 />
        <Button36 />
        <Button37 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[92.516px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[12px] not-italic text-[#e5e7eb] text-[14.7px] text-nowrap top-px">View All →</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex h-[57px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Link2 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2d2d2d] h-[58px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#364153] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-0 pt-px px-[183.5px] relative size-full">
          <Container68 />
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[125px] items-start left-0 pb-px pt-0 px-0 top-0 w-[1903px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Header />
      <Header1 />
    </div>
  );
}

export default function CategoryProducts() {
  return (
    <div className="bg-white relative size-full" data-name="category > Products">
      <App />
      <Header2 />
    </div>
  );
}