1. Portfolio Section Structure
Level 1 — Portfolio Section

This is the section on the brand microsite.

Example:

PORTFOLIO
62 PROJECTS

Then category cards:

Commercial
Residential
Infrastructure
Industrial

Each category opens projects inside it.

2. Portfolio Category (Level 2)

Fields for category:

Portfolio Category Name
Cover Image
Project Count
Status (Active / Inactive)

Example:

Commercial
18 Projects
3. Portfolio Project (Level 3)

Each project should contain the information you listed.

Updated Project Data Structure:

Basic Information
Project Title
Portfolio Category (Commercial / Residential / etc)
Portfolio Name
Project Category (Laminates / Tiles / Wood / etc)
Service Type
Short Description
Full Description
Project Details
Client Name
City
Country
Completion Year
Project Duration
Project Area
Team Size
Media
Background Image (Hero Image)
Gallery Images (multiple)
Video (optional)
Status
Active / Inactive

Inactive projects remain hidden on the portal.

4. How the UI Should Display
Portfolio Landing (what you showed)

Cards show:

Category Image
COMMERCIAL
18 Projects
Category Page

Example: Commercial

Project cards:

Project Image
Project Title
City, Country
Completion Year

Optional tags:

Tiles
Laminates
Facade
Project Page

Example layout:

Hero Image

Project Title
City, Country
Completion Year
Client

Short Description

Gallery Grid

Project Details
• Category
• Service Type
• Duration
• Area
• Team Size
5. Recommended Extra Fields (Important)

For future scalability add:

Project Tags
Architect / Studio
Material Used (linked to products)
Featured Project (toggle)
Display Order

Especially Material Used, because this allows:

Portfolio → Product linking

Example:

Project: Mumbai Airport Terminal
Material Used: UltraTech Cement OPC 53

This is very powerful for the Material Library ecosystem.

6. Admin Panel Structure

For the Brand Dashboard:

Portfolio
   → Categories
   → Projects

Project form:

Basic Info
Location
Project Details
Media
Status
7. Updated Data Model (Clean Version)
Portfolio Project

Title
Portfolio Name
Portfolio Category
Project Category
Service Type
Short Description
Full Description

Client
City
Country
Completion Year
Duration
Area
Team Size

Background Image
Gallery Images

Active / Inactive
8. One Important UX Improvement

Your category cards are good, but add hover interaction:

Hover should show:

COMMERCIAL
18 Projects
View Projects →

Small detail but improves usability.