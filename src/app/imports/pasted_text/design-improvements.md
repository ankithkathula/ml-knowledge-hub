. Add a Proper Section Break

Right now the CTA section and footer share the same visual background.

Add one clear separator zone.

Recommended spacing
.ecosystem-section {
  padding-bottom: 120px;
}

.footer-section {
  padding-top: 80px;
}

This ensures the footer starts clearly after the CTA section.

2. Move the Stats Row Into the CTA Section

The 500+ | 10k+ | 50k+ stats currently sit in the overlap zone.

They should belong to the Join Ecosystem section, not the footer.

Correct hierarchy
JOIN OUR ECOSYSTEM
cards
CTA button
stats strip
-------------------- divider
footer

Add a divider above the footer:

border-top: 1px solid rgba(255,255,255,0.08);
margin-top: 60px;
3. Reduce Footer Background Height

The footer gradient is bleeding upward.

Limit the footer background only to the footer container.

.footer {
  background:
  radial-gradient(circle at 80% 120%, rgba(255,106,61,0.35), transparent 60%),
  radial-gradient(circle at 10% 120%, rgba(40,70,160,0.35), transparent 60%),
  #0B0F1A;

  padding-top: 70px;
  padding-bottom: 50px;
}

This stops the background from covering the CTA section.

4. Reduce the CTA Section Bottom Glow

Your CTA section already has a glow, and the footer has one too.

Two glows touching each other = visual noise.

Lower the CTA glow opacity.

.ecosystem-section {
  background:
  radial-gradient(circle at 50% 120%, rgba(255,106,61,0.18), transparent 65%);
}
5. Fix the Hidden Elements

Some elements are getting hidden because of z-index stacking.

Ensure the CTA section stays above the background layers.

.ecosystem-section {
  position: relative;
  z-index: 2;
}

.footer {
  position: relative;
  z-index: 1;
}
6. Slightly Lift the CTA Button

The button is too close to the stats.

Add breathing space.

.cta-button {
  margin-bottom: 40px;
}
7. Improve the Transition Between Sections

Add a subtle fade divider between the CTA and footer.

Example:

.section-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.15),
    transparent
  );
  margin: 70px auto;
  width: 60%;
}

This makes the transition feel intentional instead of overlapping.

Final Correct Layout
JOIN OUR ECOSYSTEM
subtitle

cards row

CTA BUTTON

500+ | 10k+ | 50k+

---------------- subtle divider ----------------

FOOTER
navigation columns
brand + contact + social
copyright
Small Design Improvements (Optional but Nice)

Increase card spacing slightly

gap: 28px;

Slight card hover lift

transform: translateY(-4px);

Reduce stats opacity slightly

opacity: 0.8;
Result After Fix

The page will feel:

• visually layered
• no overlapping sections
• clear CTA → footer transition
• more premium and controlled