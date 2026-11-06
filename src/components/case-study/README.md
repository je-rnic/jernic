# Case-study cards

Use `Card` for one focused insight, summary or metric. Use `Cards` to lay out
related cards. Do not write card containers directly in MDX or style cards
through a surrounding research/process section.

The shared anatomy is optional metadata (icon and index), a heading, and body
content. Spacing, borders, icon sizing and colours use the portfolio tokens in
`globals.css`. Titles use the normal title scale; only explicit metric cards
use the display scale.

This follows the [SGDS card guidance](https://www.designsystem.tech.gov.sg/components/card)
on consistent anatomy, focused content and optional slots, while retaining this
site's typography, radius and light/dark palette. These are informational cards:
they do not receive button roles, tab stops, pointer cursors or hover effects.
Use ordinary links in the body when an explicit destination is needed.

## Authoring

```mdx
<Cards layout="stack">
  <Card title="Load what the route needs" number="01" icon={
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  }>
    <p>Defer page code until the route needs it.</p>
  </Card>
</Cards>

<Cards>
  <Card title="80%" variant="metric">
    <p>20 of 25 respondents selected the highest UI rating.</p>
  </Card>
</Cards>
```

- `Cards.layout`: `grid` (default) adapts to available container width; `stack`
  keeps one column. Cards in the same grid row stretch equally, without a fixed
  minimum height. Use `column="full"` for full-width placement in a section,
  or wrap the cards in `Column` for a text/supporting-content split.
- `Cards` accepts the same explicit placement and spacing props as `Column`.
- `Card.title`: required, rendered as an accessible heading.
- `Card.headingLevel`: `3` (default) or `4` when nested beneath an h3.
- `Card.variant`: `default` or `metric`. Section placement never changes it.
- `Card.icon`: optional decorative SVG; the component controls size and colour.
  Include any meaningful information in the visible title or body.
- `Card.number`: optional decorative index, such as `"01"`.
- `Card.children`: optional rich body content. Use paragraphs for prose.

Keep a blank line around Markdown inside JSX tags, or use explicit HTML tags.
Keep longer explanations in the surrounding section rather than adding more
slots or a page-specific card variant. See [shared authoring guidance](../README.md)
for section layouts, media and verification.
