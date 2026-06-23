import svgPaths from "./svg-vpu07amuqv";
import imgImageModernArchitecture from "figma:asset/6344822aa737b77519536de928132bd8c7576482.png";
import imgImageMaterialLibrary from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";

function Icon() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3aa35f80} id="Vector" stroke="var(--stroke-0, #101828)" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[24px] left-[4px] top-0 w-[62.828px]" data-name="Text">
      <Icon />
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[43.5px] not-italic text-[#101828] text-[16px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Login</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[70.828px]" data-name="Button">
      <Text />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1007de00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Text">
      <Icon1 />
      <p className="absolute font-['Satoshi',sans-serif] leading-[24px] left-[52px] not-italic text-[#99a1af] text-[16px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Sign Up</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[36px] items-start left-[94.83px] px-[4px] py-0 top-0 w-[87.625px]" data-name="Button">
      <Text1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[37px] left-[47.5px] top-[183px] w-[364.797px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-[#ff7a59] h-[2px] left-[151px] top-[217px] w-[70.828px]" data-name="Container" />;
}

function Label() {
  return (
    <div className="absolute h-[20px] left-[48px] top-[317px] w-[168px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Email address</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="absolute bg-white h-[46px] left-[48px] rounded-[10px] top-[345px] w-[168px]" data-name="Email Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-[168px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Brand Name</p>
    </div>
  );
}

function EmailInput1() {
  return (
    <div className="bg-white h-[46px] relative rounded-[10px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[46px] items-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[47px] top-[237px] w-[168px]" data-name="Container">
      <Label1 />
      <EmailInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[20px] left-[223px] top-[237px] w-[60px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Location</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[20px] left-[322px] top-[237px] w-[60px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Pin Code</p>
    </div>
  );
}

function EmailInput2() {
  return (
    <div className="absolute bg-white h-[46px] left-[223px] rounded-[10px] top-[265px] w-[91px]" data-name="Email Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-[91px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function EmailInput3() {
  return (
    <div className="absolute bg-white h-[46px] left-[322px] rounded-[10px] top-[265px] w-[90px]" data-name="Email Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-[90px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Contact Person name</p>
    </div>
  );
}

function EmailInput4() {
  return (
    <div className="bg-white h-[46px] relative rounded-[10px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[46px] items-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[52px] top-[425px] w-[168px]" data-name="Container">
      <Label4 />
      <EmailInput4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-[5px] whitespace-pre">Phone Number</p>
    </div>
  );
}

function EmailInput5() {
  return (
    <div className="bg-white h-[46px] relative rounded-[10px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[46px] items-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[228px] top-[425px] w-[169px]" data-name="Container">
      <Label5 />
      <EmailInput5 />
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Email address</p>
    </div>
  );
}

function EmailInput6() {
  return (
    <div className="bg-white h-[46px] relative rounded-[10px] shrink-0 w-[345px]" data-name="Email Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-[345px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your email address</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[54px] top-[511px] w-[168px]" data-name="Container">
      <Label6 />
      <EmailInput6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="absolute h-[20px] left-[54px] top-[597px] w-[168px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Choose Category</p>
    </div>
  );
}

function EmailInput7() {
  return (
    <div className="absolute bg-white h-[46px] left-[54px] rounded-[10px] top-[625px] w-[168px]" data-name="Email Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] w-[168px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Main category</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-0 rounded-[10px] top-0 w-[364.797px]" data-name="Button">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[182.73px] not-italic text-[14px] text-center text-nowrap text-white top-[15px] translate-x-[-50%] whitespace-pre">Sign up</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[48px] left-[48px] top-[759px] w-[365px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[952px] left-0 top-[-47px] w-[460px]" data-name="Container">
      <Container />
      <Container1 />
      <Label />
      <EmailInput />
      <Container2 />
      <Label2 />
      <Label3 />
      <EmailInput2 />
      <EmailInput3 />
      <div className="absolute bg-neutral-200 h-[179px] left-[40px] top-[414px] w-[378px]" />
      <Container3 />
      <Container4 />
      <Container5 />
      <Label7 />
      <EmailInput7 />
      <Container6 />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[54px] not-italic text-[#ff7a59] text-[14px] text-nowrap top-[124px] whitespace-pre">BRAND</p>
    </div>
  );
}

function ImageModernArchitecture() {
  return (
    <div className="absolute h-[1036.14px] left-[0.3px] top-[-84px] w-[691.188px]" data-name="Image (Modern Architecture)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageModernArchitecture} />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.8)] h-[1036.14px] left-[0.3px] to-[rgba(0,0,0,0)] top-[-84px] via-50% via-[rgba(0,0,0,0.4)] w-[691.188px]" data-name="Container" />;
}

function SignIn() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="SignIn">
      <p className="absolute font-['Satoshi',sans-serif] italic leading-[29.25px] left-0 text-[18px] text-white top-0 w-[590px]">{`"The best platform for discovering new materials and connecting with industry professionals. It's become an essential tool for our design process."`}</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-0 whitespace-pre">Michael Torres</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-px whitespace-pre">Interior Designer</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Satoshi',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#99a1af] text-[12px]">Urban Spaces Inc</p>
    </div>
  );
}

function SignIn1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[68px] items-start relative shrink-0 w-full" data-name="SignIn">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[150.5px] items-start left-[40px] top-[40px] w-[611.188px]" data-name="Container">
      <SignIn />
      <SignIn1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p33f6b680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15.8333 10H4.16667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-start left-[40px] top-[222.5px] w-[611.188px]" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] relative rounded-[3.35544e+07px] shrink-0 size-[6px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6px]" />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[6px] relative rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6px] w-[32px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[6px] items-start left-[40px] top-[294.5px] w-[611.188px]" data-name="Container">
      <Button5 />
      <Button6 />
      <Button5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[332.5px] left-[0.3px] top-[532px] w-[691.188px]" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[952px] left-[460px] overflow-clip top-[-47px] w-[691px]" data-name="Container">
      <ImageModernArchitecture />
      <Container8 />
      <Container12 />
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.422px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[58.422px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Create Password</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label8 />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute bg-white h-[46px] left-0 rounded-[10px] top-[-0.07px] w-[164px]" data-name="Password Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip pl-[16px] pr-[48px] py-[12px] relative rounded-[inherit] w-[164px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your password</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Button7() {
  return <div className="absolute left-[328.8px] size-[20px] top-[13px]" data-name="Button" />;
}

function Container15() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Button7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[48px] top-[626px] w-[182px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Label9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.422px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[58.422px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-px whitespace-pre">Confirm Password</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label9 />
    </div>
  );
}

function PasswordInput1() {
  return (
    <div className="absolute bg-white h-[46px] left-0 rounded-[10px] top-0 w-[170px]" data-name="Password Input">
      <div className="box-border content-stretch flex h-[46px] items-center overflow-clip pl-[16px] pr-[48px] py-[12px] relative rounded-[inherit] w-[170px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter your password</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Button8() {
  return <div className="absolute left-[328.8px] size-[20px] top-[13px]" data-name="Button" />;
}

function Container18() {
  return (
    <div className="h-[46px] relative shrink-0 w-[223px]" data-name="Container">
      <PasswordInput1 />
      <Button8 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[241px] top-[626px] w-[364.797px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[774px] relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[1152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[774px] overflow-clip relative rounded-[inherit] w-[1152px]">
        <Container7 />
        <Container13 />
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function SignIn2() {
  return (
    <div className="bg-gray-50 content-stretch flex h-[1100.14px] items-center justify-center relative shrink-0 w-full" data-name="SignIn">
      <Container20 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1100.14px] items-start left-0 overflow-clip top-0 w-[1903px]" data-name="App">
      <SignIn2 />
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

function Icon4() {
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

function TextInput() {
  return (
    <div className="basis-0 grow h-[20.969px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20.969px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6a7282] text-[14.7px] text-nowrap whitespace-pre">Pincode</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-gray-100 h-[36.969px] relative rounded-[10px] shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36.969px] items-center px-[12px] py-0 relative w-[128px]">
        <Icon4 />
        <TextInput />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[21px] opacity-70 relative shrink-0 w-[120.141px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[120.141px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#9747ff] text-[14.7px] text-nowrap top-px whitespace-pre">Knowledge Center</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[36.969px] items-center left-0 top-[0.02px] w-[768px]" data-name="Container">
      <ImageMaterialLibrary />
      <Container21 />
      <Link />
    </div>
  );
}

function Icon5() {
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

function Button9() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[499.69px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[32px] top-[2.5px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-[#d1d5dc] h-[20px] left-[543.69px] top-[8.5px] w-px" data-name="Container" />;
}

function Button10() {
  return (
    <div className="absolute box-border content-stretch flex h-[21px] items-start left-[556.69px] px-[12px] py-0 top-[8px] w-[68.203px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14.7px] text-center text-nowrap whitespace-pre">Sign In</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#ff7a59] box-border content-stretch flex h-[37px] items-start left-[636.89px] px-[16px] py-[8px] rounded-[10px] top-0 w-[83.109px]" data-name="Button">
      <p className="font-['Satoshi',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14.7px] text-center text-nowrap text-white whitespace-pre">Sign Up</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_4345_232)" id="Icon">
          <path d={svgPaths.p32514c00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2734ea00} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35b01b80} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_4345_232">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#ff7a59] content-stretch flex items-center justify-center left-[24px] rounded-[3.35544e+07px] size-[16px] top-[-4px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[12.6px] text-center text-nowrap text-white whitespace-pre">0</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute left-[732px] rounded-[10px] size-[36px] top-[0.5px]" data-name="Button">
      <Icon6 />
      <Text2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[37px] left-[768px] top-0 w-[768px]" data-name="Container">
      <Button9 />
      <Container23 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[21px] relative shrink-0 w-[47.688px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[47.688px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[24.5px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Brands</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#d1d5dc] h-[20px] relative shrink-0 w-px" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] w-px" />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[61.094px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[61.094px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[31px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Products</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[57.5px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[57.5px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-0 not-italic text-[#364153] text-[14.7px] text-nowrap top-px whitespace-pre">Services</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[45.5px] not-italic text-[#364153] text-[14.7px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">Professionals</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[21px] items-center left-[566.44px] top-[8px] w-[403.125px]" data-name="Navigation">
      <Button13 />
      <Container25 />
      <Button14 />
      <Container25 />
      <Link1 />
      <Container25 />
      <Button15 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Navigation />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[66px] items-start pb-px pt-[14px] px-[183.5px] relative w-full">
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
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

function Button16() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[88.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[88.656px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36.5px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Flooring</p>
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
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

function Button17() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[87.578px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Lighting</p>
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
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

function Button18() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[87.859px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[87.859px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[36px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Sanitary</p>
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
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

function Button19() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[154.109px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[154.109px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[69.5px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">{`Doors & Windows`}</p>
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
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

function Button20() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[120.281px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[120.281px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[52px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Wall Finishes</p>
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
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

function Button21() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[84.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[84.078px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[34.5px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Kitchen</p>
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
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

function Button22() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[98.734px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[98.734px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[41.5px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Hardware</p>
        <Icon13 />
      </div>
    </div>
  );
}

function Icon14() {
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

function Button23() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[72.281px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[72.281px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[28px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">HVAC</p>
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
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

function Button24() {
  return (
    <div className="h-[33px] relative rounded-[8px] shrink-0 w-[94.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[33px] relative w-[94.938px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[39.5px] not-italic text-[14.7px] text-center text-gray-200 text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Electrical</p>
        <Icon15 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="basis-0 grow h-[33px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[33px] items-center justify-center relative w-full">
        <Button16 />
        <Button17 />
        <Button18 />
        <Button19 />
        <Button20 />
        <Button21 />
        <Button22 />
        <Button23 />
        <Button24 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[92.516px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[92.516px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[21px] left-[12px] not-italic text-[14.7px] text-gray-200 text-nowrap top-px whitespace-pre">View All →</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[49px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Link2 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#2d2d2d] h-[50px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#364153] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[50px] items-start pb-0 pt-px px-[183.5px] relative w-full">
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] box-border content-stretch flex flex-col h-[117px] items-start left-0 pb-px pt-0 px-0 top-0 w-[1903px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Header />
      <Header1 />
    </div>
  );
}

export default function MaterialLibraryDesign() {
  return (
    <div className="bg-white relative size-full" data-name="MATERIAL LIBRARY design 8">
      <App />
      <Header2 />
    </div>
  );
}