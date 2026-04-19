import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo Component", () => {
  it("should render the logo text", () => {
    render(<Logo />);
    expect(screen.getByText("API Playground")).toBeInTheDocument();
  });

  it("should render an SVG element", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have proper container structure", () => {
    render(<Logo />);
    const container = screen.getByText("API Playground").closest("div");
    expect(container).toHaveClass("flex", "items-center", "gap-3");
  });

  it("should render text with correct styling", () => {
    render(<Logo />);
    const text = screen.getByText("API Playground");
    expect(text).toHaveClass("text-sm", "font-semibold", "tracking-tight");
  });

  it("should contain SVG with proper dimensions", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "28");
    expect(svg).toHaveAttribute("height", "28");
  });
});
