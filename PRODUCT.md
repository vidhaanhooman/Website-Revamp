# Product

## Register

brand

## Users

Operations and growth leaders at healthcare practices, clinics, insurance teams, and home-service businesses evaluating an AI voice agent for inbound and outbound phone calls. They land on the site during diligence — comparing Retell, Bland, Vapi, Ringg — and need to believe in under 30 seconds that (1) the agent sounds human, (2) the platform is genuinely a unified product (build + deploy + monitor), and (3) it ships into their stack quickly. Decision context is usually a desk browser, sometimes a phone forward from a Slack thread.

## Product Purpose

HoomanLabs is an AI voice-agent platform that automates phone calls — appointment rescheduling, receptionists, support, lead qualification — for healthcare and service businesses. The marketing site exists to turn evaluators into demo bookings. Success is measured by demo conversion rate from the hero CTA and `Book a Demo`, and by perceived product depth versus Ringg AI / Sierra / Vapi on first scroll.

## Brand Personality

Quiet, precise, infrastructural. Sierra-coded calm rather than crimson urgency: the page reads like a product, not a campaign. Voice is grounded and technical — "build, test, deploy", "ship better agents", "observability." No buzzwords, no hype rhythm, no AGI gesturing. Black-and-white restraint with one warm accent reserved for product surfaces.

## Anti-references

- **The crimson editorial direction** I built in the prior pass — too warm, too campaign-shaped for this audience.
- **The generic 2025 AI-voice landing page**: navy gradient hero + neon waveform + glassmorphism cards.
- **SaaS-cream/parchment body bg**: warm beige body. Not us.
- **Card grids that repeat the same icon+heading+text pattern.** Every feature card here earns its mock.

## Design Principles

1. **Product altitude over marketing altitude.** Every section that names a capability shows the actual UI, not an illustration. Dashboards are the centerpiece — alternating left/right with ambient gradient backdrops.
2. **Chip-eyebrow below the headline, not above it.** Sierra cadence: centered H2 → small pill chip with icon → mock(s). One named pill per section, not a kicker on every block.
3. **Color discipline.** Body is white. Panels are pale blue. Action is black. Crimson exists only as a quiet brand mark in the wordmark. Warmth comes from the rust/teal ambient gradients behind product mocks, not from the body.
4. **Nav floats.** The pill-shaped capsule nav sits over content and shrinks on scroll. It is the only structural chrome.
5. **Beat Ringg / Sierra on three measurable things**: cleaner spacing, more believable product mocks, and a hero that says exactly what we do.

## Accessibility & Inclusion

WCAG 2.1 AA. Body text in `ink` `#0F1115` on white = 18.7:1 (AAA). Secondary `slate-500` `#6B7280` on white = 4.83:1 (AA body pass). Black CTA: white on `#0F1115` = 18.7:1. Soft-blue panels `#EEF3F9` with `ink` text = 17.4:1. All interactive elements keyboard-reachable with visible focus rings. Mega-menu collapses to a slide-down sheet at <768px. Full `prefers-reduced-motion` honor: ambient gradient animation freezes, scroll reveals become instant fades, mock animations jump to final state.
