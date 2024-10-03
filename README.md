# TRACKIFY
 
# Overview
# Trackify is a data-driven project by Cara Kwon that delves into the exploration of Spotify streaming history over the past 10 years. By extracting various elements such as track titles, artist names, number of plays, and IP addresses associated with each listening session, this project seeks to create a unique and interactive way to visualize and analyze personal music consumption data.

# Features
- Track and Artist Extraction: Pulls and displays track titles and artist names from Spotify listening history.
- Top Track Per Year Extraction: Displays track titles from most played to least in each year.
- IP Address Mapping: Extracts and displays the IP addresses of each listening session, offering insights into the geographical journey of listening habits.
- Sonnet Generator: Uses the extracted track names to generate a randomized sonnet each time the "A Poem From Me To You" button is pressed.


# Project Structure
The project is organized across multiple HTML pages, each representing a specific year of streaming data. Key components include:
- Button-based Navigation: Buttons allow users to switch between years, each pulling specific streaming data for that period.
- Poem Generator: A button on each page generates a sonnet using track names from the respective year.
- IP Address Display: A table listing IP addresses associated with each streaming session, with shuffle and search functionality.

# Technologies Used
- *Frontend**: HTML, CSS, JavaScript
- *Backend**: JSON files storing the extracted Spotify data
- *APIs**: Utilizes the Google Maps API for IP address visualization and the IP Geolocation API for additional metadata about each IP address.

### How to Use
1. Select Year: Choose a year from 2014 to 2024 to explore the associated Spotify streaming data.
2. Generate a Poem: Click the “Sonnetify” button to create a sonnet from track names for the selected year.
3. View Tracks & Artists**: Browse through the list of tracks and artists, or select specific tracks to link them to Spotify.
4. Explore IP Addresses: View IP addresses from each streaming session in the scrollable table, shuffle through them, or search for them on the web.

