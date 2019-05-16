# How to use the Faerqur's interface for EmlaLock

## Session

In EmlaLock, create a session with visible counters and, ideally, make initial duration and minimal duration the same amount.

## [Countdown](https://faerqur.github.io/EmlaLock-Controls/v1/Countdown.html)

### [Settings](https://faerqur.github.io/EmlaLock-Controls/v1/Countdown-Settings.html)

The first section contains:

* **User ID** -- login into the EmlaLock go to [the settings](https://emlalock.com/#/settings), choose the API tab and copy your User ID from there.
* **Name** (optional) -- provide the caption text under your profile picture.

The second section contains:

* **Primary color** -- it's mainly used for the circular bars of the countdown.
* **Secondary color** -- this is the color for text.
* **Background overlay color** -- it's layed over the background image.
* **Background image URL** -- provide the url to a specific image which will be used as the background.

The last section contains:

* **Set** -- sets the current settings into the Local Storage of your device.
* **Reset** -- resets the settings to the default values.
* **Template** -- opens a new tab with this page with current settings as a template for sharing.
* **Countdown Export** -- opens a new tab with the actual Countdown page for sharing.

## [Keyholder](https://faerqur.github.io/EmlaLock-Controls/v1/Keyholder.html)

### [Settings](https://faerqur.github.io/EmlaLock-Controls/v1/Keyholder-Settings.html)


The first section contains:

* **User ID** -- login into the EmlaLock go to [the settings](https://emlalock.com/#/settings), choose the API tab and copy your User ID from there.
* **API Key** -- login into the EmlaLock go to [the settings](https://emlalock.com/#/settings), choose the API tab and copy your API Key from there.

The second sections contains (optional):

* **Device ID** -- the ID for a `particle.io` device.
* **Access Token** -- the access token for a `particle.io` device.

The third section contains:

* **Primary color** -- it's mainly used for the circular bars of the countdown.
* **Secondary color** -- this is the color for text.
* **Background overlay color** -- it's layed over the background image.
* **Background image URL** -- provide the url to a specific image which will be used as the background.

The last section contains:

* **Set** -- sets the current settings into the Local Storage of your device.
* **Reset** -- resets the settings to the default values.
* **Template** -- opens a new tab with this page with current settings as a template for sharing.
* **Keyholder Export** -- opens a new tab with the actual Keyholder page for sharing.

## Misc

You can turn the export links (**Countdown Export** & **Keyholder Export**) to links which save the settings into the Local Storage by appending the word `set` at the end of the URL.

The Countdown refreshes the amount every minute, i.e. if your keyholder adds time the Countdown will reflect that in a minute.
