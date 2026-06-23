Create a clean, minimal left filter panel for a construction materials product platform (Material Library style). The layout should be modern, SaaS-like, and highly usable with clear hierarchy.

STRUCTURE:

* Vertical sidebar (fixed width ~280px)
* Section title: "CATEGORIES"
* Search input at top: "Search categories..."
* Category list below

CORE INTERACTION:
When a user clicks a category:

1. Move the selected category to the top of the list
2. Expand its subcategories directly below it
3. Collapse all other category trees
4. Maintain a single active branch only
5. Update state visually (active styling)

DO NOT:

* Do NOT create a separate active category block
* Do NOT add back button UI
* Do NOT use cards or heavy containers
* Keep everything within one continuous list

VISUAL DESIGN:

* Background: white or very light neutral
* Typography: Satoshi (Regular / Medium)
* Category text: 14–15px
* Subcategory text: 13–14px

ACTIVE CATEGORY STYLE:

* Subtle background tint (very light orange or grey)
* Left border: 2px solid #FF6A3D
* Slightly bolder text (medium weight)
* Smooth transition when moving to top

SUBCATEGORY STYLE:

* Indented (12–16px left padding)
* Slightly darker than inactive categories
* No borders or heavy backgrounds

INACTIVE CATEGORIES:

* Neutral text color (grey-700 or similar)
* No background
* Slightly lower visual priority

DIVIDER:

* Add a subtle divider between active section and remaining categories
* Very light grey line (#EAEAEA or similar)

ANIMATION:

* Smooth reorder animation when category moves to top (150–200ms ease)
* Expand/collapse animation for subcategories

DATA EXAMPLE:
Categories:

* Building Materials

  * Cement
  * Steel
* Flooring
* Wall Finishes (selected)

  * Interior Paint
  * Exterior Paint
  * Wallpapers
* Lighting
* Sanitary

AFTER INTERACTION:
Wall Finishes moves to top and expands:
Wall Finishes (active)
Interior Paint
Exterior Paint
Wallpapers
----------

Building Materials
Flooring
Lighting
Sanitary

UX NOTES:

* Only one category tree expanded at a time
* Clicking another category repeats same behavior
* Left panel acts as primary navigation
* Breadcrumb on right side handles back navigation

STYLE DIRECTION:

* Clean, minimal, professional
* No visual clutter
* Strong hierarchy using spacing, not heavy UI
* Consistent with modern B2B SaaS dashboards

OUTPUT:
Create components for:

* Category item (default, hover, active)
* Subcategory item
* Expanded state
* Animated transition states
