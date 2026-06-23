PROBLEM
Footer glow + height is too aggressive from the top
Top padding is too large → pushing content upward
Glow origin is too high → visually overlaps stats
✅ SOLUTION (PRECISE + CONTROLLED)

We’ll fix this in 3 steps:

🔧 1. REDUCE FOOTER TOP PADDING (MAIN FIX)

Right now it’s likely something like:

padding-top: 80–120px ❌
Change to:
padding-top: 48px;
padding-bottom: 40px;

👉 This immediately:

Pulls footer DOWN
Creates breathing space for stats section
🔧 2. PUSH GLOW LOWER (VERY IMPORTANT)

Your glow is currently rising too high.

Adjust radial gradients:
background:
radial-gradient(
  circle at 70% 130%,   /* was ~120% */
  rgba(255,106,61,0.35),
  transparent 45%
),
radial-gradient(
  circle at 30% 130%,   /* push further down */
  rgba(255,106,61,0.25),
  transparent 50%
),
linear-gradient(
  to bottom,
  #04070F 0%,
  #02050C 100%
);

👉 This ensures:

Glow stays in LOWER HALF
Top becomes clean & readable
🔧 3. ADD TOP FADE CONTROL (SUBTLE BUT POWERFUL)

This prevents glow from creeping upward visually.

overlay:
linear-gradient(
  to bottom,
  rgba(4,7,15,1) 0%,
  rgba(4,7,15,0.9) 20%,
  transparent 60%
);

👉 Result:

Top edge stays dark
Stats section remains untouched
🔧 4. OPTIONAL (BEST PRACTICE)

Add slight spacing between stats and footer:

margin-top (footer): 40px;

OR

padding-bottom (stats section): 40px;
⚖️ FINAL VISUAL STRUCTURE
[ Join Ecosystem ]
        ↓
[ CTA Button ]
        ↓
[ Stats (CLEAR & FULLY VISIBLE) ✅ ]
        ↓ (breathing space)
[ Footer starts (clean top, no glow interference) ]
        ↓
[ Glow builds gradually toward bottom 🔥 ]
🧾 FIGMA MAKE PROMPT (FINAL FIX)
Refine the footer spacing and glow so it does not overlap or visually interfere with the stats section above.

FOOTER SPACING:
- Reduce top padding to 48px
- Reduce overall vertical height slightly
- Ensure clear spacing between stats section and footer

GLOW ADJUSTMENT:
- Move radial glow lower in the footer:
  Use positions like 30% 130% and 70% 130%
- Reduce upward spread of glow

TOP CONTROL:
- Ensure the top of the footer remains dark and clean
- Avoid glow bleeding into upper sections

BACKGROUND:
- Maintain dark gradient base
- Keep glow concentrated in bottom half only

GOAL:
- Stats section (Trusted Brands, Professionals, Products) should be fully clear and unobstructed
- Footer should feel grounded at the bottom, not overlapping or merging with upper content
💡 RESULT YOU SHOULD SEE
Stats → clean, readable, premium
Footer → contained, grounded
Glow → visible but controlled
No visual collision between sections