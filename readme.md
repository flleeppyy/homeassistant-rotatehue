# Home Assistant - Rotate Light Hue

This script makes use of WebSocket to connect to [Home Assistant](https://www.home-assistant.io/)'s WebSocket API

I created this script because the `colorloop` effect on most RGB lights that HA shows, never works.

Also I don't feel like making a plugin for home assistant that does this (it probably exists but im too lazy to look)
so I just did it in Javascript. wheeeeee


You will need to configure the parameters yourself when you clone this repo.

All configuration options have been labeled for your convenience

## Todo

[] Get light's original hue so we can change the hue from there

[] Reverse hue changing

[] Change multiple lights at once

[] (Stupid idea) Create a web interface for this, with authorization and all that jazz (i told you it was stupid)

## Contributing

Contributions/PRs are always welcome. This is just a small script for those who want to 
