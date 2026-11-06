# Design-system authoring

The font, colour, radius, motion and spacing values live in
`src/styles/tokens.css`. Component styles consume those values. The global
entry point imports fonts, foundations, typography, layouts and component
styles in an explicit cascade-layer order.

Layout describes geometry. Component classes describe the anatomy of an actual
component. Section titles, IDs and prose describe the story; they do not select
its layout.

## Sections and layouts

```mdx
<Section aria-labelledby="takeaways-title">
  <TextBlock>
    <p className="type-label text-muted">06. Takeaways</p>
    <h2 id="takeaways-title" className="type-title text-block__heading">
      What I learned
    </h2>
    <p>The same text block works for an introduction or a conclusion.</p>
  </TextBlock>
  <Column spaceBefore="7" desktopSpaceBefore="none">
    <Cards layout="stack">
      <Card title="A focused insight">
        <p>Supporting evidence.</p>
      </Card>
    </Cards>
  </Column>
</Section>
```

- `Section` owns the existing section width, padding and divider. It composes
  the same layout classes as `Columns` on the section element, preserving the
  DOM and avoiding an extra wrapper. Its defaults are a 2:3 ratio, section gap
  and mobile block flow. Use `divider={false}` for a section without a divider.
- `Columns` handles independent content pairs. Ratios are `1:1`, `1:2`,
  `2:1`, `1:3`, `2:3` and `3:2`; alignment is `start`, `center` or `stretch`.
  `reverse` changes desktop placement while retaining mobile and screen-reader
  reading order. `minStart` / `minEnd` retain the existing 10rem minimum used
  for narrow text columns.
- `Column` provides explicit desktop `column={1|2}`, `column="full"` and
  `row={1|2|3}` placement without assigning a narrative role to the content.
- `Stack` groups items in one column. `width="wide"` uses the existing 72rem
  content limit.
- `TextBlock` owns text measurement and normal sibling flow. Measures are
  `copy` (30rem), `compact` (24rem) and `wide` (34rem). Apply
  `text-block__heading` to headings that need its heading measure. Heading
  level and appearance remain independent.

Gaps `2`, `5`, `6` and `7` refer to the existing spacing tokens. The
`section`, `fluid` and `responsive` gap recipes preserve the existing fluid
spacing formulas. Placement changes at the existing 48rem breakpoint; the
optional section inset starts at 64rem.

`spaceBefore` uses the existing token suffixes `2` through `8`, `none`,
or the existing `fluid` recipe. It applies at all widths unless
`desktopSpaceBefore` explicitly overrides it. A parent layout owns gaps
between its items; components own their internal spacing.

## Content blocks

- `Metric`: `value`, optional `label`, `description`, `note`, and
  `layout="row"|"stack"`. Zero is a valid value.
- `MetadataList`: typed `items` with `label` and rich `value`; renders a
  definition list. It does not select a font family through its name.
- `Quote`: the existing quote treatment, with an explicit spacing override
  when needed.
- `Figure`: informative images require `src` and `alt`. Use `decorative`
  for decoration or `placeholder` for an intentionally empty frame.
  `aspect` is a typed ratio such as `"16/9"`; `fit` is `contain` or `cover`.
- `MediaFrame` and `Caption`: shared image/video framing and captions.
  Captions default to the existing serif treatment; `tone="body"` retains the
  existing body-text treatment used for explanatory diagrams.
- `Workflow`: receives a non-empty list of typed `step` or `parallel`
  stages. `WorkflowComparison` composes two workflows. Project-specific labels
  and stages live with the case-study content, and IDs are unique per instance.

Use `type-label text-muted` for small uppercase labels and `type-eyebrow`
for the existing handwritten style. Apply `type-display` explicitly when
emphasised statement text should use the display scale.

Layout and case-study blocks are registered for MDX in `case-study/index.ts`.
`MetadataList` and `MediaFrame` are React helpers used by the shared header and
media components. Keep paragraphs explicit or put blank lines around Markdown
inside JSX tags.

## Verification

- `npm test` checks component semantics and source contracts.
- `npm run typecheck` checks props, including expected-invalid authoring examples.
- `npm run build` validates all MDX pages.
- Start a production server on port 4100, then run `npm run visual:capture`
  **before** a refactor and `npm run visual:compare` afterwards. The visual
  runner covers seven pages at four widths in both themes, comparing pixels,
  text geometry and computed typography. It stabilises animation/video frames.
  `npm run test:interaction` separately checks theme, focus and motion behaviour.

Visual baselines and reports stay in ignored `work/design-system/`. They are
not portfolio assets. Install Chromium using `npx playwright install chromium`
or set `CHROMIUM_PATH` to an existing executable. `VISUAL_BASE_URL` overrides
the server address. Optional `VISUAL_ROUTES` and `VISUAL_WIDTHS` support focused
checks after a specific change.
