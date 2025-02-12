const {execSync} = require('child_process');
const platform = (globalThis as any).process.argv[2];
const packageName = (globalThis as any).process.argv[3];
const iterationCount = (globalThis as any).process.argv[4];
const deviceId = (globalThis as any).process.argv[5];

const stdio = {
  stdio: 'inherit',
};

validateInput();
runMaestroScript();

function validateInput() {
  let shouldExit = false;
  if (!platform) {
    console.log(
      'Platform (android / ios) must be specified to run automation script.',
    );
    shouldExit = true;
  } else if (!packageName) {
    console.log('App id must be specified to run automation script.');
    shouldExit = true;
  } else if (!iterationCount) {
    console.log('Iterations must be specified to run automation script.');
    shouldExit = true;
  }

  if (shouldExit) {
    (globalThis as any).process.exit(1);
  }
}

function runMaestroScript() {

  // Skip this test on iOS due to intermittent failures in Maestro assertions.
  // Maestro occasionally fails to locate certain elements on iOS because of
  // increased view hierarchy complexity, leading to inconsistent test results.

  // Until this issue is resolved, we can manually execute tests.
  if (platform === 'ios') {
    console.warn('Skipping test on iOS due to intermittent failures in Maestro assertions ', 'Until this issue is resolved, we can manually execute tests.');
    return;
  }

  if (!deviceId) {
    execSync(
      `maestro test -e APP_ID=${packageName} -e ITERATIONS=${iterationCount} ../automation/test.yaml`,
      stdio,
    );
  } else {
    execSync(
      `maestro --device ${deviceId} test -e APP_ID=${packageName} -e ITERATIONS=${iterationCount} ../automation/test.yaml`,
      stdio,
    );
  }
}