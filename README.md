# Waste Collection Route Optimization

This repository contains a JavaScript script to optimize waste collection routes for a fleet of trucks. It ensures efficient assignment of containers to trucks based on fill levels, geographic proximity, and truck capacity.

## Features

1. **Distance Calculation**:
   - Implements the Haversine formula to compute the shortest distance between geographic coordinates.

2. **Priority-Based Filtering**:
   - Filters containers with a fill level greater than or equal to 50%.
   - Sorts containers by fill level in descending order to prioritize high-capacity pickups.

3. **Multi-Truck Optimization**:
   - Distributes containers among multiple trucks while respecting their capacity limits.

4. **Dynamic Routing**:
   - Assigns containers to the nearest truck to minimize total distance traveled.

## Input Data

The script requires:

- A list of containers with:
  - Unique `id`
  - Geographic coordinates (`lat`, `lon`)
  - Current fill level (`level`)
  - Capacity (`capacity` in kilograms)

- Truck specifications:
  - Maximum load capacity (`truckCapacity`)
  - Number of trucks (`truckCount`)

- The operations center's geographic location.

### Example Input
```javascript
const containers = [
    { id: 1, lat: 19.432608, lon: -99.133209, level: 80, capacity: 500 },
    { id: 2, lat: 19.434105, lon: -99.145646, level: 60, capacity: 400 },
    { id: 3, lat: 19.440234, lon: -99.127659, level: 20, capacity: 600 },
    { id: 4, lat: 19.427005, lon: -99.138674, level: 90, capacity: 300 },
    { id: 5, lat: 19.436551, lon: -99.150426, level: 40, capacity: 350 }
];

const truckCapacity = 1000;
const operationsCenter = { lat: 19.432608, lon: -99.133209 };
const truckCount = 3;
```

## How It Works

1. **Filter and Sort**:
   - Containers with a fill level less than 50% are excluded.
   - Remaining containers are sorted by fill level (highest first).

2. **Truck Initialization**:
   - Initializes each truck with an empty route and resets its position to the operations center.

3. **Route Optimization**:
   - Iteratively assigns containers to the nearest truck until either all containers are assigned or a truck reaches its capacity.
   - Once a truck is filled, it returns to the operations center.

4. **Output**:
   - Routes for all trucks, including:
     - Containers collected.
     - Total load.
     - Total distance traveled.

## Example Output

```plaintext
Truck 1:
  Collected containers: [1, 4]
  Total load: 650 kg
  Total distance traveled: 5.34 km
---
Truck 2:
  Collected containers: [2]
  Total load: 240 kg
  Total distance traveled: 3.12 km
---
Truck 3:
  Collected containers: []
  Total load: 0 kg
  Total distance traveled: 0.00 km
---
```

## Usage

1. Clone this repository.
2. Edit the input data in the script to match your requirements.
3. Run the script in a Node.js environment.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Contributions are welcome! Feel free to submit a pull request or open an issue for enhancements or bug fixes.

