export enum PerformanceMarkers {
  OPEN_NATIVE_TABS = 'Native_Tab_Load_Start',
  OPEN_JS_TABS = 'JS_Tab_Load_Start',
  NATIVE_TABS_LOAD_TIME = 'Native_Tab_Load_End',
  JS_TABS_LOAD_TIME = 'JS_Tab_Load_End',
  NATIVE_ALBUMS_TAB_CLICKED = 'Native_Tab_Album_Pressed',
  NATIVE_ALBUMS_TAB_LOADED = 'Native_Tab_Album_Loaded',
  JS_ALBUMS_TAB_CLICKED = 'JS_Tab_Album_Pressed',
  JS_ALBUMS_TAB_LOADED = 'JS_Tab_Album_Loaded',
}

export const isFabricEnabled = (global as any)?.nativeFabricUIManager != null;
