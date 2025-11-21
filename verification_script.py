from playwright.sync_api import sync_playwright
import os

def verify_compact_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local file
        file_path = os.path.abspath("infrastructure.html")
        page.goto(f"file://{file_path}")

        # Wait for the grid to load
        page.wait_for_selector(".architecture-grid")

        # Take a screenshot of the grid area
        # We can locate the element and screenshot it directly, or full page
        grid = page.locator(".architecture-grid")
        grid.scroll_into_view_if_needed()

        # Take a screenshot of the viewport to see the layout
        page.screenshot(path="verification_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_compact_dashboard()
