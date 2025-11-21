
import os
from playwright.sync_api import sync_playwright

def verify_cards():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        # Use file path directly
        cwd = os.getcwd()
        url = f"file://{cwd}/opportunities.html"
        print(f"Navigating to: {url}")

        try:
            page.goto(url)

            # Wait for grid to be visible
            page.wait_for_selector('.architecture-grid')

            # Take a screenshot of the whole page to see layout
            output_path = "opportunities_verification.png"
            page.screenshot(path=output_path, full_page=True)
            print(f"Screenshot saved to {output_path}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_cards()
