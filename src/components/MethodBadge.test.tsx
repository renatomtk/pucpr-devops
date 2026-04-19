import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MethodBadge from "./MethodBadge";

describe("MethodBadge Component", () => {
  it("should render GET method with correct styling", () => {
    render(<MethodBadge method="GET" />);
    const badge = screen.getByText("GET");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-method-get");
  });

  it("should render POST method with correct styling", () => {
    render(<MethodBadge method="POST" />);
    const badge = screen.getByText("POST");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-method-post");
  });

  it("should render PUT method with correct styling", () => {
    render(<MethodBadge method="PUT" />);
    const badge = screen.getByText("PUT");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-method-put");
  });

  it("should render DELETE method with correct styling", () => {
    render(<MethodBadge method="DELETE" />);
    const badge = screen.getByText("DELETE");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-method-delete");
  });

  it("should have consistent structure for all methods", () => {
    const methods: Array<"GET" | "POST" | "PUT" | "DELETE"> = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ];

    methods.forEach((method) => {
      const { unmount } = render(<MethodBadge method={method} />);
      const span = screen.getByText(method);
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveClass("inline-block", "px-2", "py-0.5", "uppercase");
      unmount();
    });
  });
});
