import svgPaths from "./svg-uac2fji24g";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import { imgVector, imgVector1 } from "./svg-x9m7r";

function Sidebar() {
  return <div className="absolute h-[2904.887px] left-0 top-0 w-[279.991px]" data-name="Sidebar" />;
}

function Paragraph() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[176.687px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.83px] w-[177px]">Showing 1-24 of 24 products</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="Group">
      <div className="absolute inset-[69.42%_12.5%_12.5%_69.42%]" data-name="Vector">
        <div className="absolute inset-[-23.04%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.22433 4.22433">
            <path d={svgPaths.p29be7340} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9935 11.9935">
            <path d={svgPaths.p2fadd8f0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[20.987px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">Search products...</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[37.996px] relative rounded-[10px] shrink-0 w-[279.991px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center px-[17.831px] py-[0.835px] relative size-full">
        <Container />
        <TextInput />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[19.996px] relative shrink-0 w-[48.209px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Sort By:</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[37.996px] relative shrink-0 w-[340.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container18 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function ProductSearchHeader() {
  return (
    <div className="absolute content-stretch flex h-[37.996px] items-center justify-between left-0 top-[48px] w-[849.13px]" data-name="ProductSearchHeader">
      <Paragraph />
      <Container19 />
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

function Button() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon7 />
    </div>
  );
}

function CategoryDetailPage() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback />
      <Button />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">wOOD</p>
    </div>
  );
}

function Heading3() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage1() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph7 />
      <Heading3 />
      <Text />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white h-[453px] left-[-6.99px] rounded-[20px] top-[0.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage />
        <CategoryDetailPage1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage1() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback1() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage1 />
    </div>
  );
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

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function CategoryDetailPage2() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback1 />
      <Button1 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Workwear</p>
    </div>
  );
}

function Heading4() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text1() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage3() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph8 />
      <Heading4 />
      <Text1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-white h-[453px] left-[-6.99px] rounded-[20px] top-[488.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage2 />
        <CategoryDetailPage3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage2() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback2() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage2 />
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

function Button2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function CategoryDetailPage4() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback2 />
      <Button2 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">sOUND</p>
    </div>
  );
}

function Heading5() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text2() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage5() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph9 />
      <Heading5 />
      <Text2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-white h-[453px] left-[-6.99px] rounded-[20px] top-[976.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage4 />
        <CategoryDetailPage5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage3() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback3() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage3 />
    </div>
  );
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

function Button3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function CategoryDetailPage6() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback3 />
      <Button3 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">Metal</p>
    </div>
  );
}

function Heading6() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text3() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage7() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph10 />
      <Heading6 />
      <Text3 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-white h-[453px] left-[-6.99px] rounded-[20px] top-[1464.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage6 />
        <CategoryDetailPage7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage4() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback4() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage4 />
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

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon11 />
    </div>
  );
}

function CategoryDetailPage8() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback4 />
      <Button4 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">ELECTRICAL</p>
    </div>
  );
}

function Heading7() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text4() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage9() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph11 />
      <Heading7 />
      <Text4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white h-[453px] left-[-6.99px] rounded-[20px] top-[1952.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage8 />
        <CategoryDetailPage9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage5() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback5() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage5 />
    </div>
  );
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

function Button5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[346px] rounded-[3.35544e+07px] size-[32px] top-[12px]" data-name="Button">
      <Icon12 />
    </div>
  );
}

function CategoryDetailPage10() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback5 />
      <Button5 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">tILE</p>
    </div>
  );
}

function Heading8() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text5() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage11() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph12 />
      <Heading8 />
      <Text5 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-white h-[453px] left-[425.01px] rounded-[20px] top-[0.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage10 />
        <CategoryDetailPage11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage6() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback6() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage6 />
    </div>
  );
}

function Icon13() {
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
      <Icon13 />
    </div>
  );
}

function CategoryDetailPage12() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback6 />
      <Button6 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">sTONE</p>
    </div>
  );
}

function Heading9() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text6() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage13() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph13 />
      <Heading9 />
      <Text6 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-white h-[453px] left-[425.01px] rounded-[20px] top-[488.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage12 />
        <CategoryDetailPage13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage7() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback7() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage7 />
    </div>
  );
}

function Icon14() {
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
      <Icon14 />
    </div>
  );
}

function CategoryDetailPage14() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback7 />
      <Button7 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">{`Plumbing Fixtures & Fittings`}</p>
    </div>
  );
}

function Heading10() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text7() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage15() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph14 />
      <Heading10 />
      <Text7 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white h-[453px] left-[425.01px] rounded-[20px] top-[976.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage14 />
        <CategoryDetailPage15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage8() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback8() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage8 />
    </div>
  );
}

function Icon15() {
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
      <Icon15 />
    </div>
  );
}

function CategoryDetailPage16() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback8 />
      <Button8 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">GLASS</p>
    </div>
  );
}

function Heading11() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text8() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage17() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph15 />
      <Heading11 />
      <Text8 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-white h-[453px] left-[425.01px] rounded-[20px] top-[1464.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage16 />
        <CategoryDetailPage17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function ImageErrorLoadingImage9() {
  return <div className="absolute left-[151px] size-[88px] top-[151px]" data-name="Image (Error loading image)" />;
}

function ImageWithFallback9() {
  return (
    <div className="absolute bg-[#f3f4f6] left-0 size-[390px] top-0" data-name="ImageWithFallback">
      <ImageErrorLoadingImage9 />
    </div>
  );
}

function Icon16() {
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
      <Icon16 />
    </div>
  );
}

function CategoryDetailPage18() {
  return (
    <div className="h-[390px] overflow-clip relative shrink-0 w-full" data-name="CategoryDetailPage">
      <ImageWithFallback9 />
      <Button9 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[18px] left-[16px] top-[16px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0 tracking-[0.3px] uppercase">CARPET</p>
    </div>
  );
}

function Heading12() {
  return <div className="absolute h-[24px] left-[16px] top-[38px] w-[358px]" data-name="Heading 3" />;
}

function Text9() {
  return <div className="absolute h-[27px] left-[16px] top-[70px] w-[92.875px]" data-name="Text" />;
}

function CategoryDetailPage19() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="CategoryDetailPage">
      <Paragraph16 />
      <Heading12 />
      <Text9 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-white h-[453px] left-[425.01px] rounded-[20px] top-[1952.02px] w-[392px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CategoryDetailPage18 />
        <CategoryDetailPage19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[2738.896px] left-0 top-[117.99px] w-[849.13px]" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function CategoriesGrid() {
  return (
    <div className="absolute h-[2904.887px] left-[303.99px] top-0 w-[849.13px]" data-name="CategoriesGrid">
      <ProductSearchHeader />
      <Container30 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[2904.887px] left-[32px] top-[447.99px] w-[1153.122px]" data-name="Container">
      <Sidebar />
      <CategoriesGrid />
    </div>
  );
}

function ImageDesignerPaintCollection() {
  return <div className="absolute bg-[#4a4a4a] h-[399.991px] left-0 opacity-40 top-0 w-[1217.113px]" data-name="Image (Designer Paint Collection 2025)" />;
}

function Heading2() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[658.957px]" data-name="Heading 2">
      <p className="absolute font-['Satoshi',sans-serif] leading-[48px] left-[329.5px] not-italic text-[48px] text-center text-nowrap text-white top-[2.32px] translate-x-[-50%]">Designer Paint Collection 2025</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[27.991px] left-0 top-[63.99px] w-[658.957px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-[329.9px] not-italic text-[20px] text-[rgba(255,255,255,0.9)] text-center text-nowrap top-[-0.17px] translate-x-[-50%]">Transform spaces with curated color palettes</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[179.961px] left-[279.08px] top-[110.01px] w-[658.957px]" data-name="Container">
      <Heading2 />
      <Paragraph17 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[399.991px] left-0 top-0 w-[1217.113px]" data-name="Container">
      <ImageDesignerPaintCollection />
      <Container32 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
            <path d="M7 13L1 7L7 1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col items-start left-[32px] pb-0 pt-[12px] px-[12px] rounded-[2.80107e+07px] size-[48px] top-[176px]" data-name="Button">
      <Icon17 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
            <path d="M1 13L7 7L1 1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col items-start left-[1137.12px] pb-0 pt-[12px] px-[12px] rounded-[2.80107e+07px] size-[48px] top-[176px]" data-name="Button">
      <Icon18 />
    </div>
  );
}

function Button12() {
  return <div className="bg-[rgba(255,255,255,0.4)] rounded-[2.80107e+07px] shrink-0 size-[7.996px]" data-name="Button" />;
}

function Button13() {
  return <div className="bg-white h-[7.996px] rounded-[2.80107e+07px] shrink-0 w-[31.996px]" data-name="Button" />;
}

function Container34() {
  return (
    <div className="absolute content-stretch flex gap-[7.996px] h-[7.996px] items-start left-[576.57px] top-[360px] w-[63.978px]" data-name="Container">
      {[...Array(2).keys()].map((_, i) => (
        <Button12 key={i} />
      ))}
      <Button13 />
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute bg-[#f5f5f0] h-[399.991px] left-0 overflow-clip top-0 w-[1217.113px]" data-name="Hero">
      <Container33 />
      <Button10 />
      <Button11 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px_0px_0px] border-solid h-[514.983px] left-0 top-0 w-[1217.113px]" data-name="Container" />;
}

function ImageMaterialLibrary() {
  return (
    <div className="absolute h-[31.996px] left-0 top-0 w-[137.543px]" data-name="ImageMaterialLibrary">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMaterialLibrary} />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[45.496px] left-0 top-[56px] w-[445.996px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] w-[446px]">{`India's First unique digital platform transforming the construction industry ecosystem.`}</p>
    </div>
  );
}

function Container36() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Container" />;
}

function Icon19() {
  return (
    <div className="absolute bottom-[8.33%] contents left-[29.17%] right-1/4 top-[8.34%]" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-[29.17%] right-1/4 top-[8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66195 14.6587">
            <path d={svgPaths.p2030e00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon19 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.991px] top-[12px]" data-name="Icon">
      <Icon20 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute left-0 size-[39.991px] top-0" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-white left-0 rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Link">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container38() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Container" />;
}

function Icon22() {
  return (
    <div className="absolute contents inset-[16.64%_8.33%_12.5%_8.34%]" data-name="Icon">
      <div className="absolute inset-[16.64%_8.33%_12.5%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%_-5.91%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6588 12.668">
            <path d={svgPaths.p15194100} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon22 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.991px] top-[12px]" data-name="Icon1">
      <Icon23 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute left-0 size-[39.991px] top-0" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute bg-white left-[51.99px] rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Link1">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container40() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Container" />;
}

function Icon24() {
  return (
    <div className="absolute contents inset-[8.34%_8.33%_8.33%_8.34%]" data-name="Icon">
      <div className="absolute inset-[8.34%_8.33%_8.33%_8.34%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.333px] mask-size-[15.991px_15.991px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6587 14.6587">
            <path d={svgPaths.p1db02080} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.15%_33.15%_33.51%_33.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.359px_-5.302px] mask-size-[15.991px_15.991px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66305 6.66302">
            <path d={svgPaths.p22126f00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.08%_27.04%_72.92%_72.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.661px_-4.331px] mask-size-[15.991px_15.991px]" data-name="Vector_3" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33921 1.33261">
            <path d="M0.666303 0.666303H0.672902" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.991px] top-[12px]" data-name="Icon2">
      <Icon25 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute left-0 size-[39.991px] top-0" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute bg-white left-[103.98px] rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Link2">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container42() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Container" />;
}

function Icon26() {
  return (
    <div className="absolute contents inset-[8.34%_8.33%_12.5%_8.34%]" data-name="Icon">
      <div className="absolute inset-[33.34%_8.33%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32829 9.99456">
            <path d={svgPaths.p1f2a8cc0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[8.34%] right-3/4 top-[37.5%]" data-name="Vector_2">
        <div className="absolute inset-[-8.33%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99783 9.32826">
            <path d={svgPaths.p3bc15c00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[8.34%] right-3/4 top-[8.34%]" data-name="Vector_3">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99783 3.99783">
            <path d={svgPaths.p3f29ca00} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon26 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.991px] top-[12px]" data-name="Icon3">
      <Icon27 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute left-0 size-[39.991px] top-0" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute bg-white left-[155.97px] rounded-[2.80107e+07px] size-[39.991px] top-0" data-name="Link3">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[39.991px] left-0 top-[125.49px] w-[468px]" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[171.991px] left-0 top-0 w-[468px]" data-name="Container1">
      <ImageMaterialLibrary />
      <Paragraph18 />
      <Container44 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-[0.99px] w-[68.27px]" data-name="Heading">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Company</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[3.99px] w-[56.53px]" data-name="Link4">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">About Us</p>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[39.99px] w-[47.635px]" data-name="Link5">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Careers</p>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[75.99px] w-[32.713px]" data-name="Link6">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Press</p>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[111.99px] w-[28.004px]" data-name="Link7">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Blog</p>
    </div>
  );
}

function List() {
  return (
    <div className="absolute h-[132px] left-0 top-[39.99px] w-[209.987px]" data-name="List">
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[171.991px] left-[516px] top-0 w-[209.987px]" data-name="Container2">
      <Heading />
      <List />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-[0.99px] w-[71.726px]" data-name="Heading1">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Resources</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[3.99px] w-[74.178px]" data-name="Link8">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Help Center</p>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[39.99px] w-[71.1px]" data-name="Link9">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Community</p>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[75.99px] w-[42.874px]" data-name="Link10">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Guides</p>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[111.99px] w-[51.078px]" data-name="Link11">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Partners</p>
    </div>
  );
}

function List1() {
  return (
    <div className="absolute h-[132px] left-0 top-[39.99px] w-[209.987px]" data-name="List1">
      <Link8 />
      <Link9 />
      <Link10 />
      <Link11 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[171.991px] left-[773.99px] top-0 w-[209.987px]" data-name="Container3">
      <Heading1 />
      <List1 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[24px] left-0 top-[0.99px] w-[37.63px]" data-name="Heading2">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Legal</p>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[3.99px] w-[83.883px]" data-name="Link12">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Privacy Policy</p>
    </div>
  );
}

function Link13() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[39.99px] w-[101.074px]" data-name="Link13">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Terms of Service</p>
    </div>
  );
}

function Link14() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[75.99px] w-[83.152px]" data-name="Link14">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Cookie Policy</p>
    </div>
  );
}

function Link15() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[111.99px] w-[63.587px]" data-name="Link15">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Disclaimer</p>
    </div>
  );
}

function List2() {
  return (
    <div className="absolute h-[132px] left-0 top-[39.99px] w-[209.987px]" data-name="List2">
      <Link12 />
      <Link13 />
      <Link14 />
      <Link15 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[171.991px] left-[1032px] top-0 w-[209.987px]" data-name="Container4">
      <Heading13 />
      <List2 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[24px] left-0 top-[0.99px] w-[62.178px]" data-name="Heading3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.67px]">Products</p>
    </div>
  );
}

function Link16() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[3.99px] w-[42.783px]" data-name="Link16">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Brands</p>
    </div>
  );
}

function Link17() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[39.99px] w-[60.678px]" data-name="Link17">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Designers</p>
    </div>
  );
}

function Link18() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[75.99px] w-[44.843px]" data-name="Link18">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Studios</p>
    </div>
  );
}

function Link19() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[111.99px] w-[53.348px]" data-name="Link19">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Students</p>
    </div>
  );
}

function List3() {
  return (
    <div className="absolute h-[132px] left-0 top-[39.99px] w-[209.987px]" data-name="List3">
      <Link16 />
      <Link17 />
      <Link18 />
      <Link19 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[171.991px] left-[1290px] top-0 w-[209.987px]" data-name="Container5">
      <Heading14 />
      <List3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[171.991px] left-[32px] top-[63.99px] w-[1153.122px]" data-name="Container6">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container45() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px_0px_0px] border-solid h-[81px] left-0 top-0 w-[1153.122px]" data-name="Container" />;
}

function Icon28() {
  return (
    <div className="absolute contents inset-[16.67%_8.33%_16.66%_8.33%]" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.68%_-5%_-16.67%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3296 6.66331">
            <path d={svgPaths.p1a6da400} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66631" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_16.66%_8.33%]" data-name="Vector_2">
        <div className="absolute inset-[-6.25%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3294 14.9968">
            <path d={svgPaths.p1eed4d00} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66631" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[19.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon28 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[19.996px] top-[2px]" data-name="Icon4">
      <Icon29 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[0.99px] w-[33.196px]" data-name="Paragraph1">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Email</p>
    </div>
  );
}

function Link20() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[27.99px] w-[140.061px]" data-name="Link20">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">contact@platform.com</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[48px] left-[32px] top-0 w-[140.061px]" data-name="Container7">
      <Paragraph1 />
      <Link20 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[368.374px]" data-name="Container8">
      <Icon4 />
      <Container7 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute contents inset-[8.33%]" data-name="Icon">
      <div className="absolute inset-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.666px] mask-size-[19.996px_19.996px]" data-name="Vector" style={{ maskImage: `url('${imgVector1}')` }}>
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3294 18.3294">
            <path d={svgPaths.p12d9d280} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66631" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Icon30 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[19.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[19.996px] top-[2px]" data-name="Icon5">
      <Icon31 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[0.99px] w-[39.678px]" data-name="Paragraph2">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Phone</p>
    </div>
  );
}

function Link21() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[27.99px] w-[113.126px]" data-name="Link21">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">+91 123 456 7890</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[48px] left-[32px] top-0 w-[113.113px]" data-name="Container9">
      <Paragraph2 />
      <Link21 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[48px] left-[392.37px] top-0 w-[368.374px]" data-name="Container10">
      <Icon5 />
      <Container9 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute contents inset-[8.33%_16.66%_8.34%_16.67%]" data-name="Icon">
      <div className="absolute inset-[8.33%_16.66%_8.34%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9968 18.3292">
            <path d={svgPaths.p19992c80} id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66631" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector_2">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66523 6.6652">
            <path d={svgPaths.p6d3500} id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66631" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[19.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon32 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[19.996px] top-[2px]" data-name="Icon6">
      <Icon33 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[0.99px] w-[49.252px]" data-name="Paragraph3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.83px]">Address</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[24.98px] w-[170.674px]" data-name="Paragraph4">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Mumbai, Maharashtra, India</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[43.996px] left-[32px] top-0 w-[170.687px]" data-name="Container11">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[48px] left-[784.75px] top-0 w-[368.374px]" data-name="Container12">
      <Icon6 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[48px] left-0 top-[33px] w-[1153.122px]" data-name="Container13">
      <Container8 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[81px] left-[32px] top-[283.98px] w-[1153.122px]" data-name="Container14">
      <Container45 />
      <Container13 />
    </div>
  );
}

function Container46() {
  return <div className="absolute border-[#e5e7eb] border-[0.835px_0px_0px] border-solid h-[52.996px] left-0 top-0 w-[1153.122px]" data-name="Container" />;
}

function Paragraph5() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[17.99px] w-[307.683px]" data-name="Paragraph5">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">© 2025 Construction Platform. All rights reserved.</p>
    </div>
  );
}

function Link22() {
  return (
    <div className="absolute h-[19.996px] left-0 top-[0.99px] w-[43.97px]" data-name="Link22">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Privacy</p>
    </div>
  );
}

function Link23() {
  return (
    <div className="absolute h-[19.996px] left-[67.96px] top-[0.99px] w-[36.483px]" data-name="Link23">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Terms</p>
    </div>
  );
}

function Link24() {
  return (
    <div className="absolute h-[19.996px] left-[128.44px] top-[0.99px] w-[49.317px]" data-name="Link24">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.83px]">Cookies</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[19.996px] left-[975.37px] top-[17px] w-[177.757px]" data-name="Container15">
      <Link22 />
      <Link23 />
      <Link24 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[52.996px] left-[32px] top-[412.98px] w-[1153.122px]" data-name="Container16">
      <Container46 />
      <Paragraph5 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[513.991px] left-0 top-[0.99px] w-[1217.113px]" data-name="Container17">
      <Container6 />
      <Container14 />
      <Container16 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#f9fafb] h-[514.983px] left-0 top-[3416.87px] w-[1217.113px]" data-name="Footer">
      <Container35 />
      <Container17 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#faf8f5] h-[3931.852px] left-0 top-[66px] w-[1217.113px]" data-name="App">
      <Container31 />
      <Hero />
      <Footer />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[27px] left-0 not-italic text-[#101828] text-[18px] text-nowrap top-[0.67px]">Filters</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[44.022px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[22.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-[0.67px] translate-x-[-50%]">Brands</p>
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.p2b29b140} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text10 />
          <Icon34 />
        </div>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-white h-[37.996px] left-0 rounded-[10px] top-0 w-[220.304px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[12px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">Search brands...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-[12px] size-[15.991px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.p1421ff80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          <path d={svgPaths.p3339a00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[37.996px] relative shrink-0 w-full" data-name="Container">
      <TextInput1 />
      <Icon35 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[64.252px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">WoodCraft</p>
    </div>
  );
}

function Checkbox() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text11 />
      <Checkbox />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[86.791px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">TimberMasters</p>
    </div>
  );
}

function Checkbox1() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text12 />
      <Checkbox1 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[53.374px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Greenply</p>
    </div>
  );
}

function Checkbox2() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text13 />
      <Checkbox2 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[39.757px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Kajaria</p>
    </div>
  );
}

function Checkbox3() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text14 />
      <Checkbox3 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[47.022px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Somany</p>
    </div>
  );
}

function Checkbox4() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text15 />
      <Checkbox4 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[31.096px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Nitco</p>
    </div>
  );
}

function Checkbox5() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text16 />
      <Checkbox5 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[60.939px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">StoneMart</p>
    </div>
  );
}

function Checkbox6() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text17 />
      <Checkbox6 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[67.5px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">MarbleTech</p>
    </div>
  );
}

function Checkbox7() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text18 />
      <Checkbox7 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[70.604px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Asian Paints</p>
    </div>
  );
}

function Checkbox8() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text19 />
      <Checkbox8 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[78.365px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Berger Paints</p>
    </div>
  );
}

function Checkbox9() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text20 />
      <Checkbox9 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[77.087px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Saint-Gobain</p>
    </div>
  );
}

function Checkbox10() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label10() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text21 />
      <Checkbox10 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[54.704px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">AIS Glass</p>
    </div>
  );
}

function Checkbox11() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label11() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text22 />
      <Checkbox11 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[23.57px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Yale</p>
    </div>
  );
}

function Checkbox12() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label12() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text23 />
      <Checkbox12 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[38.661px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Dorset</p>
    </div>
  );
}

function Checkbox13() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label13() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text24 />
      <Checkbox13 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[61.304px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">MetalCraft</p>
    </div>
  );
}

function Checkbox14() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label14() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text25 />
      <Checkbox14 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[61.826px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Armstrong</p>
    </div>
  );
}

function Checkbox15() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label15() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text26 />
      <Checkbox15 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[73.03px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Caesarstone</p>
    </div>
  );
}

function Checkbox16() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label16() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text27 />
      <Checkbox16 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[41.778px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Neolith</p>
    </div>
  );
}

function Checkbox17() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label17() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text28 />
      <Checkbox17 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[47.674px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">{`D'Decor`}</p>
    </div>
  );
}

function Checkbox18() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label18() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text29 />
      <Checkbox18 />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[42.052px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Portico</p>
    </div>
  );
}

function Checkbox19() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label19() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text30 />
      <Checkbox19 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[64.004px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Alucobond</p>
    </div>
  );
}

function Checkbox20() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label20() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text31 />
      <Checkbox20 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[24.143px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Trex</p>
    </div>
  );
}

function Checkbox21() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label21() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text32 />
      <Checkbox21 />
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[18.561px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">3M</p>
    </div>
  );
}

function Checkbox22() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label22() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Label">
      <Text33 />
      <Checkbox22 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[255.991px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[7.996px] items-start pl-0 pr-[10.017px] py-0 relative size-full">
          <Label />
          <Label1 />
          <Label2 />
          <Label3 />
          <Label4 />
          <Label5 />
          <Label6 />
          <Label7 />
          <Label8 />
          <Label9 />
          <Label10 />
          <Label11 />
          <Label12 />
          <Label13 />
          <Label14 />
          <Label15 />
          <Label16 />
          <Label17 />
          <Label18 />
          <Label19 />
          <Label20 />
          <Label21 />
          <Label22 />
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[305.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return <div className="bg-[#e5e7eb] h-[0.991px] shrink-0 w-full" data-name="Container" />;
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[351.978px] items-start relative shrink-0 w-full" data-name="Container">
      <Button14 />
      <Container49 />
      <Container50 />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[21px] relative shrink-0 w-[58.435px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[29.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-[0.67px] translate-x-[-50%]">Category</p>
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9913 15.9913">
        <g id="Icon">
          <path d={svgPaths.p2b29b140} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text34 />
          <Icon36 />
        </div>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[35.152px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Wood</p>
    </div>
  );
}

function Checkbox23() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label23() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text35 />
        <Checkbox23 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label23 />
          <Button16 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[65.387px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Wallpapers</p>
    </div>
  );
}

function Checkbox24() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label24() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text36 />
        <Checkbox24 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon38 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label24 />
          <Button17 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[20.387px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Tile</p>
    </div>
  );
}

function Checkbox25() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label25() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text37 />
        <Checkbox25 />
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon39 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label25 />
          <Button18 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[33.639px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Stone</p>
    </div>
  );
}

function Checkbox26() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label26() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text38 />
        <Checkbox26 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon40 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label26 />
          <Button19 />
        </div>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[84.613px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">{`Paints & Coats`}</p>
    </div>
  );
}

function Checkbox27() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label27() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text39 />
        <Checkbox27 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label27 />
          <Button20 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[31.578px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Glass</p>
    </div>
  );
}

function Checkbox28() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label28() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text40 />
        <Checkbox28 />
      </div>
    </div>
  );
}

function Icon42() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon42 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label28 />
          <Button21 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[56.909px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Hardware</p>
    </div>
  );
}

function Checkbox29() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label29() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text41 />
        <Checkbox29 />
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon43 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label29 />
          <Button22 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[32.204px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Metal</p>
    </div>
  );
}

function Checkbox30() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label30() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text42 />
        <Checkbox30 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon44 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label30 />
          <Button23 />
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[103.957px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Engineered Stone</p>
    </div>
  );
}

function Checkbox31() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label31() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text43 />
        <Checkbox31 />
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon45 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label31 />
          <Button24 />
        </div>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[36.157px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Fabric</p>
    </div>
  );
}

function Checkbox32() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label32() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text44 />
        <Checkbox32 />
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon46 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label32 />
          <Button25 />
        </div>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[121.004px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">Polymer Composites</p>
    </div>
  );
}

function Checkbox33() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label33() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text45 />
        <Checkbox33 />
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon47 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label33 />
          <Button26 />
        </div>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute h-[19.5px] left-[23.99px] top-0 w-[118.552px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] text-nowrap top-[-0.17px]">{`Partitions & Shutters`}</p>
    </div>
  );
}

function Checkbox34() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid left-0 rounded-[4px] size-[15.991px] top-[1.75px]" data-name="Checkbox" />;
}

function Label34() {
  return (
    <div className="basis-0 grow h-[19.5px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text46 />
        <Checkbox34 />
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon48 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[19.983px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label34 />
          <Button27 />
        </div>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute h-[39px] left-[23.66px] top-0 w-[168.665px]" data-name="Text">
      <p className="absolute font-['Satoshi',sans-serif] leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-[-0.17px] w-[127px]">Lignocellulose (Wood Others)</p>
    </div>
  );
}

function Checkbox35() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.835px] border-solid h-[15.991px] left-0 rounded-[4px] top-[11.5px] w-[15.665px]" data-name="Checkbox" />;
}

function Label35() {
  return (
    <div className="basis-0 grow h-[39px] min-h-px min-w-px relative shrink-0" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text47 />
        <Checkbox35 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="h-[15.991px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.32826 5.33044">
            <path d={svgPaths.p11f45900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33261" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="relative shrink-0 size-[19.983px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.996px] px-[1.996px] relative size-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.996px] items-center relative size-full">
          <Label35 />
          <Button28 />
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col gap-[7.996px] h-[374.739px] items-start relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
      <Container62 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[407.739px] items-start relative shrink-0 w-full" data-name="Container">
      <Button15 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[771.717px] items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container66 />
    </div>
  );
}

function FilterPanel() {
  return (
    <div className="absolute bg-white h-[647.165px] left-[32px] rounded-[10px] top-[513.99px] w-[279.991px]" data-name="FilterPanel">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-[0.835px] pl-[24.835px] pr-[34.852px] pt-[24.835px] relative rounded-[inherit] size-full">
        <Heading15 />
        <Container67 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.835px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export default function CategorySeacrhPage() {
  return (
    <div className="bg-[#faf8f5] relative size-full" data-name="category seacrh page">
      <App />
      <FilterPanel />
    </div>
  );
}