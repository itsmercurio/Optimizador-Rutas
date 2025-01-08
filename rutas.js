// Function to calculate the distance between two geographic coordinates (Haversine formula) compi
function calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers compi
    const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
    const deltaLon = (point2.lon - point1.lon) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers compi
}

// Function to optimize truck routes compi
function optimizeRoutes(containers, truckCapacity, operationsCenter, truckCount) {
    // Step 1: Filter containers with a fill level >= 50% compi
    let priorityContainers = containers.filter(c => c.level >= 50);

    // Step 2: Sort containers by fill level (descending order) compi
    priorityContainers.sort((a, b) => b.level - a.level);

    let routes = []; // List to store truck routes compi

    // Step 3: Initialize all trucks compi
    let trucks = Array.from({ length: truckCount }, () => ({ route: [], currentLoad: 0, totalDistance: 0, currentLocation: operationsCenter }));

    // Step 4: Assign containers to trucks and optimize their routes compi
    for (let truck of trucks) {
        while (priorityContainers.length > 0) {
            // Find the nearest container for the current truck compi
            let nearestContainerIndex = -1;
            let shortestDistance = Infinity;

            for (let i = 0; i < priorityContainers.length; i++) {
                let container = priorityContainers[i];
                let containerWeight = (container.level / 100) * container.capacity;

                if (truck.currentLoad + containerWeight <= truckCapacity) {
                    let distance = calculateDistance(truck.currentLocation, container);
                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        nearestContainerIndex = i;
                    }
                }
            }

            // If no suitable container is found, move to the next truck compi
            if (nearestContainerIndex === -1) {
                break;
            }

            // Assign the nearest container to the current truck compi
            let container = priorityContainers.splice(nearestContainerIndex, 1)[0];
            let containerWeight = (container.level / 100) * container.capacity;
            truck.route.push(container.id);
            truck.currentLoad += containerWeight;
            truck.totalDistance += shortestDistance;
            truck.currentLocation = container; // Update truck's current location compi
        }

        // Reset truck's location to the operations center after completing the route compi
        if (truck.route.length > 0) {
            truck.totalDistance += calculateDistance(truck.currentLocation, operationsCenter);
            truck.currentLocation = operationsCenter;
        }
    }

    // Collect all non-empty routes compi
    trucks.forEach(truck => {
        if (truck.route.length > 0) {
            routes.push(truck);
        }
    });

    return routes;
}

// Input data compi
const containers = [
    { id: 1, lat: 19.432608, lon: -99.133209, level: 80, capacity: 500 },
    { id: 2, lat: 19.434105, lon: -99.145646, level: 60, capacity: 400 },
    { id: 3, lat: 19.440234, lon: -99.127659, level: 20, capacity: 600 },
    { id: 4, lat: 19.427005, lon: -99.138674, level: 90, capacity: 300 },
    { id: 5, lat: 19.436551, lon: -99.150426, level: 40, capacity: 350 }
];

const truckCapacity = 1000;
const operationsCenter = { lat: 19.432608, lon: -99.133209 };
const truckCount = 3; // Define the number of trucks available compi

// Execute the function to optimize routes compi
const routes = optimizeRoutes(containers, truckCapacity, operationsCenter, truckCount);

// Display the generated routes compi
routes.forEach((route, index) => {
    console.log(`Truck ${index + 1}:`);
    console.log(`  Collected containers: ${route.route}`);
    console.log(`  Total load: ${route.currentLoad} kg`);
    console.log(`  Total distance traveled: ${route.totalDistance.toFixed(2)} km`);
    console.log('---');
});
