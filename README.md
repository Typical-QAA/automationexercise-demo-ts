# Disclaimer

This project serves as a proof-of-concept test automation demonstration using Playwright + TypeScript for both UI and API testing of the AutomationExercise.com website. It focuses on demonstrating a structured approach to test automation rather than providing a production-ready solution.

# AutomationExercise Test Automation Framework

This repository contains a test automation framework built in TypeScript using [Playwright](https://playwright.dev/).
It is designed to test both the UI and API endpoints of the [AutomationExercise](https://automationexercise.com) website. The framework implements Page Object Model pattern, schema-first API validation, and factory-based test data generation with comprehensive reporting.
It is optimized for CI/CD workflows and supports flexible test execution strategies.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [CI/CD (GitHub Actions)](<#ci%2Fcd-(github-actions)>)
- [Framework Considerations](#framework-considerations)
- [Project Structure](#project-structure)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Playwright Installation and Project Setup

- Clone the repository:

```bash
git clone <repository_url>
```

- Navigate to the project directory:

```bash
cd automationexercise-demo-ts
```

- Install the required dependencies:

```bash
npm install
```

- Install Playwright browsers:

```bash
npx playwright install
```

- (Optional) Set up environment variables:

```bash
echo "PW_BASE_URL=https://automationexercise.com" > .env
```

For more detailed installation instructions and options of the Playwright, please refer to the [Official Playwright Installation Guide](https://playwright.dev/docs/intro#installing-playwright).

## Running the Tests

To run all tests with the default configuration:

```bash
npm run test
```

Additional test execution options:

```bash
# Run only API tests
npm run test:api

# Run only UI tests
npm run test:ui

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run critical tests only
npm run test:critical

# Run smoke tests only
npm run test:smoke

# Type checking
npm run typecheck
```

To view the HTML report:

```bash
npm run report
```

For CI environments:

```bash
# Run all tests (CI configuration)
npm run ci:test

# Run only API tests
npm run ci:test:api

# Run only UI tests
npm run ci:test:ui

# Run critical tests only
npm run ci:test:critical

# Run smoke tests only
npm run ci:test:smoke
```

## CI/CD (GitHub Actions)

The project includes GitHub Actions workflow configuration for continuous integration that executes both API and UI test suites. The workflow runs on push to main branch, pull requests, and on a cron schedule at 00:00 daily.

Allure reports are configured and deployed to GitHub Pages at <https://typical-qaa.github.io/automationexercise-demo-ts/>.

## Framework Considerations

This test framework is designed to handle the specifics of the AutomationExercise.com website. When you review or run these tests, please keep the following in mind:

- Cookie Consent: Automatic handling of cookie overlays for UI tests
- User Lifecycle: Dynamic user creation and cleanup for tests requiring authentication
- Data Isolation: Each test uses fresh test data to ensure independence
- Schema-First Validation: All API responses validated against JSON schemas before content validation
- Factory Pattern: Dynamic test data generation using @faker-js/faker
- Step-based Reporting: Detailed test execution tracking with test.step() wrapping
- Error-Safe Cleanup: Test user cleanup that doesn't mask actual test failures
- Cloudflare: Some rate limiting is possible, especially when increasing the number of workers
- API responses: All API endpoints return 200 status code, but the actual status is in response body
- No Validation or Sanitization: The API and UI perform almost zero validation on input data, such as credit card credentials, nor does it support data sanitization

## Project Structure

This project follows a logical and modular structure to keep the test automation framework organized and maintainable.

### File Structure

- `docs/`: Contains the test case documentation
- `data/`: Test data, validation schemas, constants, and factories
  - `constants/`: Test tags, enums, static data
  - `schemas/`: JSON schemas for API validation
  - `static-fixtures/`: Static test fixtures
  - `test-data-factories/`: Dynamic data generation
- `environment/`: Configuration files
- `fixtures/`: Playwright fixtures and custom matchers
- `pages/`: Page Object Model implementation
  - `components/`: Reusable UI components
- `routes/`: API client layer
- `support/`: Utility functions and helpers
- `tests/`: Test specifications
  - `api/`: API test specifications
  - `ui/`: UI test specifications
- `types/`: TypeScript type definitions

### Design Notes

- The framework implements a pattern similar to **Page Object Model (POM)** for both UI and API testing. All page logic is centralized in the `pages/` folder, and API request logic is in the `routes/` folder, making tests cleaner and more maintainable.
- **API Client Layer**: Base class `ApiBase` provides common HTTP methods with automatic status validation. Individual clients extend the base for specific endpoints using consistent `sendAndValidate()` pattern.
- **Page Object Model**: `BasePage` foundation includes common components (header, footer, cookie overlay) with automatic cookie consent handling via Playwright's `addLocatorHandler`.
- **Test Data Management**: Factory pattern for dynamic data generation, static fixtures for validation, JSON schemas for API response structure validation, and centralized utilities for data management.
- **Testing Infrastructure**: Custom Playwright fixtures inject API clients and test data, extended matchers for schema validation, automatic test user lifecycle management with error-safe cleanup.
- All operations are wrapped in `test.step()` for detailed reporting and enhanced debugging.
- You can find a number of `NOTE` and `TODO` comments scattered throughout the code. These highlight specific considerations, potential future improvements, or areas for further investigation.
