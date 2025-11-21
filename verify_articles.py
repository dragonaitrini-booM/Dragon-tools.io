from playwright.sync_api import sync_playwright
import os

def verify_articles_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        # Load the articles page
        file_path = os.path.abspath("articles.html")
        page.goto(f"file://{file_path}")

        # Wait for the grid
        page.wait_for_selector(".architecture-grid")

        # Take a screenshot of the grid area
        grid = page.locator(".architecture-grid")
        grid.scroll_into_view_if_needed()

        # Take a screenshot
        page.screenshot(path="articles_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_articles_layout()
