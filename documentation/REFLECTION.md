# Reflection

This portfolio started as a question about honesty. A developer portfolio is easy to inflate: add a percentage to every skill, call every class project "production-grade", list a stack because the demo happens to be hosted somewhere. The harder, better version was to show only what can be defended — and to make the limits visible.

That decision shaped the whole build. The three featured projects do not have documented stacks in the material I had, so each brief says **"Not specified in source material."** Two documentation URLs returned 404, so they are absent instead of broken. The learning section says "in progress" rather than inventing progress bars. The result is less glossy than a typical portfolio, but every line can be traced back to something real.

The second question was whether a portfolio should be a document or an experience. The answer here is both, in that order. The page itself is a readable static document: semantic sections, native `<details>` for project briefs, normal links, no dependence on animation. Builder OS is layered on top as an optional playground. It reuses the same verified content in four small apps and a console. A visitor who never opens it loses nothing; a visitor who does gets a sense of how I think about interfaces, state, and detail.

Building the OS inside a no-framework constraint was the most interesting engineering work. Tabs needed roving focus, `aria-selected`, and arrow-key support. The console needed command parsing, safe DOM output, history, scroll management, and a reset that truly resets. The dialog needed focus return, body scroll locking, and an Esc path that does not fight the native element. None of this is large, but each piece has edge cases that only appear when you actually drive the UI.

Testing caught four issues worth remembering:

1. Two scroll offsets were stacking, so anchor links landed lower than intended and the nav highlighted the previous section. The bug looked like a scroll-spy logic problem; the cause was CSS. Removing one rule fixed it.
2. The primary button's bottom gradient stop failed AA contrast for its dark label. A small color change — not a redesign — fixed it.
3. A display heading with very tight line-height let its descender sit against the line below. The type looked fine in a static mock and wrong in a real viewport.
4. A few console controls were slightly under a comfortable touch height. Minimum heights solved it without changing the visual language.

I also learned to distrust "it looks right." Headless checks at 1440, 1024, 768, 390, and 320 px, plus keyboard and reduced-motion passes, found problems that a quick glance would miss. Measuring contrast ratios and text bounding boxes felt excessive until each check caught something.

On the AWS side, the deliberate choice was a manual ZIP deployment to Amplify Hosting. It keeps the architecture simple and honest: a static site, one app, one branch, no build pipeline pretending to be more than it is. GitHub remains the source of truth. The trade-off is that publishing is a two-step process, GitHub push plus Amplify upload. For a portfolio that changes a few times a semester, that is acceptable, and it made the deployment mechanics legible rather than magic.

If I continued, I would add a small, real case study for each project — architecture notes and decisions, not just outcomes — and a proper contact flow that does not require a backend. I would also revisit the project stacks once they are documented, and replace "not specified" with accurate detail. That is the point: the site should get more specific as the work does, not more decorative.

The final feeling is not "this is finished." It is "this is defensible." For a first serious portfolio, that is the right milestone.
