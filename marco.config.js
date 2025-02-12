module.exports = {
    android: {
      packageName: 'com.rntabsbenchmarks',
      outputPath: './reports/android/pixel/',
      dataDir: 'reports/android/pixel/log.json',
      port: '8080',
    },
    ios: {
      packageName: 'org.reactjs.native.example.RNTabsBenchmarks',
      outputPath: './reports/ios',
      dataDir: 'reports/ios/log.json',
      port: '8080',
    },
  };
