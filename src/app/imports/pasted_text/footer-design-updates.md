1. Reduce the Background Typography Impact

Right now the large MATERIAL LIBRARY text is competing with the content.

Change it to:

opacity: 0.035 – 0.05
font-weight: 800
letter-spacing: -4px
font-size: 260px

Also clip it to the bottom area only so it becomes a background texture instead of a headline.

Better placement:

position: absolute
bottom: -60px
left: 50%
transform: translateX(-50%)

This keeps it dramatic but subtle.

2. Improve the Gradient Background

The current gradient feels flat.

Use two radial glows instead of one:

background:
radial-gradient(circle at 80% 120%, rgba(255,106,61,0.35), transparent 60%),
radial-gradient(circle at 10% 120%, rgba(40,70,160,0.35), transparent 60%),
#0B0F1A;

This creates depth and richness.

3. Compress the Layout Vertically

Right now spacing is slightly large.

Use:

top padding: 70px
grid row gap: 36px
column gap: 60px
bottom padding: 50px

Navigation list spacing:

link gap: 8px
section gap: 14px

This alone will reduce the visual height by ~20%.

4. Align the Bottom Content Better

Instead of having brand, contact, and social separated, structure them into a 3-column row.

Better layout:

[ Brand + Description ]   [ Contact ]   [ Social ]

Example:

Left

materiallibrary

India's first digital platform transforming the
construction industry ecosystem.

Center

GET IN TOUCH
connect@materiallibrary.com
+91 234 567 890
Mumbai, India

Right

FOLLOW US
Instagram   LinkedIn   Twitter   Facebook

This gives the footer visual balance.

5. Improve Navigation Column Styling

Make the navigation headers feel cleaner.

Headers:

font-size: 11px
letter-spacing: 0.12em
text-transform: uppercase
color: #9CA3AF

Links:

font-size: 14px
color: #E5E7EB

Hover:

color: #FF6A3D

This matches the Material Library brand tone.

6. Refine the Bottom Bar

The bottom line currently feels slightly empty.

Better structure:

© 2026 Material Library

Sitemap • Accessibility • Status

Spacing:

margin-top: 30px
opacity: 0.7
font-size: 12px
7. Improve Social Icons

Use outlined circular icons with subtle glow.

Style:

width: 36px
height: 36px
border: 1px solid rgba(255,255,255,0.12)
border-radius: 50%

Hover:

border-color: #FF6A3D
background: rgba(255,106,61,0.1)

Very subtle.

8. Add One Thin Divider

Between navigation and bottom content:

height: 1px
background: rgba(255,255,255,0.08)
margin: 40px 0

This improves structure.

Result After Improvements

Your footer will feel:

• shorter
• more premium
• visually structured
• aligned with ML brand

Instead of a typical SaaS footer.