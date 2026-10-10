//your JS code here. If required.
function expect(actual) {
  return {
    toExist() {
      if (actual === null || actual === undefined) {
        throw new Error(`expected value to exist but got ${JSON.stringify(actual)}`);
      }
    },
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(
          `expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`
        );
      }
    },
    toBeType(type) {
      if (typeof actual !== type) {
        throw new Error(
          `expected ${JSON.stringify(actual)} to be of type ${type} but got ${typeof actual}`
        );
      }
    },
  };
}

function it(testCaseName, func) {
  console.log(`beginning test case ${testCaseName}`);
  try {
    func();
  } catch (e) {
    const err = new Error("test case failed");
    err.testCaseName = testCaseName;
    err.errorMessage = e && e.message !== undefined ? e.message : String(e);
    throw err;
  }
  console.log(`successfully completed test case ${testCaseName}`);
}

function describe(testSuiteName, func) {
  console.log(`beginning test suite ${testSuiteName}`);
  try {
    func();
  } catch (e) {
    console.error(
      `failed running test suite ${testSuiteName} on test case ${e.testCaseName} with error message ${e.errorMessage}`
    );
    return;
  }
  console.log(`successfully completed test suite ${testSuiteName}`);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { describe, it, expect };
}