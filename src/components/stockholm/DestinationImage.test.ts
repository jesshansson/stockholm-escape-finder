import { describe, expect, it } from "vitest";
import { destinationInitials } from "./DestinationImage";

describe("destinationInitials", () => {
  it("uses the first two words", () => {
    expect(destinationInitials("Tyresta nationalpark")).toBe("TN");
  });

  it("handles a single word", () => {
    expect(destinationInitials("Vaxholm")).toBe("V");
  });

  it("splits on hyphens and keeps Swedish letters", () => {
    expect(destinationInitials("Öja-Landsort")).toBe("ÖL");
  });

  it("ignores punctuation and extra whitespace", () => {
    expect(destinationInitials("  Drottningholms  slott / park ")).toBe("DS");
  });

  it("never throws on empty input", () => {
    expect(destinationInitials("")).toBe("?");
  });
});
