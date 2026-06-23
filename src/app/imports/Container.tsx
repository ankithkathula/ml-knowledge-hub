function Paragraph() {
  return (
    <div className="absolute h-[16px] left-[48px] top-[40px] w-[608px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#ff7a59] text-[12px] text-nowrap top-[0.5px] tracking-[0.6px] whitespace-pre">BRAND SIGN UP</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[17.5px] items-start left-[8px] top-[4px] w-[48.664px]" data-name="Text">
      <p className="font-['Satoshi',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center text-nowrap whitespace-pre">Sign Up</p>
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
    <div className="absolute border-[0px_0px_1px] border-gray-200 border-solid h-[38px] left-[48px] top-[80px] w-[608px]" data-name="Container">
      <Button />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[608px]" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] tracking-[0.3px] whitespace-pre">BRAND INFORMATION</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[16px] relative shrink-0 w-[608px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[608px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Brand Name</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[608px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[608px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">Enter brand name</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
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
    <div className="h-[16px] relative shrink-0 w-[296px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[296px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Location</p>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[296px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[296px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">City, State</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[296px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Website</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[10px] top-[22px] w-[296px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[44px] items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[296px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">www.domainname.com</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="[grid-area:1_/_2] h-[66px] relative shrink-0 w-[296px]" data-name="Container">
      <Label2 />
      <TextInput2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[66px] left-0 top-[82px] w-[608px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[16px] left-0 top-[160px] w-[608px]" data-name="Label">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">About</p>
    </div>
  );
}

function EmailInput() {
  return <div className="absolute bg-white border border-gray-200 border-solid h-[80px] left-0 rounded-[10px] top-[182px] w-[608px]" data-name="Email Input" />;
}

function Container6() {
  return (
    <div className="absolute h-[230px] left-0 top-[32px] w-[608px]" data-name="Container">
      <Container2 />
      <Container5 />
      <Label3 />
      <EmailInput />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[270px] left-0 top-0 w-[608px]" data-name="Container">
      <Heading />
      <Container6 />
    </div>
  );
}

function Container8() {
  return <div className="absolute h-[66px] left-0 top-[280px] w-[608px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] tracking-[0.3px] whitespace-pre">CATEGORY</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[608px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[608px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Choose Your Category</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[94.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[94.781px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-px whitespace-pre">Select category</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[608px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between px-[17px] py-px relative w-[608px]">
        <Text1 />
        <Icon />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Button1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[98px] items-start left-0 top-[313px] w-[608px]" data-name="Container">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] tracking-[0.3px] whitespace-pre">LOCATIONS SERVED</p>
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[608px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[608px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Choose Your Location</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[94.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[94.781px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-px whitespace-pre">Select Location</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[608px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-between px-[17px] py-px relative w-[608px]">
        <Text2 />
        <Icon1 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Button2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[98px] items-start left-0 top-[496px] w-[608px]" data-name="Container">
      <Heading2 />
      <Container11 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-0 rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[766px] w-[608px]" data-name="Button">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[304.21px] not-italic text-[14px] text-center text-nowrap text-white top-[15px] translate-x-[-50%] whitespace-pre">Create Account</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[431px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-0 rounded-[5px] top-[431px] w-[188px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[5px] not-italic text-[14px] text-white top-[436px] w-[172px]">Category - Sub Category</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[196px] top-[431px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-[196px] rounded-[5px] top-[431px] w-[188px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[201px] not-italic text-[14px] text-white top-[436px] w-[172px]">Category - Sub Category</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[392px] top-[431px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-[392px] rounded-[5px] top-[431px] w-[188px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[397px] not-italic text-[14px] text-white top-[436px] w-[172px]">Category - Sub Category</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[54.18%_70.07%_44.59%_28.29%]">
      <div className="absolute inset-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Group 223">
            <path d="M11 1L1 11" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M1 1L11 11" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[54.18%_70.07%_44.59%_28.29%]">
      <Group3 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-0 top-[431px]">
      <Group />
      <Group1 />
      <Group2 />
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-[604px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-0 rounded-[5px] top-[604px] w-[96px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[6px] not-italic text-[14px] text-white top-[609px] w-[87.83px]">Location 1</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[75.43%_85.86%_23.34%_12.5%]">
      <div className="absolute inset-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Group 223">
            <path d="M11 1L1 11" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M1 1L11 11" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[75.43%_85.86%_23.34%_12.5%]">
      <Group6 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-0 top-[604px]">
      <Group5 />
      <Group7 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[105px] top-[604px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-[105px] rounded-[5px] top-[604px] w-[96px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[113px] not-italic text-[14px] text-white top-[609px] w-[87.83px]">Location 2</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[75.43%_68.59%_23.34%_29.77%]">
      <div className="absolute inset-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Group 223">
            <path d="M11 1L1 11" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M1 1L11 11" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[75.43%_68.59%_23.34%_29.77%]">
      <Group9 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-[105px] top-[604px]">
      <Group8 />
      <Group10 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[210px] top-[604px]">
      <div className="absolute bg-[#ff7a59] h-[30px] left-[210px] rounded-[5px] top-[604px] w-[96px]" />
      <p className="absolute font-['Satoshi',sans-serif] leading-[normal] left-[216px] not-italic text-[14px] text-white top-[609px] w-[87.83px]">Location 3</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[75.43%_51.32%_23.34%_47.04%]">
      <div className="absolute inset-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Group 223">
            <path d="M11 1L1 11" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M1 1L11 11" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[75.43%_51.32%_23.34%_47.04%]">
      <Group12 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[210px] top-[604px]">
      <Group11 />
      <Group13 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-0 top-[604px]">
      <Group16 />
      <Group17 />
      <Group18 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[814px] left-[48px] top-[142px] w-[608px]" data-name="Form">
      <Container7 />
      <Container8 />
      <Container10 />
      <Container12 />
      <Button3 />
      <Group14 />
      <Group15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[900px] left-0 overflow-clip top-[-1px] w-[704px]" data-name="Container">
      <Paragraph />
      <Container1 />
      <Form />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] tracking-[0.3px] whitespace-pre">CONTACT PERSON DETAILS</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[568px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[568px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Full Name</p>
      </div>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[568px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[568px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">John Doe</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <TextInput3 />
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[276px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[276px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Phone Number</p>
      </div>
    </div>
  );
}

function PhoneInput() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[276px]" data-name="Phone Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[276px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">+91 00000 00000</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Label7 />
      <PhoneInput />
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[276px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[276px]">
        <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-[0.5px] whitespace-pre">Email Address</p>
      </div>
    </div>
  );
}

function EmailInput1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[276px]" data-name="Email Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit] w-[276px]">
        <p className="font-['Satoshi',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-nowrap whitespace-pre">john@example.com</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[6px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Label8 />
      <EmailInput1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[66px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[16px] h-[220px] items-start left-[40px] pb-0 pt-[20px] px-[20px] rounded-[14px] top-[801px] w-[608px]" data-name="Container">
      <Heading3 />
      <Container14 />
      <Container17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents left-[53px] top-[1087px]">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-[72px] not-italic text-[#364153] text-[12px] text-nowrap top-[1087px] tracking-[0.3px] whitespace-pre">Lead Generation</p>
      <div className="absolute left-[53px] size-[14px] top-[1088px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <circle cx="7" cy="7" id="Ellipse 1" r="6.5" stroke="var(--stroke-0, #99A1AF)" />
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[196px] top-[1087px]">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-[215px] not-italic text-[#364153] text-[12px] text-nowrap top-[1087px] tracking-[0.3px] whitespace-pre">Branding</p>
      <div className="absolute left-[196px] size-[14px] top-[1088px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <circle cx="7" cy="7" id="Ellipse 1" r="6.5" stroke="var(--stroke-0, #99A1AF)" />
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[295px] top-[1087px]">
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-[314px] not-italic text-[#364153] text-[12px] text-nowrap top-[1087px] tracking-[0.3px] whitespace-pre">Marketing</p>
      <div className="absolute left-[295px] size-[14px] top-[1088px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <circle cx="7" cy="7" id="Ellipse 1" r="6.5" stroke="var(--stroke-0, #99A1AF)" />
        </svg>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#ff7a59] h-[48px] left-[53px] rounded-[10px] top-[1141px] w-[603px]" data-name="Button">
      <p className="absolute font-['Satoshi',sans-serif] leading-[20px] left-[301.5px] not-italic text-[14px] text-center text-nowrap text-white top-[15px] translate-x-[-50%] whitespace-pre">Submit</p>
    </div>
  );
}

export default function Container19() {
  return (
    <div className="bg-white relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] size-full" data-name="Container">
      <Container13 />
      <Container18 />
      <p className="absolute font-['Satoshi',sans-serif] leading-[16px] left-[53px] not-italic text-[#364153] text-[24px] text-nowrap top-[1049px] tracking-[0.3px] whitespace-pre">How do you like to engage with us?</p>
      <Group19 />
      <Group20 />
      <Group21 />
      <Button4 />
    </div>
  );
}