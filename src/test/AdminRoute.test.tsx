/**
 * Smoke tests — AdminRoute
 * Run: npm test
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";

// ── Mock AuthContext ────────────────────────────────────────────────────────────
const mockUseAuth = vi.fn();

vi.mock("@/context/AuthContext", () => ({
    useAuth: () => mockUseAuth(),
}));

// ── Mock sonner toast ───────────────────────────────────────────────────────────
vi.mock("sonner", () => ({
    toast: { error: vi.fn(), success: vi.fn() },
}));

const ADMIN_EMAIL = "krishnamaurya2204@gmail.com";

// ── Helper ──────────────────────────────────────────────────────────────────────
const renderAdminRoute = () =>
    render(
        <MemoryRouter>
            <AdminRoute>
                <div data-testid="admin-content">Secret Admin Content</div>
            </AdminRoute>
        </MemoryRouter>,
    );

// ── Tests ───────────────────────────────────────────────────────────────────────
describe("AdminRoute", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows spinner while auth is loading", () => {
        mockUseAuth.mockReturnValue({ currentUser: null, loading: true });
        const { container } = renderAdminRoute();
        // Spinner div should be present
        expect(container.querySelector(".animate-spin")).toBeTruthy();
        expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
    });

    it("redirects to /login when user is not authenticated", () => {
        mockUseAuth.mockReturnValue({ currentUser: null, loading: false });
        renderAdminRoute();
        // Content should NOT be rendered (Navigate replaces it)
        expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
    });

    it("redirects non-admin user away from admin panel", () => {
        mockUseAuth.mockReturnValue({
            currentUser: { email: "notadmin@example.com" },
            loading: false,
        });
        renderAdminRoute();
        expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
    });

    it("renders children for the admin user", () => {
        mockUseAuth.mockReturnValue({
            currentUser: { email: ADMIN_EMAIL },
            loading: false,
        });
        renderAdminRoute();
        expect(screen.getByTestId("admin-content")).toBeInTheDocument();
    });
});
