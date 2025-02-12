# RN BottomTab Benchmarks

This repository benchmarks [**Native Bottom Tabs**](https://okwasniewski.github.io/react-native-bottom-tabs/) against [**JS Bottom Tabs**](https://reactnavigation.org/docs/bottom-tab-navigator/) based on performance metrics such as load time and tab switch time. The **Native Bottom Tab** library, developed by [okwasniewski](https://github.com/okwasniewski), serves as the foundation for the native tab implementation. All benchmarking is conducted using a **Native Stack** implementation.

## Benchmark Metrics 📊

- **Load Time**: Time taken to load the initial screen when a bottom tab is opened.
- **Tab Switch Time**: Time taken to switch between tabs and display the next screen.

## About the Benchmarking Process 📝

We are using **marco** tool to mark events and utilizing CLI tools provided by **marco** to visualize performance data.

## Load Time ⌛

### 1. Capture the Initial Event
- The event is triggered when a button is clicked to open a bottom tab.
- The `timestamp` is extracted from the `Pressable.onPress` event object.
- The `timestamp` and a marker name are passed to the native module `PerformanceTracker.track()` to log the start time.

### 2. Track Screen Rendering
- The load time completes when the initial screen content is fully painted and visible.
- We wrapped the **Article Screen** with **PerformanceTracker API** from the **marco** library.
- This accurately captures the **onDraw** event, indicating when the screen is fully rendered.

## Tab Switch Time 🔄

### 1. Capture the Tab Press Event
- The event is captured when a tab is pressed.
- The `timestamp` is obtained from listeners attached to the `tabPress` event at the screen level.
- This `timestamp`, along with a marker name, is sent to `PerformanceTracker.track()` to log the start of the tab switch action.

### 2. Track New Screen Rendering
- The tab switch time completes when the new screen content is fully rendered and visible.
- We wrapped the **Album Screen** with **PerformanceTracker API** from the **marco** library.
- This accurately captures the **onDraw** event, marking the end of the tab switch process and the benchmark.

## How to Run the Benchmarks 🛠️

### Prerequisites

1. [React Native Environment Setup](https://reactnative.dev/docs/next/environment-setup)
2. [Maestro Setup](https://maestro.mobile.dev/)  
   To check if Maestro is installed on your system, run the command:
   ```bash
   maestro --version
   ```

### Setup

```bash
git clone git@github.com:shubhaamgupta11/rn-tabs-benchmarks.git
cd rn-tabs-benchmarks
yarn install
```

### Create Release Build

```bash
yarn android --mode=Release
```

### Run the Benchmarks

```bash
yarn get:numbers:android <iteration_count>
```

This will run the iteration count as specified in `src/scripts/automation/test.yaml`.

### Generate and Visualize Report

A config file `marco.config.js` contains default paths to store reports. These paths can be customized as needed.

#### Generate Report

```bash
yarn marco generate --platform android
```

#### Visualize Report

```bash
yarn marco visualize --platform android
```

## Results 📈

### Device Details (Android)
- **Device:** Low-end Android real device
- **Model:** Vivo Y15
- **OS:** Android 12
- **RAM:** 3 GB

### Report Location

The benchmarking report is stored inside:
```
reports/android/pixel/log.json
```

To visualize the report again, run:
```bash
yarn marco visualize --platform android
```

> **Note:** Ensure the correct `dataDir` path is set in `marco.config.js` for proper visualization.

---

This benchmarking framework provides insights into the efficiency of Native and JS Bottom Tabs, helping developers optimize their React Native applications for better performance.

