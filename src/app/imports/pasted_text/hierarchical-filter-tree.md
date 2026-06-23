The Categories section should behave like a hierarchical filter tree.

Instead of static category lists, the filter should expand progressively based on user selection.

1. Default State

Initially show top-level categories only.

Example:

Building Materials
Flooring
Wall Finishes
Lighting
Sanitary
Hardware
Electrical

Each category should have an expand arrow.

▶ Flooring
▶ Wall Finishes
2. When a Category is Selected

If the user clicks Flooring, the filter should:

Expand the category

Show its subcategories

Update the product grid

Show all products under that category

Example:

▼ Flooring
    Tiles
    Marble
    Granite
    Wood Flooring

Product grid shows:

All products under Flooring
3. When a Subcategory is Selected

If the user clicks Tiles, the filter expands again.

▼ Flooring
    ▼ Tiles
        Ceramic Tiles
        Vitrified Tiles
        Porcelain Tiles

Product grid updates to:

All products under Tiles
4. When a Sub-Subcategory is Selected

If the user clicks Ceramic Tiles:

▼ Flooring
    ▼ Tiles
        ▼ Ceramic Tiles
            Glazed Ceramic
            Matte Finish
            Anti-Skid

Product grid updates to:

All products under Ceramic Tiles
5. Continue the Same Logic

The tree continues expanding as long as the taxonomy exists.

This is exactly how Material Bank and Alibaba materials navigation works.

6. Important UX Rules
Products always stay visible

The page never navigates away.
It only updates the grid.

Selected path should be highlighted

Example:

Flooring > Tiles > Ceramic Tiles

Use subtle highlight.

color: #FF6A3D
font-weight: 500
Parent categories remain visible

Do NOT collapse parent nodes.

This helps users understand hierarchy.

7. Expand/Collapse Behavior

Use arrows for expansion.

▶ collapsed
▼ expanded

Animation:

expand height animation
120ms ease
8. Add Breadcrumb Above Products

Above the product grid:

Home / Products / Flooring / Tiles / Ceramic Tiles

This improves orientation.

9. Product Count (Highly Recommended)

Show counts beside categories.

Example:

Flooring (128)
Tiles (74)
Ceramic Tiles (31)

This helps users understand scale.

10. Optional Improvement

Add “View All” option for each level.

Example:

Tiles
    View All Tiles
    Ceramic Tiles
    Vitrified Tiles
Figma Make / Dev Prompt

You can paste this:

Update the Categories filter panel on the left side of the Products page to support hierarchical category drill-down filtering.

The Categories section should behave like an expandable category tree.

Initially show only top-level categories such as Building Materials, Flooring, Wall Finishes, Lighting, Sanitary, Hardware, and Electrical.

When a user selects a category, expand that category to reveal its subcategories while keeping the parent category visible.

At the same time, update the product grid to display all products belonging to that selected category.

If the user selects a subcategory, expand the tree again to reveal sub-subcategories under it while keeping the hierarchy visible.

The product grid should update dynamically to show all products belonging to the selected subcategory.

This drill-down behavior should continue for deeper levels of the taxonomy if available.

Use arrow indicators to expand and collapse nodes.

Collapsed state:
▶ Category

Expanded state:
▼ Category

Highlight the currently selected category path using the primary accent color.

Ensure the filter tree remains visible and does not navigate away from the page. Only update the product grid dynamically.

Add subtle expand/collapse animations for better usability.

Do not change the layout of the page. Only enhance the Categories filter behavior to support progressive hierarchical filtering.
One Small UX Improvement I Strongly Recommend

Right now your filter has categories + brands.

For a material platform you should also add:

Material Type
Finish
Application
Price Range
Brand
Availability

This makes the product discovery 10× stronger.