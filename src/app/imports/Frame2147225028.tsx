import svgPaths from "./svg-x0ilfuq2bi";
import imgImageWithFallback from "figma:asset/2ad24a38ef41ac1010ac4cabffe2fe33134e3d28.png";
import imgImageWithFallback1 from "figma:asset/9b92a90336df66a595a2f89dc885d13bc293b678.png";
import imgImageWithFallback2 from "figma:asset/832f1776fd879aca6b07255b5a5d2e483f71cba1.png";
import imgCeramicGlazedTile500X5001 from "figma:asset/5c2dc407809239f8827a26a241f9917db3e452b4.png";

function ImageWithFallback() {
  return (
    <div className="h-[92.401px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[10.044px] shrink-0 size-[96.418px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.009px] relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-[#ff7a59] border-[2.009px] border-solid inset-0 pointer-events-none rounded-[10.044px]" />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[92.401px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[10.044px] shrink-0 size-[96.418px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.009px] relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2.009px] border-solid inset-0 pointer-events-none rounded-[10.044px]" />
    </div>
  );
}

function ImageWithFallback2() {
  return <div className="h-[92.401px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Button2() {
  return (
    <div className="relative rounded-[10.044px] shrink-0 size-[96.418px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.009px] relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2.009px] border-solid inset-0 pointer-events-none rounded-[10.044px]" />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[92.401px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[10.044px] shrink-0 size-[96.418px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.009px] relative rounded-[inherit] size-full">
        <ImageWithFallback3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2.009px] border-solid inset-0 pointer-events-none rounded-[10.044px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12.052px] items-start justify-center relative shrink-0">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24.105px] items-start relative shrink-0">
      <Frame />
      <div className="relative shrink-0 size-[461px]" data-name="ceramic-glazed-tile-500x500 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCeramicGlazedTile500X5001} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full">
      <p className="css-4hzbpn relative shrink-0 text-[#101828] text-[36px] w-full">Glazed Ceramic Tile</p>
      <p className="css-4hzbpn relative shrink-0 text-[#6a7282] text-[18px] w-full">by Material Tiles Co.</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-px">Available Sizes</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-0 rounded-[10px] top-0 w-[114px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.48px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-11px)] translate-x-[-50%]">600×600 mm</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[121px] rounded-[10px] top-0 w-[115px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.48px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-11px)] translate-x-[-50%]">800×800 mm</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[244px] rounded-[10px] top-0 w-[118px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.48px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-11px)] translate-x-[-50%]">1200×600 mm</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-px">Color</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-0 rounded-[10px] top-0 w-[70.063px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[34.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">White</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[78.06px] rounded-[10px] top-0 w-[62.891px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[30.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Grey</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[148.95px] rounded-[10px] top-0 w-[68.75px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[33.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Beige</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[225.7px] rounded-[10px] top-0 w-[67.219px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[33px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Black</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Container2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-px">Finish</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-0 rounded-[10px] top-0 w-[68.656px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[33.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Matte</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[76.66px] rounded-[10px] top-0 w-[74.125px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[36.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Glossy</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute border border-[#e5e7eb] border-solid h-[38px] left-[158.78px] rounded-[10px] top-0 w-[64.094px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[31.5px] not-italic text-[#6a7282] text-[14px] text-center top-[9px] translate-x-[-50%]">Satin</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Container4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container1 />
      <Container3 />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-px">Product Description</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Satoshi',sans-serif] leading-[normal] left-[0.48px] not-italic text-[#6a7282] text-[14px] top-0 w-[362px]">Premium glazed ceramic tile with superior durability and aesthetic appeal. Perfect for both residential and commercial applications.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[105px] items-start relative shrink-0 w-[362px]" data-name="Container">
      <Heading1 />
      <Paragraph3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Container6 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[362px]">
      <Frame2 />
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex gap-[32px] items-start p-[24px] relative w-full">
        <Frame1 />
        <Frame4 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic p-[16px] relative w-full">
        <p className="css-4hzbpn relative shrink-0 text-[#6a7282] text-[12px] w-full">Package Option</p>
        <p className="css-4hzbpn relative shrink-0 text-[#101828] text-[16px] w-full">Box</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="css-ew64yg relative shrink-0 text-[#101828] text-[16px]">0.36</p>
      <p className="css-ew64yg relative shrink-0 text-[#6a7282] text-[14px]">m²</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic p-[16px] relative w-full">
        <p className="css-ew64yg relative shrink-0 text-[#6a7282] text-[12px]">Per Piece</p>
        <Frame9 />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic p-[16px] relative w-full">
        <p className="css-4hzbpn relative shrink-0 text-[#6a7282] text-[12px] w-full">Weight per Box</p>
        <p className="css-4hzbpn relative shrink-0 text-[#101828] text-[16px] w-full">18.5 kg</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame7 />
      <Frame10 />
      <Frame8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start not-italic p-[16px] relative w-full">
        <p className="css-4hzbpn leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] w-full">Pieces per Box</p>
        <p className="css-4hzbpn leading-[normal] relative shrink-0 text-[#101828] text-[16px] w-full">12 pieces</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="css-ew64yg relative shrink-0 text-[#ff7a59] text-[16px]">4.32</p>
      <p className="css-ew64yg relative shrink-0 text-[#6a7282] text-[14px]">m²</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic p-[16px] relative w-full">
        <p className="css-ew64yg relative shrink-0 text-[#6a7282] text-[12px]">Per Box (12 pieces)</p>
        <Frame21 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[4px] items-start leading-[normal] not-italic p-[16px] relative w-full">
        <p className="css-4hzbpn relative shrink-0 text-[#6a7282] text-[12px] w-full">Box Dimensions</p>
        <p className="css-4hzbpn relative shrink-0 text-[#101828] text-[16px] w-full">0.610×0.310×0.120 m</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame11 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <div className="flex flex-col font-['Satoshi',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[20px] w-full">
          <p className="css-4hzbpn leading-[normal]">{`Packaging & Coverage Details`}</p>
        </div>
        <Frame16 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] w-full">
      <p className="css-4hzbpn relative shrink-0 w-full">• Superior durability and long-lasting performance</p>
      <p className="css-4hzbpn relative shrink-0 w-full">• Low maintenance and easy to clean</p>
      <p className="css-4hzbpn relative shrink-0 w-full">• Suitable for high-traffic areas</p>
      <p className="css-4hzbpn relative shrink-0 w-full">• Environmentally friendly production process</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col font-['Satoshi',sans-serif] gap-[12px] items-start not-italic relative shrink-0 w-full">
      <p className="css-4hzbpn leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">Product Features</p>
      <Frame18 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-px">Dimensions</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Length</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-px">600 mm</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Width</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-px">600 mm</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[59.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Thickness</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-px">10 mm</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[36px] items-start justify-between pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col h-[110px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[150px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container10 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-px">Produced By</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Material Tiles Co.</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Satoshi',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#99a1af] text-[12px]">Manufactured in India • ISO Certified</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[88px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative">
      <Frame19 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Satoshi',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">
            <p className="css-ew64yg leading-[normal]">Scratch Resistant</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <p className="css-ew64yg font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">Stain Resistant</p>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[476px]">
      <Frame23 />
      <Frame27 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Satoshi',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">
            <p className="css-ew64yg leading-[normal]">Water Resistant</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <p className="css-ew64yg font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">Thermal Conduction</p>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame22 />
      <Frame26 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Satoshi',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">
            <p className="css-ew64yg leading-[normal]">UV Resistant</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <p className="css-ew64yg font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">Fire Rated</p>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[476px]">
      <Frame24 />
      <Frame28 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Satoshi',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">
            <p className="css-ew64yg leading-[normal]">Eco-Friendly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative w-full">
          <p className="css-ew64yg font-['Satoshi',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center">Easy Maintenance</p>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[476px]">
      <Frame25 />
      <Frame29 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px relative">
      <p className="css-ew64yg font-['Satoshi',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#101828] text-[18px]">Product Characteristics</p>
      <Frame33 />
      <Frame30 />
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame20 />
      <Frame34 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <p className="css-4hzbpn font-['Satoshi',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] w-full">Product Highlights</p>
        <Frame32 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-px">Technical Specifications</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[132.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[24px] left-[66.5px] not-italic text-[#101828] text-[16px] text-center top-px translate-x-[-50%]">Physical Properties</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-0 relative size-full">
          <Text6 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <Icon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[64.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Dimension</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[115.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[116px] not-italic text-[#101828] text-[14px] text-right top-px translate-x-[-100%]">600×600×10 mm</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Weight</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[64px] not-italic text-[#101828] text-[14px] text-right top-px translate-x-[-100%]">12.5 kg/m²</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[107.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Water Absorption</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[46.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[47px] not-italic text-[#101828] text-[14px] text-right top-px translate-x-[-100%]">{`< 0.5%`}</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Surface Finish</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[43px] not-italic text-[#101828] text-[14px] text-right top-px translate-x-[-100%]">Glazed</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[37px] items-start justify-between pb-px pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[59.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-px">Thickness</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[42px] not-italic text-[#101828] text-[14px] text-right top-px translate-x-[-100%]">10 mm</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[36px] items-start justify-between pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function ProductPage() {
  return (
    <div className="h-[216px] relative shrink-0 w-full" data-name="ProductPage">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-[24px] relative size-full">
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[217px] items-start pb-0 pt-px px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <ProductPage />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[275px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button14 />
          <Container18 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[155.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[24px] left-[78px] not-italic text-[#101828] text-[16px] text-center top-px translate-x-[-50%]">Mechanical Properties</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-0 relative size-full">
          <Text17 />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[58px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button15 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[146.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[24px] left-[73.5px] not-italic text-[#101828] text-[16px] text-center top-px translate-x-[-50%]">{`Certification & Safety`}</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-0 relative size-full">
          <Text18 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[58px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[171.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[24px] left-[86px] not-italic text-[#101828] text-[16px] text-center top-px translate-x-[-50%]">Additional Specifications</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-white h-[56px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-0 relative size-full">
          <Text19 />
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[58px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Button17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[485px] items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <Heading />
        <Container23 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-px">Applications</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#f9fafb] col-[1] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.08px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Residential flooring</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#f9fafb] col-[2] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.42px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Commercial spaces</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f9fafb] col-[3] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%-0.25px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Kitchen backsplash</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#f9fafb] col-[4] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%-0.42px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Bathroom walls</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#f9fafb] col-[5] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.42px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Living areas</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#f9fafb] col-[6] css-3foyfs relative rounded-[10px] row-[1] self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[calc(50%+0.25px)] not-italic text-[#6a7282] text-[14px] text-center top-[calc(50%-10px)] translate-x-[-50%]">Outdoor patios</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(6,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[46px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <Heading4 />
        <Container31 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[116.95px] size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333L14 2" id="Vector_2" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p25f66900} id="Vector_3" stroke="var(--stroke-0, #FF7A59)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[132.953px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Satoshi',sans-serif] leading-[20px] left-[56.5px] not-italic text-[#ff7a59] text-[14px] text-center top-px translate-x-[-50%]">View Brand Profile</p>
      <Icon4 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="css-4hzbpn font-['Satoshi',sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[#101828] text-[20px] w-[min-content]">Material Tiles Co.</p>
      <p className="css-4hzbpn font-['Satoshi',sans-serif] leading-[22.75px] min-w-full not-italic relative shrink-0 text-[#6a7282] text-[14px] w-[min-content]">Leading manufacturer of premium ceramic tiles with over 25 years of experience. We combine traditional craftsmanship with modern technology to create exceptional surfaces for contemporary spaces.</p>
      <Button18 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <p className="css-4hzbpn font-['Satoshi',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] w-full">About the Brand</p>
        <Frame37 />
      </div>
    </div>
  );
}

export default function Frame39() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[32px] items-center relative rounded-[16px] size-full">
      <Frame6 />
      <Frame17 />
      <Frame31 />
      <Container24 />
      <Container32 />
      <Frame38 />
    </div>
  );
}