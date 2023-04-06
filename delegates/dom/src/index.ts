import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import { AuthenticationRequest, AuthenticationResponse } from "./proto/authentication_pb";
import { UpdateRuntimeOptionsRequest, UpdateRuntimeOptionsResponse, RuntimeOptions } from "./proto/customisation_pb";
import { AuthenticationPluginClient } from "./proto/authentication_grpc_pb";
import { InstanceCustomisationPluginClient } from "./proto/customisation_grpc_pb";
import { NativeDOMDelegate } from "./NativeDOMDelegate";
import * as grpc from '@grpc/grpc-js';
import * as libspsfrontend from 'backend-dom-components';

// set the logger level
//libspsfrontend.Logger.SetLoggerVerbosity(10);

// Determine whether a signalling server WebSocket URL was specified at compile-time or if we need to compute it at runtime
declare var WEBSOCKET_URL: string;
let signallingServerAddress = WEBSOCKET_URL;
if (signallingServerAddress == '') {
    // define our signallingServerProtocol to be used based on whether
    // or not we're accessing our frontend via a tls
    let signallingServerProtocol = 'ws:';
    if (location.protocol === 'https:') {
        signallingServerProtocol = 'wss:';
    }

    // build the websocket endpoint based on the protocol used to load the frontend
    signallingServerAddress = signallingServerProtocol + '//' + window.location.hostname

    // if the frontend for an application is served from a base-level domain
    // it has a trailing slash, so we need to account for this when appending the 'ws' for the websocket ingress
    if (window.location.pathname == "/") {
        signallingServerAddress += '/ws'
    } else {
        signallingServerAddress += (window.location.pathname + '/ws')
    }
}

const epicRegex = /\/([a-zA-Z0-9_-]+)\/ws$/;
const app = signallingServerAddress.match(epicRegex)[1];

// prep the player div element 
let playerElement = document.getElementById("player") as HTMLDivElement;

// Create a config object
let config = CreateConfig(signallingServerAddress, playerElement);
config.enableSpsAutoConnect = true;
config.controlScheme = libspsfrontend.ControlSchemeType.HoveringMouse;
config.suppressBrowserKeys = true;
config.afkTimeout = 600;
config.fakeMouseWithTouches = false;

// Create a Native DOM delegate instance that implements the Delegate interface class
let delegate = new NativeDOMDelegate(config);

// Create and return a new webRtcPlayerController instance 
let RTCPlayer = create(config, delegate);

//const service = new AuthenticationPluginClient('localhost:3000', grpc.credentials.createInsecure());
//request.token = "s3lQci5K5JW1MUJZn2wgcwKFPPmlnTXe";

//const plugin = new AuthenticationPluginClientImpl();


// create takes in a delegate interface type which our NativeDomDelegate class implements
function create(config: libspsfrontend.Config, delegate: libspsfrontend.IDelegate) {
    return new libspsfrontend.webRtcPlayerController(config, delegate);
}

/*
document.addEventListener("touchmove", (event: TouchEvent) => {
    event.preventDefault();
}, { passive: false });
*/

// Create a config object instance 
function CreateConfig(signalingAddress: string, playerElement: HTMLDivElement) {
    let config = new libspsfrontend.Config(signalingAddress, playerElement);
    return config;
}

// On a touch device we will need special ways to show the on-screen keyboard.
if ('ontouchstart' in document.documentElement) {
    createOnScreenKeyboardHelpers(playerElement);
}

function createOnScreenKeyboardHelpers(htmlElement: HTMLDivElement) {
    let hiddenInput: HTMLInputElement = libspsfrontend.DataChannelController.hiddenInput;
    let editTextButton: HTMLButtonElement = libspsfrontend.DataChannelController.editTextButton;
    if (document.getElementById('hiddenInput') === null) {
        hiddenInput = document.createElement('input');
        hiddenInput.id = 'hiddenInput';
        hiddenInput.maxLength = 0;
        htmlElement.appendChild(hiddenInput);
    }

    if (document.getElementById('editTextButton') === null) {
        editTextButton = document.createElement('button');
        editTextButton.id = 'editTextButton';
        editTextButton.innerHTML = 'edit text';
        htmlElement.appendChild(editTextButton);

        // Hide the 'edit text' button.
        editTextButton.classList.add('hiddenState');

        editTextButton.addEventListener('click', function() {
            console.log("Hidden keyboard clicked");
	    // Show the on-screen keyboard.
            hiddenInput.focus();
        });
    }
}
