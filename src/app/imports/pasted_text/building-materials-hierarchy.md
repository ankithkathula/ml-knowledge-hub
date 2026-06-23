1. Left Filter Panel Structure (Hierarchy)

The left panel should expand progressively like this:

BUILDING MATERIALS
   Cement
       Portland Cement
           OPC 53
           OPC 43
           PPC
       White Cement
       Ready Mix Concrete
       Fly Ash Cement

   Steel
       TMT Bars
       Structural Steel
       Steel Plates

   Blocks & Bricks
       Clay Bricks
       Fly Ash Bricks
       AAC Blocks

   Construction Chemicals
       Waterproofing
       Tile Adhesives
       Grouts

Hierarchy logic:

Main Category
   → Sub Category
      → Sub Sub Category
         → Sub Sub Sub Category
             → Products

Products only appear at the last level.

2. Example With Realistic Test Data
BUILDING MATERIALS
Building Materials
   Cement
      Portland Cement
         OPC 53
            UltraTech OPC 53
            ACC OPC 53
            Ambuja OPC 53
            JK Cement OPC 53
         OPC 43
            UltraTech OPC 43
            Shree Cement OPC 43
         PPC Cement
            UltraTech PPC
            Ambuja PPC
      White Cement
         Birla White Cement
         JK White Cement
      Ready Mix Concrete
         UltraTech RMC
         ACC Ready Mix
STEEL
Steel
   TMT Bars
      Fe500
         Tata Tiscon Fe500
         JSW Neosteel Fe500
      Fe550
         Tata Tiscon Fe550
         JSW Neosteel Fe550

   Structural Steel
      H Beams
      I Beams
      Channels
      Angles

   Steel Plates
      Mild Steel Plates
      Stainless Steel Plates
BLOCKS & BRICKS
Blocks & Bricks
   Clay Bricks
   Fly Ash Bricks
   Concrete Blocks
   AAC Blocks
CONSTRUCTION CHEMICALS
Construction Chemicals
   Waterproofing
      Liquid Membrane
      Bituminous Coating
      Cementitious Waterproofing

   Tile Adhesives
      Standard Adhesive
      High Bond Adhesive
      Flexible Adhesive

   Grouts
      Epoxy Grout
      Cement Grout
3. Left Panel UX Behavior

When user clicks Cement:

Cement
   Portland Cement
   White Cement
   Ready Mix Concrete

When user clicks Portland Cement:

Portland Cement
   OPC 53
   OPC 43
   PPC

When user clicks OPC 53:

OPC 53
   UltraTech OPC 53
   ACC OPC 53
   Ambuja OPC 53

So the panel behaves like a progressive drill-down tree.

4. Right Side Content Logic

Right side should always show two types of cards:

1️⃣ Subcategory cards
2️⃣ Product cards

Example:

User clicks Cement

Right side shows:

Portland Cement
White Cement
Ready Mix Concrete
Fly Ash Cement

(Subcategory cards)

User clicks Portland Cement

Right side shows:

OPC 53
OPC 43
PPC Cement
User clicks OPC 53

Now show products grouped by brand.

UltraTech Cement
   Cement Series
      UltraTech OPC 53 Cement
      UltraTech OPC 53 Premium

ACC Cement
   ACC Gold Series
      ACC OPC 53 Cement
      ACC Super OPC 53

Ambuja Cement
   Ambuja Plus Series
      Ambuja OPC 53 Cement

Hierarchy:

Brand
   → Product Family
       → Products
5. Product Card Example
UltraTech OPC 53 Cement

Brand: UltraTech
Category: Portland Cement
Grade: OPC 53
Compressive Strength: 53 MPa
Packaging: 50 kg bags

Tags:
Cement
OPC 53
High Strength
Structural Grade
6. Product Family Example
UltraTech Cement Series
Professional-grade cement products

Products:
• UltraTech OPC 53 Cement
• UltraTech OPC 53 Premium
7. Example Full Right Side Layout
ULTRATECH CEMENT

Cement Series
   UltraTech OPC 53 Cement
   UltraTech OPC 53 Premium

ACC CEMENT

ACC Gold Series
   ACC OPC 53 Cement
   ACC Super OPC 53

AMBUJA CEMENT

Ambuja Plus Series
   Ambuja OPC 53 Cement
   Ambuja OPC 53 Plus
8. Realistic Product Attributes (Test Data)

Each product should include realistic fields:

Brand
Product Family
Product Name
Category
Sub Category
Grade
Material Type
Application
Compressive Strength
Density
Color
Finish
Packaging
Certifications
Price Range
Availability

Example:

UltraTech OPC 53 Cement

Brand: UltraTech Cement
Product Family: Cement Series
Category: Building Materials
Sub Category: Cement
Type: Portland Cement
Grade: OPC 53
Application: Structural Concrete
Strength: 53 MPa
Packaging: 50 kg bag
Certifications: IS 12269
9. UI Tip (Important)

Your current page will feel empty quickly.

Add counts:

Portland Cement
3 Subcategories • 12 Products

White Cement
1 Brand • 3 Products
10. Final System Flow
Left Panel (Hierarchy)
Category → Subcategory → Sub Subcategory → Products

Right Panel (Content)
Subcategory Cards
+
Products grouped by
Brand → Product Family → Products