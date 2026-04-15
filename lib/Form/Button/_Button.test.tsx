// /**
//  * Unified Button Component - Test Suite
//  *
//  * Comprehensive tests to validate all functionality from both
//  * Button.tsx and ButtonIcon.tsx components
//  */

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Delete, Edit, Add } from "@mui/icons-material";
// import UnifiedButton from "./UnifiedButton";
// import { ButtonCompat, ButtonIconCompat } from "./_Button.compat";

// describe("UnifiedButton Component", () => {
//    // ===== BASIC RENDERING TESTS =====
//    describe("Basic Rendering", () => {
//       test("renders standard button with text", () => {
//          render(<UnifiedButton>Click Me</UnifiedButton>);
//          expect(screen.getByText("Click Me")).toBeInTheDocument();
//       });

//       test("renders with custom className", () => {
//          const { container } = render(<UnifiedButton className="custom-class">Button</UnifiedButton>);
//          expect(container.querySelector(".custom-class")).toBeInTheDocument();
//       });

//       test("renders with data-testid", () => {
//          render(<UnifiedButton data-testid="test-button">Button</UnifiedButton>);
//          expect(screen.getByTestId("test-button")).toBeInTheDocument();
//       });

//       test("does not render when visible is false", () => {
//          const { container } = render(<UnifiedButton visible={false}>Hidden</UnifiedButton>);
//          expect(container.firstChild).toBeNull();
//       });
//    });

//    // ===== VARIANT TESTS =====
//    describe("Button Variants", () => {
//       test("renders primary variant", () => {
//          const { container } = render(<UnifiedButton variant="primary">Primary</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("bg-primary");
//       });

//       test("renders secondary variant", () => {
//          const { container } = render(<UnifiedButton variant="secondary">Secondary</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("bg-gray-100");
//       });

//       test("renders outlined variant", () => {
//          const { container } = render(<UnifiedButton variant="outlined">Outlined</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("border");
//       });

//       test("renders contained variant", () => {
//          const { container } = render(<UnifiedButton variant="contained">Contained</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("bg-blue-600");
//       });
//    });

//    // ===== SIZE TESTS =====
//    describe("Button Sizes", () => {
//       test("renders small size", () => {
//          const { container } = render(<UnifiedButton size="small">Small</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("h-8");
//       });

//       test("renders medium size (default)", () => {
//          const { container } = render(<UnifiedButton size="medium">Medium</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("h-10");
//       });

//       test("renders large size", () => {
//          const { container } = render(<UnifiedButton size="large">Large</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("h-12");
//       });
//    });

//    // ===== ICON TESTS =====
//    describe("Icons", () => {
//       test("renders with startIcon", () => {
//          render(<UnifiedButton startIcon={<Add data-testid="start-icon" />}>Add Item</UnifiedButton>);
//          expect(screen.getByTestId("start-icon")).toBeInTheDocument();
//       });

//       test("renders with endIcon", () => {
//          render(<UnifiedButton endIcon={<Delete data-testid="end-icon" />}>Delete</UnifiedButton>);
//          expect(screen.getByTestId("end-icon")).toBeInTheDocument();
//       });

//       test("renders icon-only button", () => {
//          render(<UnifiedButton icon={<Edit data-testid="icon" />} title="Edit" />);
//          expect(screen.getByTestId("icon")).toBeInTheDocument();
//       });

//       test("renders iconOnly standard button", () => {
//          const { container } = render(
//             <UnifiedButton iconOnly variant="primary">
//                <Add />
//             </UnifiedButton>
//          );
//          expect(container.querySelector("button")).toHaveClass("p-0", "h-10", "w-10");
//       });
//    });

//    // ===== STATE TESTS =====
//    describe("Button States", () => {
//       test("handles disabled state", () => {
//          render(<UnifiedButton disabled>Disabled</UnifiedButton>);
//          expect(screen.getByRole("button")).toBeDisabled();
//       });

//       test("handles loading state", () => {
//          render(<UnifiedButton loading>Loading</UnifiedButton>);
//          expect(screen.getByRole("button")).toBeDisabled();
//       });

//       test("shows loading spinner when loading", () => {
//          const { container } = render(<UnifiedButton loading>Loading</UnifiedButton>);
//          expect(container.querySelector(".MuiCircularProgress-root")).toBeInTheDocument();
//       });

//       test("hides icons when loading", () => {
//          render(
//             <UnifiedButton loading startIcon={<Add data-testid="icon" />}>
//                Loading
//             </UnifiedButton>
//          );
//          expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
//       });
//    });

//    // ===== INTERACTION TESTS =====
//    describe("User Interactions", () => {
//       test("handles click events", () => {
//          const handleClick = jest.fn();
//          render(<UnifiedButton onClick={handleClick}>Click Me</UnifiedButton>);
//          fireEvent.click(screen.getByText("Click Me"));
//          expect(handleClick).toHaveBeenCalledTimes(1);
//       });

//       test("does not trigger onClick when disabled", () => {
//          const handleClick = jest.fn();
//          render(
//             <UnifiedButton onClick={handleClick} disabled>
//                Disabled
//             </UnifiedButton>
//          );
//          fireEvent.click(screen.getByText("Disabled"));
//          expect(handleClick).not.toHaveBeenCalled();
//       });

//       test("does not trigger onClick when loading", () => {
//          const handleClick = jest.fn();
//          render(
//             <UnifiedButton onClick={handleClick} loading>
//                Loading
//             </UnifiedButton>
//          );
//          fireEvent.click(screen.getByText("Loading"));
//          expect(handleClick).not.toHaveBeenCalled();
//       });
//    });

//    // ===== LAYOUT TESTS =====
//    describe("Layout Options", () => {
//       test("renders full width button", () => {
//          const { container } = render(<UnifiedButton fullWidth>Full Width</UnifiedButton>);
//          expect(container.querySelector("button")).toHaveClass("w-full");
//       });

//       test("applies custom spanClassName", () => {
//          const { container } = render(<UnifiedButton spanClassName="custom-span">Button</UnifiedButton>);
//          expect(container.querySelector(".custom-span")).toBeInTheDocument();
//       });
//    });

//    // ===== TOOLTIP TESTS =====
//    describe("Tooltips", () => {
//       test("shows native tooltip when showTooltip is true", () => {
//          const { container } = render(
//             <UnifiedButton title="Tooltip Text" showTooltip>
//                Hover Me
//             </UnifiedButton>
//          );
//          expect(container.querySelector('[title="Tooltip Text"]')).toBeInTheDocument();
//       });

//       test("does not show tooltip when showTooltip is false", () => {
//          const { container } = render(
//             <UnifiedButton title="Tooltip Text" showTooltip={false}>
//                No Tooltip
//             </UnifiedButton>
//          );
//          expect(container.querySelector('[title="Tooltip Text"]')).not.toBeInTheDocument();
//       });

//       test("renders MUI tooltip when useMuiTooltip is true", () => {
//          const { container } = render(<UnifiedButton icon={<Edit />} title="MUI Tooltip" useMuiTooltip />);
//          expect(container.querySelector(".MuiTooltip-root")).toBeInTheDocument();
//       });
//    });

//    // ===== RESPONSIVE TESTS =====
//    describe("Responsive Behavior", () => {
//       test("renders responsive button with both desktop and mobile versions", () => {
//          const { container } = render(
//             <UnifiedButton icon={<Edit />} title="Edit" responsive useMuiTooltip>
//                <Edit />
//             </UnifiedButton>
//          );

//          // Should have both hidden md:block and block md:hidden
//          expect(container.querySelector(".hidden.md\\:block")).toBeInTheDocument();
//          expect(container.querySelector(".block.md\\:hidden")).toBeInTheDocument();
//       });
//    });

//    // ===== FORM TESTS =====
//    describe("Form Integration", () => {
//       test("renders as submit button", () => {
//          render(<UnifiedButton type="submit">Submit</UnifiedButton>);
//          expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
//       });

//       test("renders as reset button", () => {
//          render(<UnifiedButton type="reset">Reset</UnifiedButton>);
//          expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
//       });
//    });

//    // ===== ACCESSIBILITY TESTS =====
//    describe("Accessibility", () => {
//       test("has proper aria-label", () => {
//          render(<UnifiedButton title="Accessible Button">Button</UnifiedButton>);
//          expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Accessible Button");
//       });

//       test("indicates disabled state to screen readers", () => {
//          render(<UnifiedButton disabled>Disabled</UnifiedButton>);
//          expect(screen.getByRole("button")).toHaveAttribute("disabled");
//       });
//    });
// });

// // ===== BACKWARD COMPATIBILITY TESTS =====
// describe("Backward Compatibility", () => {
//    describe("ButtonCompat (original Button.tsx)", () => {
//       test("renders with all original props", () => {
//          const handleClick = jest.fn();
//          render(
//             <ButtonCompat
//                variant="primary"
//                size="medium"
//                onClick={handleClick}
//                startIcon={<Add />}
//                loading={false}
//                disabled={false}
//                fullWidth={false}
//             >
//                Original Button
//             </ButtonCompat>
//          );

//          expect(screen.getByText("Original Button")).toBeInTheDocument();
//          fireEvent.click(screen.getByText("Original Button"));
//          expect(handleClick).toHaveBeenCalled();
//       });

//       test("uses native tooltip by default", () => {
//          const { container } = render(
//             <ButtonCompat title="Native Tooltip" showTooltip>
//                Button
//             </ButtonCompat>
//          );
//          expect(container.querySelector('[title="Native Tooltip"]')).toBeInTheDocument();
//       });
//    });

//    describe("ButtonIconCompat (original ButtonIcon.tsx)", () => {
//       test("renders icon button with all original props", () => {
//          const handleClick = jest.fn();
//          render(
//             <ButtonIconCompat
//                icon={<Delete />}
//                title="Delete"
//                onClick={handleClick}
//                showTooltip
//                color="primary"
//                size="small"
//             />
//          );

//          expect(screen.getByRole("button")).toBeInTheDocument();
//       });

//       test("renders responsive mode when children are provided", () => {
//          const { container } = render(
//             <ButtonIconCompat icon={<Edit />} title="Edit" showTooltip>
//                <Edit />
//             </ButtonIconCompat>
//          );

//          // Should render responsive version (desktop icon, mobile button)
//          expect(container.querySelector(".hidden.md\\:block")).toBeInTheDocument();
//          expect(container.querySelector(".block.md\\:hidden")).toBeInTheDocument();
//       });

//       test("uses MUI tooltip by default", () => {
//          const { container } = render(<ButtonIconCompat icon={<Edit />} title="MUI Tooltip" showTooltip />);

//          expect(container.querySelector(".MuiTooltip-root")).toBeInTheDocument();
//       });

//       test("respects visible prop", () => {
//          const { container } = render(<ButtonIconCompat icon={<Edit />} visible={false} />);

//          expect(container.firstChild).toBeNull();
//       });
//    });
// });

// // ===== INTEGRATION TESTS =====
// describe("Integration Scenarios", () => {
//    test("complex button with multiple features", () => {
//       const handleClick = jest.fn();
//       const { container } = render(
//          <UnifiedButton
//             variant="primary"
//             size="large"
//             startIcon={<Add />}
//             endIcon={<Delete />}
//             onClick={handleClick}
//             title="Complex Button"
//             showTooltip
//             fullWidth
//             data-testid="complex-btn"
//          >
//             Complex Button
//          </UnifiedButton>
//       );

//       expect(screen.getByTestId("complex-btn")).toBeInTheDocument();
//       expect(container.querySelector(".w-full")).toBeInTheDocument();
//       expect(container.querySelector(".h-12")).toBeInTheDocument();

//       fireEvent.click(screen.getByText("Complex Button"));
//       expect(handleClick).toHaveBeenCalled();
//    });

//    test("loading state with icons", () => {
//       render(
//          <UnifiedButton variant="primary" loading startIcon={<Add />} endIcon={<Delete />}>
//             Saving...
//          </UnifiedButton>
//       );

//       // Button should be disabled
//       expect(screen.getByRole("button")).toBeDisabled();

//       // Should show loading spinner
//       expect(document.querySelector(".MuiCircularProgress-root")).toBeInTheDocument();
//    });

//    test("responsive icon button with all features", () => {
//       const handleClick = jest.fn();
//       const { container } = render(
//          <UnifiedButton
//             icon={<Edit />}
//             title="Edit Item"
//             responsive
//             useMuiTooltip
//             onClick={handleClick}
//             disabled={false}
//          >
//             <Edit />
//          </UnifiedButton>
//       );

//       expect(container.querySelector(".hidden.md\\:block")).toBeInTheDocument();
//       expect(container.querySelector(".block.md\\:hidden")).toBeInTheDocument();
//    });
// });

// export default {};
