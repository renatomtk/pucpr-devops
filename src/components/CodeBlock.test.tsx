import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeBlock from "./CodeBlock";

describe("CodeBlock Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
  });

  it("should render with default language (json)", () => {
    render(<CodeBlock code='{"key": "value"}' />);
    expect(screen.getByText("json")).toBeInTheDocument();
  });

  it("should render with custom language", () => {
    render(<CodeBlock code="console.log('test')" language="javascript" />);
    expect(screen.getByText("javascript")).toBeInTheDocument();
  });

  it("should display the provided code", () => {
    const testCode = '{"name": "test"}';
    render(<CodeBlock code={testCode} />);
    expect(screen.getByText(testCode)).toBeInTheDocument();
  });

  it("should copy code to clipboard when copy button is clicked", async () => {
    const testCode = '{"test": "data"}';
    render(<CodeBlock code={testCode} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testCode);
    });
  });

  it("should show 'Copied' message after clicking copy and reset after 2 seconds", async () => {
    const testCode = '{"test": "data"}';
    render(<CodeBlock code={testCode} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied ✓")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
