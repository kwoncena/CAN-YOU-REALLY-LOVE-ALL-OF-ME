const jsonFiles = [
    '2014_2017.json',
    '2017_2018.json',
    '2018_2.json',
    '2018_3.json',
    '2018_2019.json',
    '2019_5.json',
    '2019_2020.json',
    '2020_7.json',
    '2020_2021.json',
    '2021_9.json',
    '2021_2022.json',
    '2022_2023.json',
    '2023_2024.json',
    '2024_13.json'
];

// Array to hold all artist names
let artistData = [];
//Array to hold all track names
let trackNames = [];
// Array to hold all IP addresses for shuffling
let ipAddresses = [];


// Function to load all JSON files and extract artist names
async function loadArtistData() {
    try {
        for (const file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();

            // Assuming data is an array of objects, extract artist names
            data.forEach(item => {
                if (item.master_metadata_album_artist_name) {
                    artistData.push(item.master_metadata_album_artist_name);
                }
            });
        }
        console.log("Artist data loaded:", artistData);
    } catch (error) {
        console.error("Error loading artist data:", error);
    }
}

// Function to generate and display two names
function generateNames() {
    const generateButton = document.getElementById('generate-names');

    if (artistData.length > 1) { // Ensure there are at least two names
        // Randomly select two different names from artistData
        const firstIndex = Math.floor(Math.random() * artistData.length);
        let secondIndex;
        do {
            secondIndex = Math.floor(Math.random() * artistData.length);
        } while (secondIndex === firstIndex); // Ensure second name is different

        const firstName = artistData[firstIndex];
        const lastName = artistData[secondIndex];

        // Replace the button text with the generated names
        generateButton.textContent = `${firstName} ${lastName}`; // Update button text
    } else {
        generateButton.textContent = "Not enough artist data available."; // Handle case with insufficient data
    }
}

// Ensure DOM content is fully loaded before executing
document.addEventListener('DOMContentLoaded', function () {
    // Load artist data when the page loads
    loadArtistData();

    // Add event listener for the button click
    document.getElementById("generate-names").addEventListener("click", function() {
        generateNames(); // Call the generateNames function

        // Save generated name to local storage
        const nameGeneratedButton = document.getElementById('generate-names');
        localStorage.setItem('generatedName', nameGeneratedButton.textContent);
    });

    // Load track names for each year when buttons are clicked
    const yearButtons = document.querySelectorAll('[id^="load-"]');
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.id.split('-')[1]; // Extract the year from button id
            loadTracksForYear(year);
            window.location.href = `${year}.html`; // Navigate to the specified page
        });
    });

    // Select All functionality
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.track-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Play Button functionality
    document.getElementById('play-button').addEventListener('click', function() {
        const selectedTracks = [];
        const checkboxes = document.querySelectorAll('.track-checkbox:checked');

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const trackName = checkbox.parentElement.nextElementSibling.textContent;
                // Here you should link your audio file to the trackName
                const audioFile = `${trackName}.mp3`; // Example audio file link
                selectedTracks.push(audioFile);
            }
        });

        // Play the selected audio files
        selectedTracks.forEach(file => {
            const audio = new Audio(file);
            audio.play(); // Play each selected audio
        });
    });

    // Load track names for the specified year when the page loads
    loadTracksForYear(2014); // Optional: Load a default year on initial load
});

// Function to load track names and Spotify URIs from JSON files for a specific year
async function loadTrackNames(year) {
    const trackData = []; // Array to hold track names and URIs

    try {
        for (const file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();

            data.forEach(item => {
                // Check if the timestamp matches the specified year
                const timestamp = new Date(item.ts); // Convert timestamp to Date object
                if (timestamp.getFullYear() === year && item.master_metadata_track_name && item.spotify_track_uri) {
                    // Push track name and URI to trackData array
                    trackData.push({
                        trackName: item.master_metadata_track_name,
                        trackUri: item.spotify_track_uri
                    });
                }
            });
        }
        populateTrackTable(trackData); // Pass the track data to populate the table
    } catch (error) {
        console.error(`Error loading track data for ${year}:`, error);
    }
}

// Function to populate the track table with checkboxes and track URIs
function populateTrackTable(trackData) {
    const trackList = document.getElementById('track-list');
    trackList.innerHTML = ''; // Clear the current table contents

    trackData.forEach(track => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="track-checkbox" data-spotify-uri="${track.trackUri}"></td>
            <td>${track.trackName}</td>
            <td><a href="https://open.spotify.com/track/${track.trackUri.split(':')[2]}" target="_blank">${track.trackUri}</a></td>
        `;
        trackList.appendChild(row);
    });
}

// Handle 'Select All' checkbox
document.getElementById('select-all').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.track-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

// Function to handle playing selected tracks
document.getElementById('play-button').addEventListener('click', function() {
    const iframeContainer = document.getElementById('iframe-container');
    iframeContainer.innerHTML = ''; // Clear previous iframes

    // Get all checked track checkboxes
    const selectedTracks = document.querySelectorAll('.track-checkbox:checked');
    
    // Loop through selected tracks and create Spotify embed iframes
    selectedTracks.forEach(track => {
        const spotifyUri = track.getAttribute('data-spotify-uri');
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/track/${spotifyUri.split(':')[2]}`;
        iframe.width = '100%';
        iframe.height = '152';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
        iframe.loading = 'lazy';
        
        // Append iframe to the iframe container
        iframeContainer.appendChild(iframe);
    });
});

// Function to load track names for a specific year
function loadTracksForYear(year) {
    loadTrackNames(year);
}

// Example: Load tracks for a specific year on button click
const yearButtons = document.querySelectorAll('[id^="load-"]');
yearButtons.forEach(button => {
    button.addEventListener('click', function() {
        const year = this.id.split('-')[1]; // Extract the year from button id
        loadTracksForYear(year);
        window.location.href = `${year}.html`; // Navigate to the specified page
    });
});

// Function to fetch track names for sonnet generation based on timestamp (ts)
async function fetchSonnetTrackNames(ts) {
    try {
        for (const file of jsonFiles) {
            const response = await fetch(file); // Ensure the path is correct
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            data.forEach(item => {
                // Extract tracks from specific timestamp
                const timestamp = new Date(item.ts);
                if (timestamp.getFullYear() === ts && item.master_metadata_track_name) {
                    trackNames.push(item.master_metadata_track_name);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching track names for sonnet:', error);
    }
    return trackNames;
}

// Function to generate a sonnet from track names
function generateStructuredSonnet(trackNames) {
    const sonnet = [];
    
    // Simulate the sonnet structure using a fixed set of 14 lines
    const sonnetStructure = [
        'A', 'B', 'A', 'B', // First quatrain (ABAB)
        'C', 'D', 'C', 'D', // Second quatrain (CDCD)
        'E', 'F', 'E', 'F', // Third quatrain (EFEF)
        'G', 'G'            // Final couplet (GG)
    ];

    // Randomly generate a line for each rhyme group
    for (let i = 0; i < 14; i++) {
        const randomTrack = trackNames[Math.floor(Math.random() * trackNames.length)];
        
        // Simulate 10 syllables by limiting length or padding
        const line = simulateSyllables(randomTrack, 10); 
        
        sonnet.push({ line, rhyme: sonnetStructure[i] }); // Store line with its rhyme scheme
    }

    return sonnet; // Return structured sonnet
}

// Function to simulate 10 syllables by truncating or repeating track names
function simulateSyllables(text, syllableCount) {
    const words = text.split(' ');

    // Try to limit the line to a set number of words, simulating syllables
    let syllableSimulation = words.slice(0, Math.min(syllableCount, words.length)).join(' ');

    // If the line is too short, pad it with repeated words to simulate syllables
    while (syllableSimulation.split(' ').length < syllableCount) {
        syllableSimulation += ' ' + words[0]; // Repeat the first word for padding
    }

    return syllableSimulation;
}

// Function to display the sonnet with rhyme scheme
function displaySonnetWithTypingEffect(sonnet) {
    const outputDiv = document.getElementById('poem-output');
    outputDiv.innerHTML = ''; // Clear previous output

    let lineIndex = 0;
    const typingSpeed = 50; // Adjust typing speed as needed

    function typeLine() {
        if (lineIndex < sonnet.length) {
            const { line, rhyme } = sonnet[lineIndex];
            outputDiv.innerHTML += `${line} (${rhyme})<br><br>`; // Display each line with its rhyme scheme
            lineIndex++;
            setTimeout(typeLine, typingSpeed);
        }
    }

    typeLine(); // Start typing the first line
}
// Add event listener for the sonnet button click
document.getElementById('poem-button').addEventListener('click', async () => {
    const ts = 2014; // Replace this with the actual timestamp or year you want to use
    const trackNames = await fetchSonnetTrackNames(ts);

    if (trackNames.length > 0) {
        const sonnet = generateStructuredSonnet(trackNames);
        displaySonnetWithTypingEffect(sonnet);
    } else {
        console.log('No track names found for the sonnet.');
    }
});

// Function to load IP addresses from JSON files for a specific year
async function loadIPAddresses(year) {
    ipAddresses = []; // Clear array to load new IP addresses
    try {
        for (const file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();

            data.forEach(item => {
                // Check if the timestamp matches the specified year
                const timestamp = new Date(item.ts); // Convert timestamp to Date object
                if (timestamp.getFullYear() === year && item.ip_addr_decrypted) {
                    ipAddresses.push(item.ip_addr_decrypted); // Allow duplicates by using array
                }
            });
        }
    } catch (error) {
        console.error(`Error loading IP addresses for ${year}:`, error);
    }
}

// Function to shuffle and display a random IP address with Matrix-style animation
function shuffleIP() {
    const ipList = document.getElementById('ip-list');
    ipList.innerHTML = ''; // Clear the current table contents

    if (ipAddresses.length > 0) {
        // Randomly select an IP address
        const randomIP = ipAddresses[Math.floor(Math.random() * ipAddresses.length)];

        // Create a row with matrix animation
        const row = document.createElement('tr');
        row.classList.add('matrix-animation'); // Add matrix-style animation class
        row.innerHTML = `<td>${randomIP}</td>`;
        ipList.appendChild(row);

        // Remove the row after the animation ends (match the animation duration)
        setTimeout(() => {
            row.remove();
        }, 5000); // Animation duration: 5 seconds
    } else {
        console.log('No IP addresses available for shuffling.');
    }
}

// Function to search the entered IP address on ipinfo.io
function searchIPOnWeb() {
    const searchInput = document.getElementById('search-ip').value.trim();
    
    if (searchInput) {
        // Redirect the user to ipinfo.io with the entered IP address
        const url = `https://ipinfo.io/${searchInput}`;
        window.open(url, '_blank'); // Open the IP search result in a new tab
    } else {
        alert('Please enter an IP address to search.');
    }
}

// Add event listener for the shuffle button click
document.getElementById('shuffle-button').addEventListener('click', shuffleIP);

// Add event listener for the search IP button click
document.getElementById('search-ip-button').addEventListener('click', searchIPOnWeb);

// Example usage: Load IP addresses for a specific year when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadIPAddresses(2014);// Replace 2014 with the year you want to load
});

// Open ipinfo.io in a new tab
document.getElementById('open-ipinfo').addEventListener('click', function() {
    window.open('https://ipinfo.io/', '_blank');
});