---
version: 1
slug: "src-screens-homescreen-tsx"
primary_target: "src/screens/HomeScreen.tsx"
related_targets: ["src/App.tsx","src/components/BottomNav.tsx"]
---

# Home (喝水) and app shell

Scope: the home tab, the top bar and the bottom navigation. Visitor mode: Operate.

Audience and job: an elderly owner checking how much they have drunk today,
adding or correcting a drink, and noticing a new voice message from family.
Constraints: keep the name, the blue #2866be and the existing layout order;
solid surfaces only; large main text; honour reduce-motion.

Memorable moment: swiping between tabs while the highlight in the bottom bar
travels with the thumb.

Unresolved: whether the tinted secondary buttons read as tappable enough for
this audience (owner to judge on the sample).

## Direction contract

THESIS: One loud thing per screen, today's water, on quiet paper. It refuses
the stack of identical white outlined boxes where a label, a number and a
button all weigh the same.

OWN-WORLD: Cool paper ground (#eef3f8), borderless white cards with one soft
shadow and 24px corners. Brand blue only on the water card, the primary action
and the current selection. Deep navy ink for text, slate for secondary text.
Secondary actions are pale-blue filled pills, never white outlined boxes.
Floating bars are solid white pills.

STORY: The owner sees at once how much they have drunk and how far the goal
is, sees that the base is fine, and knows where to tap to add water.

FIRST VIEWPORT: Floating brand pill at top. A compact one-card status strip.
A pale-blue row when there are new voice messages. The blue water card with a
thick round-capped ring, the amount at 48px in its dark centre, percentage
beneath. Floating 手動加水 pill just above the floating navigation.

FORM: Existing layout kept (restyle of an established surface, no structure
round). Signature interaction: finger-tracked tab swipe with the navigation
highlight sliding in step. seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
