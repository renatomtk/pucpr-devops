import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn Utility Function", () => {
  it("should merge single class", () => {
    const result = cn("px-2");
    expect(result).toBe("px-2");
  });

  it("should merge multiple classes", () => {
    const result = cn("px-2", "py-1", "text-sm");
    expect(result).toContain("px-2");
    expect(result).toContain("py-1");
    expect(result).toContain("text-sm");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toContain("base");
    expect(result).toContain("active");
  });

  it("should remove falsy values", () => {
    const shouldAdd = false;
    const result = cn("px-2", shouldAdd && "py-1", null, "text-sm");
    expect(result).toContain("px-2");
    expect(result).toContain("text-sm");
    expect(result).not.toContain("py-1");
  });

  it("should resolve Tailwind conflicts correctly", () => {
    const result = cn("p-2 p-4");
    expect(result).toContain("p-4");
  });

  it("should handle complex nested conditions", () => {
    const isPrimary = true;
    const isDisabled = false;
    const result = cn(
      "btn",
      isPrimary && "btn-primary",
      isDisabled && "btn-disabled"
    );
    expect(result).toContain("btn");
    expect(result).toContain("btn-primary");
    expect(result).not.toContain("btn-disabled");
  });
});
