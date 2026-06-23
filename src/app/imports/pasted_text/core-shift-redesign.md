🎯 CORE SHIFT

Right now:

Orange = accent
Section = neutral

👉 New approach:

Orange = atmosphere + identity
Section = warm, inviting, action-driven
⚠️ IMPORTANT (DON’T OVERDO ORANGE)

We are NOT doing:
❌ full orange background
❌ high saturation everywhere

We ARE doing:
✅ soft orange-tinted environment
✅ controlled gradients
✅ strong contrast with dark cards

✅ JOIN OUR ECOSYSTEM — REDESIGN
🔥 1. BACKGROUND (PRIMARY CHANGE)

Instead of grey → create soft orange-tinted canvas

background:
radial-gradient(
  circle at 50% 20%,
  rgba(255,106,61,0.12),
  transparent 55%
),
linear-gradient(
  to bottom,
  #FFF7F4 0%,
  #FDEDE7 100%
);

👉 Effect:

Warm, premium
Not overpowering
Feels branded
🔥 2. ADD AMBIENT LIGHT BLOOM (VERY PREMIUM)

In Figma:

Add large ellipse behind cards
Color: #FF6A3D
Blur: 180–240px
Opacity: 12–18%

👉 Creates:
✨ soft glow environment

🔥 3. CARDS (KEEP DARK — IMPORTANT CONTRAST)

Do NOT change this:

background: #0F172A;

But enhance slightly:

box-shadow:
0 10px 30px rgba(2, 6, 23, 0.12),
0 0 0 1px rgba(255,106,61,0.06);
🔥 4. CARD HOVER (MORE BRAND FEEL)
hover:
transform: translateY(-6px);
box-shadow:
0 20px 50px rgba(2, 6, 23, 0.18),
0 0 0 1px rgba(255,106,61,0.2),
0 0 30px rgba(255,106,61,0.15);

👉 Subtle orange glow → ties section together

🔥 5. SECTION HEADING (IMPORTANT)

Right now “ECOSYSTEM” is orange — keep that, but refine:

JOIN OUR → #1F2937
ECOSYSTEM → #FF6A3D

Add slight letter spacing:

letter-spacing: 2px;
🔥 6. CTA BUTTON (MAKE IT HERO ELEMENT)
background: #FF6A3D;

box-shadow:
0 12px 30px rgba(255,106,61,0.35),
0 0 40px rgba(255,106,61,0.15);

Hover:

transform: translateY(-2px);
box-shadow:
0 18px 40px rgba(255,106,61,0.45);
🔥 7. STATS SECTION (IMPORTANT BALANCE)

Keep it neutral to avoid overload:

color: #1F2937 (numbers)
color: #6B7280 (labels)

Add subtle divider:

border-color: rgba(0,0,0,0.08);
✅ FOOTER (KEEP DARK — SLIGHTLY TUNE TO MATCH)

Now that above is warmer, footer should feel:

👉 deeper
👉 richer
👉 slightly more orange-integrated

🔥 Footer Glow (Refined)
background:
radial-gradient(
  circle at 70% 120%,
  rgba(255,106,61,0.4),
  transparent 45%
),
radial-gradient(
  circle at 30% 120%,
  rgba(255,106,61,0.25),
  transparent 50%
),
linear-gradient(
  to bottom,
  #03060F 0%,
  #02040A 100%
);
🔥 Add very subtle top warmth (NEW)
background overlay:
linear-gradient(
  to bottom,
  rgba(255,106,61,0.05),
  transparent 30%
);

👉 Helps transition from orange section above

⚖️ FINAL VISUAL FLOW
[ Warm Orange Section ✨ ]
   ↓
[ Dark Cards (contrast anchors) ]
   ↓
[ CTA (bright focal point) ]
   ↓
[ Neutral Stats (breathing space) ]
   ↓
[ Deep Dark Footer (glow from below 🔥) ]
🧾 FIGMA MAKE PROMPT (FINAL — HIGH QUALITY)
Redesign the “Join Our Ecosystem” section to use a primary orange-themed visual language while maintaining a clean and premium SaaS aesthetic. Do not change content or layout.

BACKGROUND:
- Replace grey background with a soft orange-tinted gradient:
  radial-gradient(circle at 50% 20%, rgba(255,106,61,0.12), transparent 55%),
  linear-gradient(to bottom, #FFF7F4 0%, #FDEDE7 100%)

- Add a subtle blurred orange glow behind the cards (low opacity, large radius)

CARDS:
- Keep dark navy background (#0F172A)
- Add subtle border glow using rgba(255,106,61,0.06)
- Maintain clean elevation shadows

HOVER INTERACTIONS:
- Cards lift slightly on hover
- Add soft orange glow and border highlight

TYPOGRAPHY:
- “JOIN OUR” in dark neutral
- “ECOSYSTEM” in primary orange (#FF6A3D)
- Slight letter spacing for premium feel

CTA BUTTON:
- Primary orange background
- Add soft glow shadow
- Hover: slight lift + stronger glow

STATS SECTION:
- Keep neutral colors for balance
- Ensure strong readability and spacing

FOOTER:
- Maintain dark theme
- Enhance bottom orange glow using radial gradients
- Slightly deepen base colors for contrast

GOAL:
- Make the section feel warm, branded, and inviting
- Maintain strong contrast with dark cards
- Ensure smooth visual transition into the footer
💡 WHAT THIS WILL FEEL LIKE
✨ Warm, inviting, brand-led section
🎯 Strong focus on action (CTA)
🧩 Cards feel grounded + interactive
🔥 Footer feels deep and premium