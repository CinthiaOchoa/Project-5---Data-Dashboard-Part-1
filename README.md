# Web Development Project 5 - BrewDash

Submitted by: **Cinthia Ochoa Torre**

This web app: **BrewDash is a brewery dashboard that fetches brewery data from the Open Brewery DB API for the United States. It allows users to search breweries by name, filter by state, city, and brewery type, and paginate through results. It displays brewery details in a clean, user-friendly dashboard.**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 25 unique brewery items, one per row
  - The dashboard includes at least four features in each row (Name, Type, City, State)
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes summary counts of:
    - Number of states displayed
    - Number of breweries displayed
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters breweries by name in the list
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - Filters include dropdowns to restrict breweries by:
    - State
    - City (dependent on selected state)
    - Brewery type
  - Filters **correctly** filter breweries and update the dashboard dynamically

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously (name search + state + city + type)
- [x] Filters use different input types (text input, dropdown selectors)
- [ ] The user can enter specific bounds for filter values (not implemented)

The following **additional** features are implemented:

- [x] Pagination to display 25 breweries per page with Previous and Next buttons

## 🎥 Video Walkthrough

Here's a walkthrough of implemented user stories:

[Video Walkthrough](https://imgur.com/a/wFEKcrk)

GIF created with: **Imgur** (replace with what you used)


## Notes

During development, managing the multiple dependent filters (state → city) and pagination together was challenging to keep consistent. Also, ensuring the API data included enough unique entries for a smooth UX required testing with the right parameters.

## License

