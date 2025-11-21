
import os
from playwright.sync_api import sync_playwright, expect

def verify_compact_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to opportunities.html
        file_path = os.path.abspath("opportunities.html")
        page.goto(f"file://{file_path}")

        # Wait for the grid to be visible
        grid = page.locator(".architecture-grid")
        expect(grid).to_be_visible()

        # Verify styles (check a card's computed style or just the grid)
        # But visual verification via screenshot is best.

        # Take a screenshot of the grid area
        page.locator("#core").screenshot(path="verification/opportunities_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_compact_dashboard()
