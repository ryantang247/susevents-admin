import axios from "axios";
import userconfig from "@/userconfig.json";

export function fetchVenues() {
    return new Promise((resolve, reject) => {
        axios.get('https://secourse2024-675d60a0d98b.herokuapp.com/api/getAllVenues')
            .then(response => {
                console.log("Venues fetch successfully")
                // console.log(response.data)
                const venueList = response.data.map(item => item); // Copy the array
                console.log(venueList);
                resolve(venueList); // Resolve the Promise with the fetched data
            })
            .catch(error => {
                console.log("Error fetching Venues:", error);
                reject(error); // Reject the Promise with the error
            });
    });
}

