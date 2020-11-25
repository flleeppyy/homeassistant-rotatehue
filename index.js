
// Just as a reminder, hue is a value of 0 to 360.

/*************** CONFIGURATION ***************/

// The address of which your Home Assistant instance is running on. Make sure it is in IP:PORT format
const address = '192.168.1.24:8123'

// Access token generated from home assistant. I suggest you create a Long-Lived Access Token
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIzN2ViZjc1OGRkMzQ0MjFmOGIzNmQzYzJiZGI5YmExNCIsImlhdCI6MTYwNjI4OTkwNCwiZXhwIjoxOTIxNjQ5OTA0fQ.RkTxSq28KgCNj4Mo2O6_KAVWOVJtCT2vf1BHM7Ta3RI"

// The rate of which the hue changes at in milliseconds
const interval = 200

// The amount to change the hue by at the interval
const incrementBy = 0.35

// The saturation... self explanatory.
const saturation = 100;

// Brightness of the light 1-100. Set to undefined to leave it at its previous state
const brightness = 5

// How many times you want the hue to be rotated. Set to -1 for no limit
const maxHueRotations = -1


/************* END CONFIGURATION *************/


const WebSocket = require('ws');
const ws = new WebSocket(`ws://${address}/api/websocket`);

ws.on('message', (data) => {
  data = JSON.parse(data)
  
  if (data.type === 'auth_required') {
    console.info('Authenticating...')
    return ws.send(JSON.stringify({type: 'auth', access_token: accessToken}))
  }

  if (data.type === 'auth_invalid') {
    console.error('Bad authentication token')
    console.log(data)
    process.exit(1)
  }
  if (data.type === 'auth_ok') {
    console.info('Done authenticating!')
    let i = 0;
    let id = 0;
    let hueRotations = 0;
    const intv = setInterval(() => {
      i = i + incrementBy;
      i = parseFloat(i.toFixed(2));
      if (i > 360) {
        i = 0;
        hueRotations++
        if(maxHueRotations > -1) {
          if (hueRotations > maxHueRotations) {
            clearInterval(intv)
          }
        }
      }
      id++
      ws.send(JSON.stringify({
        id: id,
        type: 'call_service',
        domain: 'light',
        service: 'turn_on',
        service_data: {
          entity_id: "light.micah_rgb",
          hs_color: [i, saturation],
          brightness: brightness
        }
      }))
      printInfo()
    }, interval)
    function printInfo(){
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`ID: ${id} | Hue: ${i} | Hue rotations: ${hueRotations}`);
  }
  }
})

