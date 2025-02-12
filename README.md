# RN BottomTab Benchmarks

This repository benchmarks [**Native Bottom Tabs**](https://github.com/callstackincubator/react-native-bottom-tabs) against [**JS Bottom Tabs**](https://reactnavigation.org/docs/bottom-tab-navigator/) based on performance metrics such as load time and tab switch time. The **Native Bottom Tab** library, developed by [okwasniewski](https://github.com/okwasniewski), serves as the foundation for the native tab implementation. All benchmarking is conducted using a **Native Stack** implementation.

## Benchmarking Metrics 📊
- **Load Time**: Time taken to load the initial screen when a bottom tab is opened.
- **Tab Switch Time**: Time taken to switch between tabs and display the next screen.

## About the Benchmarking Process 📝

We are using the [**Marco**](https://marco.dreamsportslabs.com/) tool to mark events and CLI tools provided by Marco to visualize the results.

> ### These benchmarks were conducted on different Android real devices:
- **Vivo Y15** (Low-end device)
    - OS: Android 12
    - RAM: 3 GB
- **OnePlus Nord 2T** (High-end device)
    - OS: Android 14
    - RAM: 8 GB

## Load Time ⌛

1. **Capture the Initial Event:**
   - The event is triggered when a button is clicked to open a bottom tab. (refer: [Native]((https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/TabsBenchmark.tsx#L23)) & [JS](https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/TabsBenchmark.tsx#L31))
   - The `timestamp` is extracted from the `Pressable.onPress` event object.
   - The `timestamp` and a marker name are passed to the native module `PerformanceTracker.track()` to log the start time.

2. **Track Screen Rendering:**
   - The load time completes when the initial screen content is fully painted and visible.
   - We wrapped the **Article Screen** with the **PerformanceTracker** API from the **Marco** library.
   - This accurately captures the **onDraw** event, indicating when the screen is fully rendered.
   - Code [reference]((https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/Screens/Article.tsx#L51))

### Load Time Comparison (Native vs JS)

| Device        | Native Bottom Tabs | JS Bottom Tabs |
|--------------|------------------|------------------|
| Android VIVO | **357 ms** | **278 ms** |
| Android OnePlus | **98 ms** | **122 ms** |

<img src="./assets/benchmarks/vivo/native_tab_load.png" alt="Native Load Time Vivo" width="600"/>

<img src="./assets/benchmarks/vivo/js_tab_load.png" alt="JS Load Time Vivo" width="600"/>

<details ><summary>Click to View Oneplus Load Time Reports</summary>
<img src="./assets/benchmarks/oneplus/native_tab_load.png" alt="Native Load Time Vivo" width="600"/>

<img src="./assets/benchmarks/oneplus/js_tab_load.png" alt="JS Load Time Vivo" width="600"/>
</details>

## Tab Switch Time 🔄

1. **Capture the Tab Press Event:**
   - The event is captured when a tab is pressed. (refer: [JS](https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/JSBottomTab.tsx#L30) & [Native](https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/NativeBottomTab.tsx#L31))
   - The `timestamp` is obtained from listeners attached to the `tabPress` event at the screen level.
   - This `timestamp`, along with a marker name, is sent to `PerformanceTracker.track()` to log the start of the tab switch action.

2. **Track New Screen Rendering:**
   - The tab switch time completes when the new screen content is fully rendered and visible.
   - We wrapped the **Album Screen** with the **PerformanceTracker** API from the **Marco** library.
   - This accurately captures the **onDraw** event, marking the end of the tab switch process and the benchmark.
   - Code [refernce](https://github.com/shubhaamgupta11/rn-tabs-benchmarks/blob/7577609fb6eeaa78768a651e968b07ca2bc0d24f/src/Screens/Albums.tsx#L57)

### Tab Switch Time Comparison (Native vs JS)

| Device        | Native Bottom Tabs | JS Bottom Tabs |
|--------------|------------------|------------------|
| Android VIVO | **418 ms** | **375 ms** |
| Android Oneplus | **92 ms** | **107 ms** |

<img src="./assets/benchmarks/vivo/native_tab_switch.png" alt="Native Tab Switch Time Vivo" width="600"/>

<img src="./assets/benchmarks/vivo/js_tab_switch.png" alt="JS Tab Switch Time Vivo" width="600"/>

<details > <summary>Click to View Oneplus Tab Switch Reports</summary>
<img src="./assets/benchmarks/oneplus/native_tab_switch.png" alt="Native Tab Switch Time Vivo" width="600"/>

<img src="./assets/benchmarks/oneplus/js_tab_switch.png" alt="JS Tab Switch Time Vivo" width="600"/> </details>

> The Marco snapshots are stored inside: `reports/android/<device>/log.json`.


<details><summary>How to Run the Benchmarks 🛠️</summary>

### Prerequisites

1. [React Native Environment Setup](https://reactnative.dev/docs/next/environment-setup)
2. [Maestro Setup](https://maestro.mobile.dev/)
   - To check if Maestro is installed on your system, run command:
   ```sh
   maestro --version
   ```

### Setup

```sh
git clone git@github.com:shubhaamgupta11/rn-tabs-benchmarks.git
cd rn-tabs-benchmarks
yarn install
```

### Create Release Build

```sh
yarn android --mode=Release
```

### Run the Benchmarks

```sh
yarn get:numbers:android <iteration_count>
```

This will run the test as described in `src/scripts/automation/test.yaml`.

### Generate and Visualize Report

A configuration file, `marco.config.js`, contains default paths to store reports. We can configure them based on our needs.

```sh
yarn marco generate --platform android
```

```sh
yarn marco visualize --platform android
```

This will open up a dashboard where we can select events to analyse data.

> **Ensure the correct `dataDir` path is set in `marco.config.js`**.

</details>


Happy Benchmarking!!

