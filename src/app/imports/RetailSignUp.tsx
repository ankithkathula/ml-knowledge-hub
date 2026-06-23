function Paragraph() {
  return (
    <div className="absolute h-[16px] left-[48px] top-[39px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#ff7a59] text-[12px] text-nowrap top-[0.5px] tracking-[0.6px]">RETAIL CUSTOMER SIGN UP</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[17.5px] items-start left-[8px] top-[4px] w-[48.664px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap">Sign Up</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-[#ff7a59] h-[2px] left-0 top-[35px] w-[64.664px]" data-name="Container" />;
}

function Button() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[64.664px]" data-name="Button">
      <Text />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid h-[38px] left-[48px] top-[79px] w-[608px]" data-name="Container">
      <Button />
    </div>
  );
}

function Heading() {
  return <div className="absolute h-[16px] left-0 top-0 w-[608px]" data-name="Heading 3" />;
}

function Label() {
  return (
    <div className="h-[16px] relative shrink-0 w-[608px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Full Name</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[608px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">Enter full name</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[66px] items-start left-0 top-0 w-[608px]" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[608px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Postal Code</p>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] py-[10px] relative size-full">
          <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">123456</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[66px] items-start left-[312px] top-[164px] w-[296px]" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[296px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Email</p>
      </div>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[296px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">email</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Label2 />
      <TextInput2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[296px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Phone Number*</p>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[10px] top-[22px] w-[296px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">+91 000000000</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="[grid-area:1_/_2] h-[66px] relative shrink-0 w-[296px]" data-name="Container">
      <Label3 />
      <TextInput3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[66px] left-0 top-[82px] w-[608px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[296px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Location</p>
      </div>
    </div>
  );
}

function TextInput4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[296px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">City, State</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[66px] items-start left-0 top-[164px] w-[296px]" data-name="Container">
      <Label4 />
      <TextInput4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[230px] left-0 top-[32px] w-[608px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[270px] left-[48px] top-[141px] w-[608px]" data-name="Container">
      <Heading />
      <Container8 />
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[296px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Create Password</p>
      </div>
    </div>
  );
}

function TextInput5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[296px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">Password min 8 characters</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Label5 />
      <TextInput5 />
    </div>
  );
}

function Label6() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[296px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px]">Confirm Password</p>
    </div>
  );
}

function TextInput6() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[10px] top-[22px] w-[296px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">password</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_2] h-[66px] relative shrink-0 w-[296px]" data-name="Container">
      <Label6 />
      <TextInput6 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[66px] left-[48px] top-[419px] w-[608px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-[53px] rounded-[10px] top-[509px] w-[603px]" data-name="Button">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[301px] not-italic text-[14px] text-center text-nowrap text-white top-[15px] translate-x-[-50%]">Sign Up</p>
    </div>
  );
}

export default function RetailSignUp() {
  return (
    <div className="bg-white relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] size-full" data-name="Retail Sign up">
      <Paragraph />
      <Container1 />
      <Container9 />
      <Container12 />
      <Button1 />
    </div>
  );
}