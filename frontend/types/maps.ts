export interface GeoPoint {
  id: string;
  title: string;
  case_number: string;
  lat: number;
  lng: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  location_name: string;
  timestamp: string;
}
