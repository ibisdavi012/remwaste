
## Describing Redesign Approach
* Color palette is related to to service offeredf by the project.

* The header contains back/continue buttons and the current step of the multistep booking process. Additionally, the previous and next step are shown.

* The new layout splits horizintally the main content area. On the left the user can scroll to see the options, while on the right side, they see the current selected element. 

* On Top of the list there is a combobox which allows the user to sort the list by size and price.

* The warning related to images is displayed as a notification instead of using space of the current view.

* It has a loader while making Requests to the API.

* It handle errors if API can't be accessed.

* It hs a cache of images for better performance, and reduce calls to the API.


## For the mobile version
* The back button is reduced to a cirlce with an arrow.

* The previous and next steps are removed.

* The sorting combobox takes 100% width.

* There is an sticky footer to display the current selected item.

## Improvements over original design

* Colors related to the service
* Allows user to sort and access more quickly the skip he needs.
* The current selected item is clearly visible on the right of the screen.
* Additionl performance on image, error handling, and loading were introduced.