---
title: Admin Page Documentation
description: An example for the new @nuxt/content and @nuxt/components modules
---

<div align="center">
<h1>Admin Page Documentation</h1>
    <img src="/asssets/logo2.png" width=300 alt="logo"/>
<!-- <h3>Welcome to Admin Page Documentation!</h3> -->
<h6>Following documentation will guide you to understand Admin Page code structure and component.</h6>
</div>

---

<!-- RegisterForm.vue -->

# `RegisterForm` Component

The `RegisterForm` component is designed to create a simple signup form using Vue 3 and Vuetify. It includes fields for a user's name, email address, and password, along with a signup button.

## Component Usage

::registerForm
---
---
::

## Description

### Name

`RegisterForm`

## Script Setup

### Imports

- **`ref`**: Imported from Vue for creating reactive references.

### References

- **`checkbox`**: A reactive reference initialized to `true`.

## Template Structure

### Main Template

- **Row**: Uses `v-row` to create a flexbox container for the form elements.
- **Column**: Uses `v-col` to create responsive columns for each form element.
- **Label**: Uses `v-label` to display labels for the form fields.
- **Text Field**: Uses `v-text-field` to create input fields for name, email, and password.
- **Button**: Uses `v-btn` to create a signup button.

### Template Elements

- **Name Field**:
  - **Label**: "Name"
  - **Input**: `v-text-field` with variant "outlined" and color "primary".

- **Email Field**:
  - **Label**: "Email Address"
  - **Input**: `v-text-field` with variant "outlined", type "email", and color "primary".

- **Password Field**:
  - **Label**: "Password"
  - **Input**: `v-text-field` with variant "outlined", type "password", and color "primary".

- **Signup Button**:
  - **Button**: `v-btn` with color "primary", size "large", block styling, and flat design. Navigates to the home page on click.

---

<!-- SeatsIoDrawer.vue -->

# `SeatsIoDrawer` Component

The `SeatsIoDrawer` component is designed to manage seating charts and event configurations using Seats.io. It integrates with `axios` for HTTP requests, `Element Plus` for UI elements, and `SeatsioDesigner` for seating chart design.

## Component Usage

::seatsIoDrawer
---
---
::

## Description

### Name

`SeatsIoDrawer`

### Components

- **`SeatsioDesigner`**: Component for designing seating charts from Seats.io.

### Emits

- **`can-submit`**: Indicates if submission is allowed.
- **`pricing`**: Provides the pricing data.
- **`seatio-eventkey`**: The event key from Seats.io.
- **`seatio-chartkey`**: The chart key from Seats.io.
- **`capacity`**: The capacity of the event.

## Data Properties

| Property            | Type              | Description                                           |
|---------------------|-------------------|-------------------------------------------------------|
| `dialogOpen`        | `boolean`         | Controls the dialog state.                            |
| `formdata`          | `object`          | Stores form data.                                     |
| `key`               | `string`          | Username from `userconfig`.                           |
| `pricing`           | `array`           | List of pricing categories and their prices.          |
| `eventCategories`   | `array`           | List of event categories.                             |
| `seatsioChartKey`   | `string \| null`  | The key for the seating chart.                        |
| `seatsioEventsKey`  | `string \| null`  | The key for the event.                                |
| `isSeated`          | `boolean`         | Indicates if seating is enabled.                      |
| `capacity`          | `number`          | The capacity of the event.                            |
| `placeholder`       | `object`          | Holds temporary category and price data.              |
| `placeholder.category` | `string \| null` | The category placeholder.                        |
| `placeholder.price`    | `number \| null` | The price placeholder.                            |
| `categoryList`      | `array`           | List of predefined categories.                        |

### `categoryList` Items

Each category in `categoryList` is an object with the following properties:

| Property | Type     | Description               |
|----------|----------|---------------------------|
| `id`     | `number` | The ID of the category.   |
| `name`   | `string` | The name of the category. |

## Methods

### `onChartCreated(key)`

Handles the event when a chart is created.

#### Parameters

- **`key`**: `string` - The key of the created chart.

### `enableSeat()`

Toggles the seating mode and manages the dialog state.

### `addItem()`

Adds a new pricing item to the list.

### `saveSeatingMechanism()`

Saves the seating mechanism and handles API interactions with Seats.io.

## Template Structure

### Main Template

- **Container**: Uses `v-container` to wrap the main structure.
- **Row**: Uses `v-row` and `v-col` for layout management.
- **Switch**: A `v-switch` to enable or disable the seating mechanism.
- **Button**: A `v-btn` to open the chart if `seatsioChartKey` and `isSeated` are true.

### Pricing Section

- **List Item**: Uses `v-list-item` to display each pricing item.
- **Text Fields**: Uses `v-text-field` for inputting capacity, category, and price.
- **Button**: A `v-btn` to add a new pricing item.

### Event Configuration

- **Text**: A `v-card-text` to display instructions for entering pricing.
- **Row**: Uses `v-row` and `v-col` to layout pricing input fields.

### Dialog for Seating Mechanism

- **Dialog**: A `v-dialog` to configure the seating mechanism.
- **Card**: Uses `v-card`, `v-card-title`, and `v-card-actions` for the dialog content and actions.
- **SeatsioDesigner**: The component for designing the seating chart.

---

<!-- Timeline.vue -->

# `Timeline` Component

The `Timeline` component is designed to display a horizontal timeline using Vuetify. Each item in the timeline can be clicked to change its color, indicating its selection status.

## Component Usage

::timeline
---
status: 0
---
::

## Description

### Name

`TimelineComponent`

### Props

- **`status`**: `Number` - The status index to set the selected timeline item.

## Data Properties

| Property        | Type     | Description                             |
|-----------------|----------|-----------------------------------------|
| `selectedIndex` | `number` | The currently selected timeline item index. |
| `items`         | `array`  | List of timeline items.                 |

### `items` Elements

Each item in the `items` array is an object with the following properties:

| Property | Type     | Description                       |
|----------|----------|-----------------------------------|
| `name`   | `string` | The name of the timeline item.    |
| `color`  | `string` | The color of the timeline dot.    |
| `icon`   | `string` | The icon of the timeline dot.     |

## Methods

### `setDotColor(index)`

Sets the color of the selected timeline dot and emits the `selected-index` event.

#### Parameters

- **`index`**: `number` - The index of the selected timeline item.

## Watchers

### `status`

Watches the `status` prop and updates the selected timeline item when the status changes.

#### Parameters

- **`newVal`**: `number` - The new status value.
- **`oldVal`**: `number` - The old status value.

## Template Structure

### Main Template

- **Timeline**: Uses `v-timeline` to create a horizontal timeline.
- **Timeline Item**: Uses `v-timeline-item` to create clickable timeline items.

### Template Elements

- **Timeline**:
  - **Props**:
    - `direction`: Set to "horizontal".
    - `line-inset`: Set to "12".
    - `dense`: Enables dense mode for the timeline.

- **Timeline Item**:
  - **Props**:
    - `:key`: Binds to the index of the item.
    - `:dot-color`: Binds to the color of the item.
    - `:icon`: Binds to the icon of the item.
  - **Events**:
    - `@click`: Calls `setDotColor` with the index of the item.

---

<!-- UserForm.vue -->

# `UserForm` Component

The `UserForm` component is designed to create or edit a user with various fields such as Student ID, Name, Password, Email, Avatar, and User Role. It integrates with `axios` for HTTP requests, `Element Plus` for loading indicators and notifications, and Vuetify for form elements.

## Component Usage

::userForm
---
isEdit: false
editUser: {}
---
::

## Props

### `isEdit`
- **Type**: Boolean
- **Description**: Indicates if the form is in edit mode. It determines if existing user data should be loaded and edited.

### `editUser`
- **Type**: Object
- **Description**: Contains the data of the user to be edited. It is used to pre-fill the form fields when the component is in edit mode.

## Data Properties

| Property        | Type      | Description                                  |
|-----------------|-----------|----------------------------------------------|
| `name`          | `string`  | The name of the user.                        |
| `sid`           | `string`  | The student ID of the user.                  |
| `avatar`        | `string`  | The base64 encoded avatar image of the user. |
| `select`        | `string`  | Placeholder for select input.                |
| `image`         | `string`  | Placeholder for the image file.              |
| `password`      | `string`  | The password of the user.                    |
| `isAdmin`       | `number`  | Indicates if the user is an admin (1) or not (0). |
| `email`         | `string`  | The email address of the user.               |
| `show1`         | `boolean` | Toggles the visibility of the password.      |
| `rules`         | `object`  | Validation rules for the form fields.        |

## Methods

### `clear`
- **Description**: Clears the form fields.

### `showLoading`
- **Description**: Displays a loading indicator.

### `hideLoading`
- **Description**: Hides the loading indicator.

### `onFileChanged`
- **Description**: Handles the change event for the file input and updates the form's avatar image.
- **Parameters**: 
  - `event`: The file change event.

### `submitForm`
- **Description**: Submits the form data to the server. If in edit mode, it updates the existing user; otherwise, it creates a new user.

## Watchers

### `editUser`
- **Description**: Watches the `editUser` prop and updates the form fields when the prop changes.
- **Parameters**:
  - `newVal`: The new value of the `editUser` prop.
  - `oldVal`: The old value of the `editUser` prop.

### `isEdit`
- **Description**: Watches the `isEdit` prop and updates the form fields when the prop changes.
- **Parameters**:
  - `newVal`: The new value of the `isEdit` prop.
  - `oldVal`: The old value of the `isEdit` prop.

---

<!-- UserTableComponent.vue -->

# `UserTableComponent` Component

The `UserTableComponent` is designed to display a table of users with options to edit and delete each user. It integrates with Vuetify for UI elements and Axios for HTTP requests.

## Component Usage

::userTableComponent
---
---
::

## Description

### Name

`UserTableComponent`

### Components

- **`UserForm`**: Component for editing or creating a new user.
- **`Newuser`**: Page component for creating a new user.

### Props

This component does not receive any props.

## Data Properties

| Property      | Type      | Description                             |
|---------------|-----------|-----------------------------------------|
| `headers`     | `array`   | Table headers configuration.            |
| `users`       | `array`   | List of users.                          |
| `isEdit`      | `boolean` | Indicates if the form is in edit mode.   |
| `editedItem`  | `object`  | The user item being edited.             |

### `headers` Elements

Each item in the `headers` array is an object with the following properties:

| Property | Type     | Description                       |
|----------|----------|-----------------------------------|
| `title`  | `string` | The title of the table column.    |
| `key`    | `string` | The key of the table column.      |
| `align`  | `string` | The alignment of the table column. |

## Methods

### `editItem(item)`

Sets the selected item for editing.

#### Parameters

- **`item`**: `object` - The user item to be edited.

### `deleteItem(item)`

Deletes the selected user item.

#### Parameters

- **`item`**: `object` - The user item to be deleted.

## Lifecycle Hooks

### `mounted`

Fetches the list of users when the component is mounted.

## Template Structure

### Main Template

- **Container**: Uses `v-container` to wrap the table.
- **Data Table**: Uses `v-data-table` to display the list of users.
- **Toolbar**: Uses `v-toolbar` to display the table title.
- **Edit/Delete Buttons**: Uses `v-btn` and `v-icon` for edit and delete actions.
- **Avatar**: Uses `v-avatar` and `v-img` to display user avatars.
- **New User Button**: Uses `v-btn` to navigate to the new user creation page.
- **User Form**: Displays the `UserForm` component if `isEdit` is `true`.

### Template Elements

- **Data Table**:
  - **Props**:
    - `headers`: Binds to `headers` data property.
    - `items`: Binds to `users` data property.
    - `item-key`: Set to `"name"`.
    - `items-per-page`: Set to `15`.

- **Toolbar**:
  - **Props**:
    - `color`: Set to `"cyan-lighten-1"`.

- **Edit/Delete Buttons**:
  - **Events**:
    - `@click`: Calls `editItem` or `deleteItem` with the selected item.

- **Avatar**:
  - **Props**:
    - `:src`: Binds to `item.avatar`.

---

<!-- VenueForm.vue -->

# `VenueForm` Component

The `VenueForm` component is designed to create or edit a venue with various fields such as Name, Description, Coordinates, and Thumbnail. It integrates with `axios` for HTTP requests and `Element Plus` for loading indicators and notifications.

## Component Usage

::venueForm
---
isEdit: false
venueData: {}
---
::

## Description

### Name

`VenueForm`

### Components

- **`LocationGetter`**: Component for selecting coordinates on a map.

### Props

- **`isEdit`**: `Boolean` - Indicates if the form is in edit mode. It determines if existing venue data should be loaded and edited.
- **`venueData`**: `Object` - Contains the data of the venue to be edited. It is used to pre-fill the form fields when the component is in edit mode.

## Data Properties

| Property        | Type      | Description                                     |
|-----------------|-----------|-------------------------------------------------|
| `name`          | `string`  | The name of the venue.                          |
| `description`   | `string`  | The description of the venue.                   |
| `image`         | `string`  | The base64 encoded thumbnail image of the venue.|
| `xcoord`        | `number`  | The X coordinate of the venue.                  |
| `ycoord`        | `number`  | The Y coordinate of the venue.                  |

## Methods

### `handleCoordinates({ lng, lat })`

Handles the coordinates selected from the map.

#### Parameters

- **`lng`**: `number` - The longitude of the selected location.
- **`lat`**: `number` - The latitude of the selected location.

### `onFileChanged(event)`

Handles the change event for the file input and updates the form's thumbnail image.

#### Parameters

- **`event`**: `Event` - The file change event.

### `submitVenue()`

Submits the form data to the server. If in edit mode, it updates the existing venue; otherwise, it creates a new venue.

## Lifecycle Hooks

### `mounted`

Fetches the venue data and pre-fills the form if the component is in edit mode.

## Template Structure

### Main Template

- **Container**: Uses `v-container` to wrap the form.
- **Form**: Contains various form fields and buttons for user input and actions.
- **Row/Column**: Uses `v-row` and `v-col` for layout management of coordinate inputs.

### Template Elements

- **Text Field for Name**:
  - **Props**:
    - `v-model`: Binds to `name`.
    - `label`: "Name".
    - `required`: Field is required.

- **Text Field for Description**:
  - **Props**:
    - `v-model`: Binds to `description`.
    - `label`: "Description".
    - `required`: Field is required.

- **Text Fields for Coordinates**:
  - **Props**:
    - `v-model`: Binds to `xcoord` and `ycoord`.
    - `type`: Set to "number".

- **File Input for Thumbnail**:
  - **Events**:
    - `@change`: Calls `onFileChanged`.

- **Location Getter**:
  - **Events**:
    - `@coordinates-selected`: Calls `handleCoordinates`.

- **Submit Button**:
  - **Events**:
    - `@click`: Calls `submitVenue`.

- **Clear Button**: Resets the form fields (currently without any handler).

---

<!-- VenueSelector.vue -->

# `VenueSelector` Component

The `VenueSelector` component is designed to allow users to select a venue from a list of available venues. It integrates with `axios` for HTTP requests and `Element Plus` for loading indicators and notifications.

## Component Usage

::venueSelector
---
receivedVenueId: ""
---
::

## Description

### Name

`VenueSelector`

### Props

- **`receivedVenueId`**: `String` - The ID of the venue received from the parent component. It is used to pre-select the venue if it exists.

### Emits

- **`venue-emit`**: Emits the ID of the selected venue.

## Data Properties

| Property           | Type      | Description                               |
|--------------------|-----------|-------------------------------------------|
| `venueList`        | `array`   | List of venues fetched from the server.   |
| `venueName`        | `string`  | The name of the selected venue.           |
| `venueDialogOpen`  | `boolean` | Controls the visibility of the venue selection dialog. |

## Methods

### `insertVenue()`

Fetches the list of venues from the server and updates `venueList`.

### `selectVenue(venue)`

Selects a venue, updates the `venueName`, and emits the `venue-emit` event.

#### Parameters

- **`venue`**: `object` - The selected venue object.

## Template Structure

### Main Template

- **Text Field**: Uses `v-text-field` to display the selected venue name.
- **Dialog**: Uses `v-dialog` to display the venue selection dialog.
- **Card**: Uses `v-card` to display venue details within the dialog.
- **Image**: Uses `v-img` to display the venue's thumbnail image.
- **Card Actions**: Uses `v-card-actions` for dialog action buttons.

### Template Elements

- **Text Field for Venue**:
  - **Props**:
    - `v-model`: Binds to `venueName`.
    - `label`: "Venue".
    - `required`: Field is required.
  - **Events**:
    - `@click`: Opens the venue selection dialog and fetches the venues.

- **Dialog for Venue Selection**:
  - **Props**:
    - `v-model`: Binds to `venueDialogOpen`.

- **Card for Venue Details**:
  - **Props**:
    - `@click`: Calls `selectVenue` with the selected venue.

- **Image for Venue Thumbnail**:
  - **Props**:
    - `:src`: Binds to `venue.thumbnail`.

- **Dialog Actions**:
  - **Events**:
    - `@click`: Calls `selectVenue` or closes the dialog.

