// import { MapPin, Building, Store, TreePine, School, Hammer, Music, Car } from 'lucide-react';
// import { LocationType } from './NoiseVisualizer';

// export const locationTypes: LocationType[] = [
//   {
//     id: 'street',
//     name: 'Street / Crossing',
//     icon: <Car className="w-5 h-5" />,
//     typicalNoise: '60-85 dB',
//     typicalMin: 60,
//     typicalMax: 85,
//     description: 'Traffic and pedestrian activity',
//   },
//   {
//     id: 'market',
//     name: 'Market / Festival',
//     icon: <Store className="w-5 h-5" />,
//     typicalNoise: '70-95 dB',
//     typicalMin: 70,
//     typicalMax: 95,
//     description: 'Crowds and vendors',
//   },
//   {
//     id: 'construction',
//     name: 'Construction Zone',
//     icon: <Hammer className="w-5 h-5" />,
//     typicalNoise: '80-110 dB',
//     typicalMin: 80,
//     typicalMax: 110,
//     description: 'Heavy machinery and tools',
//   },
//   {
//     id: 'residential',
//     name: 'Residential Area',
//     icon: <Building className="w-5 h-5" />,
//     typicalNoise: '40-60 dB',
//     typicalMin: 40,
//     typicalMax: 60,
//     description: 'Homes and apartments',
//   },
//   {
//     id: 'school',
//     name: 'School Surroundings',
//     icon: <School className="w-5 h-5" />,
//     typicalNoise: '50-75 dB',
//     typicalMin: 50,
//     typicalMax: 75,
//     description: 'Children and activities',
//   },
//   {
//     id: 'park',
//     name: 'Park / Open Space',
//     icon: <TreePine className="w-5 h-5" />,
//     typicalNoise: '35-55 dB',
//     typicalMin: 35,
//     typicalMax: 55,
//     description: 'Nature and recreation',
//   },
//   {
//     id: 'venue',
//     name: 'Event Venue',
//     icon: <Music className="w-5 h-5" />,
//     typicalNoise: '85-115 dB',
//     typicalMin: 85,
//     typicalMax: 115,
//     description: 'Concerts and gatherings',
//   },
//   {
//     id: 'other',
//     name: 'Other Location',
//     icon: <MapPin className="w-5 h-5" />,
//     typicalNoise: 'Varies',
//     typicalMin: 0,
//     typicalMax: 120,
//     description: 'Custom location type',
//   },
// ];

// export const getLocationById = (id: string): LocationType | undefined => {
//   return locationTypes.find(loc => loc.id === id);
// };

// interface LocationSelectorProps {
//   selected: string;
//   onSelect: (id: string) => void;
// }

// const LocationSelector = ({ selected, onSelect }: LocationSelectorProps) => {
//   return (
//     <div className="space-y-3">
//       <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//         <MapPin className="w-4 h-4" />
//         Select Your Location Type
//       </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//         {locationTypes.map((location) => (
//           <button
//             key={location.id}
//             onClick={() => onSelect(location.id)}
//             className={`
//               group p-3 rounded-xl text-left transition-all duration-200
//               ${selected === location.id 
//                 ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
//                 : 'glass hover:bg-secondary'
//               }
//             `}
//           >
//             <div className={`mb-2 ${selected === location.id ? 'text-primary-foreground' : 'text-primary'}`}>
//               {location.icon}
//             </div>
//             <p className="text-xs font-medium truncate">{location.name}</p>
//             <p className={`text-[10px] mt-0.5 ${selected === location.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
//               {location.typicalNoise}
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LocationSelector;
