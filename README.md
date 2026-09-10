# Modern Erroneous Website Testing Assignment

This project follows:

1. Develop an erroneous website.
4. Test a page of it showing the passed and the failed test cases.

Pages:

- `index.html` - modern home page.
- `courses.html` - course listing page.
- `error-demo.html` - intentionally erroneous website page.
- `tests.html` - automated test report with passed and failed cases.
- `contact.html` - project notes page.

Intentional errors included:

- Broken Apply Now target on `error-demo.html`.
- Broken course preview image path.
- Displayed course price does not match stored course price.
- Cart total calculation adds an incorrect extra fee.
- University `.edu` email validation is incorrectly rejected.

Run locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/tests.html`.
