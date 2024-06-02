---
title: Admin page example
description: An example for the new @nuxt/content and @nuxt/components modules
---

# This site is a quick overview on our Components in the admin page, its functions and what do they do. I won't go into details, but hope you get a brief insight on what they do, happy coding! :)

## Date Picker

::DatePicker
---
receivedDate: 2024-6-2
---
::

### Props
`receivedDate`:
Type: Date
Description: This prop receives a date value from the parent component. When a new value is received, it updates the dateValue in the component.
Emits
value-emit:
Description: This custom event is emitted when the date selection is updated. It passes the selected date value to the parent component.
Methods
watch
Description: This method watches for changes in the receivedDate prop. When a new value is received, it updates the dateValue in the component.
Parameters:
newVal: The new value of the receivedDate prop.
oldVal: The old value of the receivedDate prop.
Behavior:
If the newVal is different from the oldVal, it updates the dateValue in the component.
