/*
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

// 초기 상태 정의
const initialState: LocationState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

// 위치 권한 요청 함수
const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS는 권한을 자동으로 처리할 수 있습니다
  }
};

// 비동기 위치 정보 가져오기 Thunk
export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (_, { rejectWithValue }) => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return rejectWithValue('Location permission denied');
    }

    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(rejectWithValue('Failed to get location'));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.loading = false;
      })
      .addCase(fetchLocation.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
*/
