type AdSlotProps = {
  placement: "home-between-sections" | "game-after-rules";
};

/**
 * Reserved for future contextual advertising. It stays hidden until the site
 * has an approved publisher account, a certified consent flow and the correct
 * child/age treatment. The placement is deliberately separated from download
 * buttons and game controls to reduce accidental clicks.
 */
export function AdSlot({ placement }: AdSlotProps) {
  return (
    <aside
      className="ad-slot"
      data-ad-placement={placement}
      aria-label="Advertisement"
      hidden
    />
  );
}

