export const MOCK_ARTICLE_MDX = `
## Understanding the Meta

The current **Dragonflight Season 3** meta has shifted drastically. If you want to push high Mythic+ keys (+20 and above), understanding the new tier list is mandatory.

<Callout type="info">
  **Note:** This tier list is based on data from the top 100 runs on Raider.io as of February 2024.
</Callout>

### 1. The God Comp (Exodia)
Currently, the highest-performing composition revolves around maximizing synergy between the Augmentation Evoker and the Shadow Priest.

![God Comp Setup](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80)

*   **Tank:** Vengeance Demon Hunter
*   **Healer:** Restoration Druid
*   **DPS:** Augmentation Evoker, Shadow Priest, Fire Mage

## Critical Macros & Addons

To perform at this level, you cannot click your spells. You need macros.

### Mouseover Heal Macro
This macro allows you to heal your target simply by hovering over their frame.

\`\`\`lua
#showtooltip
/cast [@mouseover,help,nodead] [] Rejuvenation
\`\`\`

### Burst DPS Rotation (Python Logic)
Just kidding, don't script your rotation or you'll get banned. But here is the logic:

\`\`\`python
def execute_rotation():
    if target.health < 0.2:
        cast("Execute")
    else:
        cast("Mortal Strike")
\`\`\`

<Callout type="warning">
  **Warning:** Using automated rotation scripts (scripts/bots) will result in a permanent ban. Always press your own keys.
</Callout>

## Gearing Strategy

Getting your Item Level (ilvl) up is the biggest bottleneck. You have two options:

1.  **The Grind:** Run +17 keys for 40 hours a week.
2.  **The Smart Way:** Target specific dungeons that drop your BiS (Best in Slot) trinkets.

### Best Trinkets to Farm
*   **Pip's Emerald Friendship Badge** (Council of Dreams)
*   **Augury of the Primal Flame** (Fyrakk)

## Need a Boost?

If you are stuck in "ELO Hell" (low keys) because PUGs keep failing mechanics, we can help. Our boosters are Top 0.1% players who can carry you through a +20 key in under 30 minutes.

<ProductCard id="boost-20" title="Mythic+ 20 Timed Run (Selfplay)" price="15" />

### Why Buy a Boost?
*   **Save Time:** Skip weeks of grinding.
*   **Learn:** Watch how a pro tank pulls the dungeon.
*   **Loot:** You get all the tradeable gear at the end.

## Conclusion

The meta changes every week. Stay adaptable, keep your UI clean, and don't be afraid to ask for help.

Good luck in the keys!
`;
