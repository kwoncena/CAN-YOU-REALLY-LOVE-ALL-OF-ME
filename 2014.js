document.addEventListener('DOMContentLoaded', function () {
    loadTracksForYear(2014); // Load tracks specifically for 2014
    loadIpAddressesForYear(2014); // Load IP addresses for 2014

    // Add event listener for the sonnet button click
    document.getElementById('poem-button').addEventListener('click', async () => {
        const ts = 2014; // Use the year 2014 as the timestamp reference
        const trackNames = await fetchSonnetTrackNames(ts);

        if (trackNames.length > 0) {
            const sonnet = generateStructuredSonnet(trackNames);
            displaySonnetWithTypingEffect(sonnet);
        } else {
            console.log('No track names found for the sonnet.');
        }
    });
});

window.addEventListener('load', function() {
    const selectedYear = 2014; // You can dynamically change this year as needed
    loadIpAddressesForYear(selectedYear);
});