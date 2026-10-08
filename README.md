# Playwright 101 Assignment

Playwright test automation for TestMu AI certification. Runs 3 test scenarios on TestMu AI cloud in parallel across 2 browser/OS combos.

## Scenarios

1. Simple Form Demo - enter message, verify it displays
2. Drag \& Drop Sliders - move slider from 15 to 95
3. Input Form Submit - validate empty form error, fill \& submit, verify success msg

## Browser configs

* Windows 10 + Chrome (latest)
* macOS Catalina + Firefox (latest)

## How to run

npm install
export LT\_USERNAME="your\_username"
export LT\_ACCESS\_KEY="your\_access\_key"
npm test


On Windows use `set` instead of `export`, or just edit the `.env` file.

## Logs \& recording

Network logs, video, screenshots and console logs are all enabled in the capabilities config.

