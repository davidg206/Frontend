import './assets/css/player.css';
import playButton from './assets/images/Play.png';
import { EventEmitter } from "events";
import * as libspsfrontend from 'backend-dom-components'
import * as fs from 'fs';
import https from 'https';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare var WEBSOCKET_URL: string;

/**
 * Class for the base overlay structure 
 */
export class OverlayBase implements libspsfrontend.IOverlay {
	protected rootElement: HTMLDivElement;
	protected rootDiv: HTMLDivElement;
	public textElement: HTMLDivElement;

	/**
	 * Construct an overlay 
	 * @param rootDiv the root element this overlay will be inserted into 
	 * @param rootElement the root element that is the overlay
	 */
	protected constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement) {
		this.rootDiv = rootDiv;
		this.rootElement = rootElement;
		this.textElement = textElement;
		this.rootElement.appendChild(this.textElement);
		this.hide();
		this.rootDiv.appendChild(this.rootElement);
	}

	/**
	 * Show the overlay 
	 */
	public show(): void {
		this.rootElement.classList.remove("hiddenState");
	}

	/**
	 * Hide the overlay
	 */
	public hide(): void {
		this.rootElement.classList.add("hiddenState");
	}
}

/**
 * Class for the base action overlay structure 
 */
export class ActionOverlayBase extends OverlayBase implements libspsfrontend.IActionOverlay {
	eventEmitter: EventEmitter;
	contentElementSpanId: string;

	/**
	 * Construct an action overlay 
	 * @param rootDiv the root element this overlay will be inserted into 
	 * @param rootElement the root element that is the overlay
	 * @param contentElement an element that contains text for the action overlay 
	 */
	public constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, contentElement: HTMLDivElement, contentElementSpanId?: string) {
		super(rootDiv, rootElement, contentElement);
		this.eventEmitter = new EventEmitter();
		this.contentElementSpanId = contentElementSpanId;
	}

	/**
	 * Update the text overlays inner text 
	 * @param text the update text to be inserted into the overlay 
	 */
	public update(text: string): void {
		if ((text != null || text != undefined) && (this.contentElementSpanId != null || this.contentElementSpanId != undefined)) {
			document.getElementById(this.contentElementSpanId).innerHTML = text;
		}
	}

	/**
	 * Set a method as an event emitter callback 
	 * @param callBack the method that is to be called when the event is emitted 
	 */
	onAction(callBack: (...args: any[]) => void) {
		this.eventEmitter.on("action", callBack);
	}

	/**
	 * Activate an event that is attached to the event emitter 
	 */
	activate() {
		this.eventEmitter.emit("action");
	}

}

/**
 * Class for the afk overlay base 
 */
export class AfkOverlayBase extends ActionOverlayBase implements libspsfrontend.IAfkOverlay {
	private countDownSpanElementId: string;

	/**
	 * Construct an Afk overlay 
	 * @param rootDiv the root element this overlay will be inserted into 
	 * @param rootElement the root element that is the overlay
	 * @param textElement an element that contains text for the action overlay  
	 * @param countDownSpanElementId the id of the span that holds the countdown element 
	 */
	public constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement, countDownSpanElementId: string) {
		super(rootDiv, rootElement, textElement);
		this.countDownSpanElementId = countDownSpanElementId;
	}

	/**
	 * Update the count down spans number for the overlay 
	 * @param countdown the count down number to be inserted into the span for updating
	 */
	public updateCountdown(countdown: number): void {
		document.getElementById(this.countDownSpanElementId).innerHTML = countdown.toString();
	}

}

/**
 * Class for the text overlay base 
 */
export class TextOverlayBase extends OverlayBase implements libspsfrontend.ITextOverlay {

	/**
	 * Construct a text overlay 
	 * @param rootDiv the root element this overlay will be inserted into 
	 * @param rootElement the root element that is the overlay
	 * @param textElement an element that contains text for the action overlay  
	 */
	public constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement) {
		super(rootDiv, rootElement, textElement);
	}

	/**
	 * Update the text overlays inner text 
	 * @param text the update text to be inserted into the overlay 
	 */
	public update(text: string): void {
		if (text != null || text != undefined) {
			this.textElement.innerHTML = text;
		}
	}
}

/**
 * Class for the VideoQp indicator
 */
export class VideoQpIndicator {

	videoEncoderAvgQP: number = -1;

	// the icon itself
	qualityStatus: SVGElement; // = document.getElementById("connectionStrength");

	// the text that displays under the icon
	qualityText: HTMLSpanElement; // = document.getElementById("qualityText");

	// svg paths
	outer: any; //= document.getElementById("outer");
	middle: any; //= document.getElementById("middle");
	inner: any; // = document.getElementById("inner");
	dot: any; // = document.getElementById("dot");

	// non html elements 
	statsText: string = "";
	color: string = "";

	// qp colours 
	readonly orangeQP = 26;
	readonly redQP = 35;

	/**
	 * construct a VideoQpIndicator object
	 * @param qualityStatusId the html id of the qualityStatus element
	 * @param qualityTextId the html id of the qualityText element
	 * @param outerId the html id of the outer element
	 * @param middleId the html id of the middle element
	 * @param innerId the html id of the inner element
	 * @param dotId the html id of the dot element
	 */
	constructor(qualityStatusId: string, qualityTextId: string, outerId: string, middleId: string, innerId: string, dotId: string) {
		this.qualityStatus = document.getElementById(qualityStatusId) as any;
		this.qualityText = document.getElementById(qualityTextId) as any;
		this.outer = document.getElementById(outerId) as any;
		this.middle = document.getElementById(middleId) as any;
		this.inner = document.getElementById(innerId) as any;
		this.dot = document.getElementById(dotId) as any;
	}

	/**
	 * used to set the speed of the status light
	 * @param speed - Set the speed of the blink if the status light higher the speed the faster the blink
	 */
	blinkVideoQualityStatus(speed: number) {
		let iteration = speed;
		let opacity = 1;
		let tickID = setInterval(() => {
			opacity -= 0.1;
			this.qualityText.style.opacity = String(Math.abs((opacity - 0.5) * 2));
			if (opacity <= 0.1) {
				if (--iteration == 0) {
					clearInterval(tickID);
				} else {
					opacity = 1;
				}
			}
		}, 100 / speed);
	}

	/**
	  * updates the QP tooltip by converting the Video Encoder QP to a colour light
	  * @param QP - The video encoder QP number needed to find the average
	  */
	updateQpTooltip(QP: number) {
		this.videoEncoderAvgQP = QP;
		if (QP > this.redQP) {
			this.color = "red";
			this.blinkVideoQualityStatus(2);
			this.statsText = `<div style="color: ${this.color}">Poor encoding quality</div>`;
			this.outer.style.fill = "#3c3b40";
			this.middle.style.fill = "#3c3b40";
			this.inner.style.fill = this.color;
			this.dot.style.fill = this.color;
		} else if (QP > this.orangeQP) {
			this.color = "orange";
			this.blinkVideoQualityStatus(1);
			this.statsText = `<div style="color: ${this.color}">Blocky encoding quality</div>`;
			this.outer.style.fill = "#3c3b40";
			this.middle.style.fill = this.color;
			this.inner.style.fill = this.color;
			this.dot.style.fill = this.color;
		} else if (QP <= 0) {
			this.color = "#b0b0b0";
			this.outer.style.fill = "#3c3b40";
			this.middle.style.fill = "#3c3b40";
			this.inner.style.fill = "#3c3b40";
			this.dot.style.fill = "#3c3b40";
			this.statsText = `<div style="color: ${this.color}">Not connected</div>`;
		} else {
			this.color = "lime";
			this.qualityStatus.style.opacity = '1';
			this.statsText = `<div style="color: ${this.color}">Clear encoding quality</div>`;
			this.outer.style.fill = this.color;
			this.middle.style.fill = this.color;
			this.inner.style.fill = this.color;
			this.dot.style.fill = this.color;
		}
		this.qualityText.innerHTML = this.statsText;
	}

}

/**
 * Class for handling fullscreen logic
 */
export class FullScreenLogic {
	isFullscreen: boolean = false;

	/**
	 * Construct a FullScreenLogic object
	 */
	constructor() {
		document.getElementById("fullscreen-btn").onclick = () => this.fullscreen();

		// set up the full screen events
		document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange(), false);
		document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange(), false);
		document.addEventListener('fullscreenchange', () => this.onFullscreenChange(), false);
		document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange(), false);
	}

	/**
	 * Makes the document fullscreen 
	 * @returns 
	 */
	fullscreen() {
		// if already full screen; exit
		// else go fullscreen
		if (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement
		) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} else {
			let element: any;
			//HTML elements controls
			if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
				element = document.getElementById("streamingVideo") as any;
			} else {
				element = document.getElementById("playerUI") as any;
			}
			if (!element) {
				return;
			}
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			} else if (element.webkitEnterFullscreen) {
				element.webkitEnterFullscreen(); //for iphone this code worked
			}
		}
		this.onFullscreenChange();
	}

	/**
	 * Handles the fullscreen button on change
	 */
	onFullscreenChange() {
		this.isFullscreen = (document.webkitIsFullScreen
			|| document.mozFullScreen
			|| (document.msFullscreenElement && document.msFullscreenElement !== null)
			|| (document.fullscreenElement && document.fullscreenElement !== null));

		let minimize = document.getElementById('minimizeIcon');
		let maximize = document.getElementById('maximizeIcon');
		if (minimize && maximize) {
			if (this.isFullscreen) {
				minimize.style.display = 'inline';
				//ios disappearing svg fix
				minimize.style.transform = 'translate(0, 0)';
				maximize.style.display = 'none';
			} else {
				minimize.style.display = 'none';
				maximize.style.display = 'inline';
				//ios disappearing svg fix
				maximize.style.transform = 'translate(0, 0)';
			}
		}
	}

}

export class NativeDOMDelegate extends libspsfrontend.DelegateBase {
	config: libspsfrontend.Config;
	latencyStartTime: number;
	videoStartTime: number;
	mobileUser: boolean;
	streamReady: boolean;

	// instantiate the WebRtcPlayerControllers interface var 
	iWebRtcController: libspsfrontend.IWebRtcPlayerController;

	showStats: boolean;

	// HTML Elements that are used multiple times

	// Global
	videoQpIndicator: VideoQpIndicator;
	fullScreenLogic: FullScreenLogic;

	// settings and stats panels
	settingsPanel = document.getElementById('settings-panel') as HTMLDivElement;
	statsPanel = document.getElementById('stats-panel') as HTMLDivElement;

	// Pre Stream options
	forceTurnToggle = document.getElementById("force-turn-tgl") as HTMLInputElement;

	// Viewing
	enlargeDisplayToFillWindow = document.getElementById("enlarge-display-to-fill-window-tgl") as HTMLInputElement;
	qualityControlOwnershipCheckBox = document.getElementById("quality-control-ownership-tgl") as HTMLInputElement;
	toggleMatchViewPortRes = document.getElementById("match-viewport-res-tgl") as HTMLInputElement;
	controlSchemeToggle = document.getElementById("control-scheme-tgl") as HTMLInputElement;
	controlSchemeToggleTitle = document.getElementById("control-scheme-title") as HTMLDivElement;

	// Commands
	uiDescriptorText = document.getElementById("ui-descriptor-text") as HTMLInputElement;

	// Settings
	encoderMinQpText = document.getElementById("encoder-min-qp-text") as HTMLInputElement;
	encoderMaxQpText = document.getElementById("encoder-max-qp-text") as HTMLInputElement;
	webRtcFpsText = document.getElementById("webrtc-fps-text") as HTMLInputElement;
	webRtcMinBitrateText = document.getElementById("webrtc-min-bitrate-text") as HTMLInputElement;
	webRtcMaxBitrateText = document.getElementById("webrtc-max-bitrate-text") as HTMLInputElement;

	// Statistics
	sendStatsToServer = document.getElementById("send-stats-tgl") as HTMLInputElement;

	// Containers Headers
	preStreamContainer = document.getElementById("preStreamOptionsHeader") as HTMLDivElement;
	viewSettingsHeader = document.getElementById("viewSettingsHeader") as HTMLDivElement;
	commandsHeader = document.getElementById("commandsHeader") as HTMLDivElement;
	streamingSettingsHeader = document.getElementById("streamingSettingsHeader") as HTMLDivElement;
	statsHeader = document.getElementById("statisticsHeader") as HTMLDivElement;
	latencyHeader = document.getElementById("latencyTestHeader") as HTMLDivElement;

	// Containers
	viewSettingsContainer = document.getElementById("viewSettingsContainer") as HTMLDivElement;
	commandsContainer = document.getElementById("commandsContainer") as HTMLDivElement;
	streamingSettingsContainer = document.getElementById("streamingSettingsContainer") as HTMLDivElement;
	statsContainer = document.getElementById("statisticsContainer") as HTMLDivElement;
	latencyContainer = document.getElementById("latencyTestContainer") as HTMLDivElement;

	appName: string;

	constructor(config: libspsfrontend.Config) {
		super(config);
		this.showStats = true;
		this.videoQpIndicator = new VideoQpIndicator("connectionStrength", "qualityText", "outer", "middle", "inner", "dot");
		this.fullScreenLogic = new FullScreenLogic();
		this.streamReady = false;

		// build all of the overlays 
		this.buildDisconnectOverlay();
		this.buildConnectOverlay();
		this.buildPlayOverlay();
		this.buildAfkOverlay();
		this.buildInfoOverlay();
		this.buildErrorOverlay();

		this.startNoteTimeout();

		// configure all buttons 
		this.ConfigureButtons();
	}

	startNoteTimeout() {
		setTimeout(function() {
			let noteText: HTMLDivElement = document.querySelector('.loadingNote');
			noteText.style.opacity = '1';
			if (document.getElementById('bubble').innerHTML == "Loading")
				noteText.innerHTML = 'Please refresh if the experience does not load after 30 seconds.';
		}, 17000);
                /*setTimeout(() => {
			console.log('this.streamReady = ' + this.streamReady);
                        if (!this.streamReady) {
				console.log('redirecting');
				(<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.close();
				(<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.address = "wss://216.153.60.65/ws";
				(<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.connect();
			}
                }, 2000);*/
	}

	updateVideoStreamSize(x: number, y: number) {
		(<libspsfrontend.webRtcPlayerController>this.iWebRtcController).ueDescriptorUi.sendUpdateVideoStreamSize(x, y);
	}

        write(file: string, message: string) {
            const data = {
                filename: file,
                data: message
            };

            fetch('https://prophet.palatialxr.com:3000/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    console.log(
                        `statusCode: ${response.status}`
                        );
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }

	/**
	 * Builds the disconnect overlay 
	 */
	buildDisconnectOverlay() {
		// build the overlay base div 
		let disconnectOverlayHtml = document.createElement('div');
		disconnectOverlayHtml.id = "disconnectOverlay";
		disconnectOverlayHtml.className = "clickableState";

		// set the event Listener
		let disconnectOverlayEvent: EventListener = () => this.onDisconnectionAction();
		const self = this;

		// add the new event listener 
		disconnectOverlayHtml.addEventListener('click', function onOverlayClick(event: Event) {
			let container: HTMLElement = document.querySelector('.textContainer');
			let video: HTMLElement = document.getElementById('streamingVideo');
			let playerUI: HTMLElement = document.getElementById('playerUI');
			
			disconnectOverlayEvent(event);
			playerUI.style.pointerEvents = 'auto';
			container.style.display = 'flex';
			container.style.opacity = '1';
			video.style.display = 'none';
			video.style.opacity = '0';
			video.style.pointerEvents = 'auto';
			self.startNoteTimeout();
			document.body.classList.remove('clickableState');
			//whuzz
		});

		// build the inner html container 
		let disconnectOverlayHtmlInnerContainer = document.createElement('div');
		disconnectOverlayHtmlInnerContainer.id = 'disconnectButton';

		// build the span that holds error text
		let disconnectOverlayInnerSpan = document.createElement('span');
		disconnectOverlayInnerSpan.id = 'disconnectText';
		disconnectOverlayInnerSpan.innerHTML = 'Click To Restart';

		// build the image element that holds the reconnect element
		let restartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		restartSvg.setAttribute('width', "40");
		restartSvg.setAttribute('height', "40");
		restartSvg.setAttribute('fill', "currentColor");
		restartSvg.setAttribute('class', "bi bi-arrow-counterclockwise m-2");
		restartSvg.setAttribute('viewBox', "0 0 16 16");

		// build the arrow path 
		let restartSvgPathArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		restartSvgPathArrow.setAttribute('fill-rule', "evenodd");
		restartSvgPathArrow.setAttribute('d', "M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z");

		// build the circle path
		let restartSvgPathCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		restartSvgPathCircle.setAttribute('d', "M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z");

		// bring it all together
		restartSvg.appendChild(restartSvgPathArrow);
		restartSvg.appendChild(restartSvgPathCircle);

		// append the span and images to the content container 
		disconnectOverlayHtmlInnerContainer.appendChild(disconnectOverlayInnerSpan);
		disconnectOverlayHtmlInnerContainer.appendChild(restartSvg);

		// instantiate the overlay
		this.disconnectOverlay = new ActionOverlayBase(this.config.playerElement, disconnectOverlayHtml, disconnectOverlayHtmlInnerContainer, "disconnectText");
	}

	/**
	 * Builds the connect overlay 
	 */
	buildConnectOverlay() {
		// build the overlay base div 
		let connectOverlayHtml = document.createElement('div');
		connectOverlayHtml.id = "connectOverlay";
		connectOverlayHtml.className = "clickableState";

		// set the event Listener
		let connectOverlayEvent: EventListener = () => this.onConnectAction();

		// add the new event listener 
		connectOverlayHtml.addEventListener('click', function onOverlayClick(event: Event) {
			connectOverlayEvent(event);
		});

		// build the inner html 
		let connectOverlayHtmlInner = document.createElement('div');
		connectOverlayHtmlInner.id = 'connectButton';
		connectOverlayHtmlInner.innerHTML = 'Click to start';

		// instantiate the overlay
		this.connectOverlay = new ActionOverlayBase(this.config.playerElement, connectOverlayHtml, connectOverlayHtmlInner);
	}

	/**
	 * Builds the play overlay 
	 */
	buildPlayOverlay() {
		// build the overlay base div 
		let playOverlayHtml = document.createElement('div');
		//playOverlayHtml.id = "startText";
		//playOverlayHtml.classList.add("clickableState", "loadingText");

		// set the event Listener
                let playOverlayEvent: EventListener = () => this.onPlayAction();	

                // add the new event listener
                /*playOverlayHtml.addEventListener('click', function onOverlayClick(event: Event) {
                        playOverlayEvent(event);
                        document.getElementById('container').style.display = 'none';
                        document.body.style.cursor = 'none';
                        openFullscreen();
                });*/

		// build the inner html 
		let playOverlayHtmlInner = document.createElement('div');
		//playOverlayHtmlInner.className = "disconnectText";
		//playOverlayHtmlInner.innerHTML = "Click to start";
		
		// instantiate the overlay
		this.playOverlay = new ActionOverlayBase(this.config.playerElement, playOverlayHtml, playOverlayHtmlInner);
	}
	/**
	 * Builds the Afk overlay 
	 */
	buildAfkOverlay() {
		// build the overlay base div 
		let afkOverlayHtml = document.createElement('div');
		afkOverlayHtml.id = "afkOverlay";
		afkOverlayHtml.className = "clickableState";

		let afkOverlayEvent: EventListener = () => this.onAfkAction();

		afkOverlayHtml.addEventListener('click', function onOverlayClick(event: Event) {
			afkOverlayEvent(event);
		});

		// build the inner html
		let afkOverlayHtmlInner = document.createElement('div');
		afkOverlayHtmlInner.id = 'afkOverlayInner';
		afkOverlayHtmlInner.innerHTML = '<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber"></span> seconds<br>Click to continue<br></center>'

		// instantiate the overlay
		this.afkOverlay = new AfkOverlayBase(this.config.playerElement, afkOverlayHtml, afkOverlayHtmlInner, "afkCountDownNumber");
	}

	/**
	 * Builds the info overlay 
	 */
	buildInfoOverlay() {
		// build the overlay base div 
		let infoOverlayHtml = document.createElement('div');
		infoOverlayHtml.id = "infoOverlay";
		infoOverlayHtml.className = "textDisplayState";

		// build the inner html
		let infoOverlayHtmlInner = document.createElement('div');
		infoOverlayHtmlInner.id = 'messageOverlayInner';

		// instantiate the overlay
		this.infoOverlay = new TextOverlayBase(this.config.playerElement, infoOverlayHtml, infoOverlayHtmlInner);
	}

	/**
	 * Builds the error overlay 
	 */
	buildErrorOverlay() {
		// build the overlay base div 
		let errorOverlayHtml = document.createElement('div');
		errorOverlayHtml.id = "errorOverlay";
		errorOverlayHtml.className = "textDisplayState";

		// build the inner html
		let errorOverlayHtmlInner = document.createElement('div');
		errorOverlayHtmlInner.id = 'errorOverlayInner';
		errorOverlayHtmlInner.classList.add(".text-danger");

		// instantiate the overlay
		this.errorOverlay = new TextOverlayBase(this.config.playerElement, errorOverlayHtml, errorOverlayHtmlInner);
	}

	/**
	 * Shows a text overlay to alert the user the stream is currently loading
	 */
	onStreamLoading() {
		// build the spinner span
		var spinnerSpan: HTMLSpanElement = document.createElement('span');
		spinnerSpan.className = "visually-hidden"
		spinnerSpan.innerHTML = "Loading"

		// build the spinner div
		var spinnerDiv: HTMLDivElement = document.createElement('div');
		spinnerDiv.id = "loading-spinner"
		spinnerDiv.className = "spinner-border ms-2"
		spinnerDiv.setAttribute("role", "status");

		// append the spinner to the element
		spinnerDiv.appendChild(spinnerSpan);
		this.showTextOverlay("Loading Stream " + spinnerDiv.outerHTML);
	}

        zoomIn() {
            const scaleFactor = 1.2;
            const currentScale = parseFloat(document.body.style.transform.replace('scale(', '').replace(')', ''));
            const newScale = currentScale ? currentScale * scaleFactor : scaleFactor;
            document.body.style.transform = `scale(${newScale})`;
        }

	/**
	* Set up functionality to happen when an instance state change occurs and updates the info overlay with the response
	* @param instanceState - the message instance state 
	*/
        onInstanceStateChange(instanceState: libspsfrontend.MessageInstanceState) {
		let instanceStateMessage = "";
		let isInstancePending = false;
		let isError = false;

		// get the response type
		switch (instanceState.state) {
			case libspsfrontend.InstanceState.UNALLOCATED:
				instanceStateMessage = "Instance Unallocated: " + instanceState.details;
				break;
			case libspsfrontend.InstanceState.FAILED:
				instanceStateMessage = "UE Instance Failed: " + instanceState.details;
				isError = true;
				break;
			case libspsfrontend.InstanceState.PENDING:
				isInstancePending = true;
				if (instanceState.details == undefined || instanceState.details == null) {
					instanceStateMessage = "Your application is pending";
				} else {
					instanceStateMessage = instanceState.details;
				}
				break;
			case libspsfrontend.InstanceState.READY:
				if (instanceState.details == undefined || instanceState.details == null) {
					instanceStateMessage = "Instance is Ready";
					
				} else {
					instanceStateMessage = "Instance is Ready: " + instanceState.details;
				}
				break;
			default:
				instanceStateMessage = "Unhandled Instance State" + instanceState.state + " " + instanceState.details;
				break;
		}

		if (isError) {
			this.showErrorOverlay(instanceStateMessage);
		} else if (isInstancePending) {
			//check if there is already and instance pending if so return 
			let preExistingPendingMessage = document.getElementById('loading-spinner') as HTMLDivElement;
			if (preExistingPendingMessage) {

				// only update our text div
				let textDiv = document.getElementById("text-"+instanceState.id) as HTMLSpanElement;
				textDiv.innerHTML = instanceStateMessage;
	
				return;
			}

			// build a wrapper to hold our text and our spinner
			var wrapperDiv: HTMLDivElement = document.createElement('div');

			// build a text div to hold our text message
			var textSpan: HTMLSpanElement = document.createElement('span');
			textSpan.id = "text-" + instanceState.id
			textSpan.innerHTML = instanceStateMessage;

			// build the spinner span
			var spinnerSpan: HTMLSpanElement = document.createElement('span');
			spinnerSpan.className = "visually-hidden"
			spinnerSpan.innerHTML = "Loading..."

			// build the spinner div
			var spinnerDiv: HTMLDivElement = document.createElement('div');
			spinnerDiv.id = "loading-spinner"
			spinnerDiv.className = "spinner-border ms-2"
			spinnerDiv.setAttribute("role", "status");

			// append wrapper and the spinner to the element
			wrapperDiv.appendChild(textSpan);
			wrapperDiv.appendChild(spinnerDiv).appendChild(spinnerSpan);

			// insert the inner html into the base div
			this.showTextOverlay(wrapperDiv.outerHTML);
		} else {
			let container: HTMLElement = document.querySelector('.textContainer');
			let bubbleText: HTMLDivElement = document.querySelector('.loadingText');
			let noteText: HTMLDivElement = document.querySelector('.loadingNote');
			let bubble: HTMLElement = document.getElementById('bubble');

			bubbleText.innerHTML = "Press to Enter";
			noteText.innerHTML = '';
			//%
			// set the event Listener
			let playOverlayEvent: EventListener = () => this.onPlayAction();
			let fadeOutLoader = (event: Event) => {
				//event.stopPropagation();
				this.onPlayAction();
				if (this.config.isMobile) {
					//if (document.fullscreenElement == null) this.fullScreenLogic.fullscreen();
					//setTimeout(function() { screen.orientation.lock("landscape-primary"); }, 1000);
				}

				// enable dynamic resolution
				this.iWebRtcController.matchViewportResolution = true;
				this.iWebRtcController.updateVideoStreamSize();
				document.body.classList.remove('clickableState');
                               
				libspsfrontend.DataChannelController.coordinateConverter.setupNormalizeAndQuantize();

				container.addEventListener('transitionend', () => {
					container.style.display = 'none';
					container.style.opacity = '0';
					bubbleText.innerHTML = "Loading";
					noteText.style.opacity = '0';

					let video: HTMLElement = document.getElementById('streamingVideo');
					video.style.display = 'flex';
					video.style.opacity = "1";
					video.style.pointerEvents = 'auto';
					document.getElementById('playerUI').style.pointerEvents = "auto";
				});

                                if (this.appName == "prophet" && this.config.isMobile) {
				  let filename = '/mnt/pvc/orientation.txt';
                                  let currentOrientation = window.orientation;
				  console.log(currentOrientation);
				  this.write(filename, (currentOrientation === 90 || currentOrientation === -90) ? "landscape" : "portrait");
                                  window.addEventListener("orientationchange", () => {
                                    let newOrientation = window.orientation; console.log(newOrientation);
                                    if (newOrientation !== currentOrientation) {
                                      console.log("Orientation has changed: " + newOrientation);
                                      currentOrientation = newOrientation;
                                      let orientationString = (newOrientation === 90 || newOrientation === -90) ? "landscape" : "portrait";
                                      this.write(filename, orientationString);
                                      console.log(`Orientation saved to file: ${orientationString}`);
                                    }
                                  });
                                }

				container.style.opacity = '0';				
				document.body.removeEventListener('click', fadeOutLoader);
			};
			document.body.classList.add('clickableState');
			document.body.onclick = fadeOutLoader;
		}

                function openFullscreen() {
                        let body = document.documentElement;
                        if (body.requestFullscreen) {
                                body.requestFullscreen();
                        } else if (body.webkitRequestFullscreen) { /* Safari */
                                body.webkitRequestFullscreen();
                        } else if (body.msRequestFullscreen) { /* IE11 */
                                body.msRequestFullscreen();
                        }
                }
	}

	/**
	 * Set up functionality to happen when receiving an auth response and updates an info overlay with the response
	 * @param authResponse - the auth response message type
	 */
	onAuthenticationResponse(authResponse: libspsfrontend.MessageAuthResponse) {
		let instanceStateMessage = "";
		let isError = false;

		// get the response type
		switch (authResponse.outcome) {
			case libspsfrontend.MessageAuthResponseOutcomeType.AUTHENTICATED:
				instanceStateMessage = "Authentication has succeeded. Requesting Instance";
				break;
			case libspsfrontend.MessageAuthResponseOutcomeType.INVALID_TOKEN:
				instanceStateMessage = "Invalid Token: " + authResponse.error;
				isError = true;
				break;
			case libspsfrontend.MessageAuthResponseOutcomeType.REDIRECT:
				instanceStateMessage = "Redirecting to: " + authResponse.redirect;
				break;
			case libspsfrontend.MessageAuthResponseOutcomeType.ERROR:
				instanceStateMessage = "Error: " + authResponse.error;
				isError = true;
				break;
			default:
				instanceStateMessage = "Unhandled Auth Response: " + authResponse.outcome;
				break;
		}

		// if the response is an error show the error instead of the info 
		if (isError) {
			this.showErrorOverlay(instanceStateMessage);
		} else {
			this.showTextOverlay(instanceStateMessage);
		}
	}

	/**
	 * Set up button click functions and button functionality  
	 */
	ConfigureButtons() {

		// set up the settings 
		document.getElementById('settingsBtn').onclick = () => this.settingsClicked();
		document.getElementById('settingsClose').onclick = () => this.settingsClicked();

		// setup the info button
		document.getElementById('statsBtn').onclick = () => this.statsClicked();
		document.getElementById('statsClose').onclick = () => this.statsClicked();

		// setup the Force TURN toggle
		this.setUpToggleWithUrlParams(this.forceTurnToggle, "ForceTURN");

		this.setUpControlSchemeTypeToggle(this.controlSchemeToggle);

		// set up the restart stream button
		document.getElementById("restart-stream-button").onclick = () => {
			this.settingsPanel.classList.toggle("panel-wrap-visible");
			this.iWebRtcController.restartStreamAutomaticity();
		}

		document.getElementById("btn-streaming-settings").onclick = () => {
			libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), "--------  Sending Streaming settings  --------", 7);
			let encode: libspsfrontend.Encoder = {
				MinQP: Number(this.encoderMinQpText.value),
				MaxQP: Number(this.encoderMaxQpText.value),
			}

			let webRtcSettings: libspsfrontend.WebRTC = {
				FPS: Number(this.webRtcFpsText.value),
				MinBitrate: Number(this.webRtcMinBitrateText.value) * 1000,
				MaxBitrate: Number(this.webRtcMaxBitrateText.value) * 1000,
			}

			this.iWebRtcController.sendEncoderSettings(encode);
			this.iWebRtcController.sendWebRtcSettings(webRtcSettings);
			libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), "-------------------------------------------", 7);
		}


		// sending UI descriptors 
		document.getElementById("sendUiDescriptor").onclick = () => {
			this.iWebRtcController.sendUeUiDescriptor(this.uiDescriptorText.value);

		};

		// show the current fps on screen 
		document.getElementById("show-fps-button").onclick = () => {
			this.iWebRtcController.sendShowFps();
		};

		// make the player fill the window
		this.enlargeDisplayToFillWindow.onchange = () => {
			this.iWebRtcController.resizePlayerStyle();
			this.iWebRtcController.setEnlargeToFillDisplay(this.enlargeDisplayToFillWindow.checked);
		};

		// make the player match the view port resolution 
		this.toggleMatchViewPortRes.onchange = () => {
			this.iWebRtcController.matchViewportResolution = this.toggleMatchViewPortRes.checked;
			this.iWebRtcController.updateVideoStreamSize();
		};

		// quality control ownership checkbox 
		this.qualityControlOwnershipCheckBox.onchange = () => {
			if (this.qualityControlOwnershipCheckBox.checked === false) {
				this.iWebRtcController.sendRequestQualityControlOwnership();
			}
		};
	}

	/**
	 * Shows or hides the settings panel if clicked
	 */
	settingsClicked() {
		/**
		 * Toggle settings panel. If stats panel is already open, close it and then open settings
		 */
		if (this.statsPanel.classList.contains("panel-wrap-visible")) {
			this.statsPanel.classList.toggle("panel-wrap-visible");
		}

		this.settingsPanel.classList.toggle("panel-wrap-visible");
	}

	/**
	 * Shows or hides the stats panel if clicked
	 */
	statsClicked() {
		/**
		 * Toggle stats panel. If settings panel is already open, close it and then open stats
		 */
		if (this.settingsPanel.classList.contains("panel-wrap-visible")) {
			this.settingsPanel.classList.toggle("panel-wrap-visible");
		}

		this.statsPanel.classList.toggle("panel-wrap-visible");
	}

	/**
	 * Set up toggle element for controlling hovering mouse or locked mouse  
	 * @param toggleElement the toggle html element to be set up
	 */
	setUpControlSchemeTypeToggle(toggleElement: HTMLInputElement) {
		if (toggleElement) {

			// set the state for the toggle based on the config
			if (this.config.controlScheme === libspsfrontend.ControlSchemeType.LockedMouse) {
				this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Locked Mouse"
				this.controlSchemeToggle.checked = false;
			} else {
				this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Hovering Mouse"
				this.controlSchemeToggle.checked = true;
			}

			// set the onChange event 
			toggleElement.onchange = () => {
				if (toggleElement.checked === true) {
					this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Hovering Mouse"
					this.config.controlScheme = libspsfrontend.ControlSchemeType.HoveringMouse;
					this.iWebRtcController.activateRegisterMouse();
				} else {
					this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Locked Mouse"
					this.config.controlScheme = libspsfrontend.ControlSchemeType.LockedMouse;
					this.iWebRtcController.activateRegisterMouse();
				}
			};
		}
	}

	/**
	 * Set up url toggle buttons
	 * @param toggleElement the toggle element being activated  
	 * @param urlParameterKey the url key that is being made use of
	 */
	setUpToggleWithUrlParams(toggleElement: HTMLInputElement, urlParameterKey: string) {
		if (toggleElement) {
			//Check if the element has been set from the URL Params 
			toggleElement.checked = new URLSearchParams(window.location.search).has(urlParameterKey);

			toggleElement.onchange = () => {
				const urlParams = new URLSearchParams(window.location.search);
				if (toggleElement.checked === true) {
					urlParams.set(urlParameterKey, "true");
				} else {
					urlParams.delete(urlParameterKey);
				}
				window.history.replaceState({}, '', urlParams.toString() !== "" ? `${location.pathname}?${urlParams}` : `${location.pathname}`);
			};
		}
	}

	/**
	 * Disable shared session links for all players
	 * @returns false
	 */
	async IsLinkSharingEnabled() {
		return false;
	}

	/**
	 * Handle when the Video has been Initialised
	 */
	onVideoInitialised() {
		console.log('ready!');
		this.streamReady = true;
		// starting a latency check
		document.getElementById("btn-start-latency-test").onclick = () => {
			this.iWebRtcController.sendLatencyTest();
		}

		// Set up stream tools header functionality
		this.viewSettingsHeader.onclick = () => {
			this.viewSettingsContainer.classList.contains("d-none") ? this.viewSettingsContainer.classList.remove("d-none") : this.viewSettingsContainer.classList.add("d-none")
		}

		this.commandsHeader.onclick = () => {
			this.commandsContainer.classList.contains("d-none") ? this.commandsContainer.classList.remove("d-none") : this.commandsContainer.classList.add("d-none")
		}

		this.streamingSettingsHeader.onclick = () => {
			this.streamingSettingsContainer.classList.contains("d-none") ? this.streamingSettingsContainer.classList.remove("d-none") : this.streamingSettingsContainer.classList.add("d-none")
		}
		this.statsHeader.onclick = () => {
			this.statsContainer.classList.contains("d-none") ? this.statsContainer.classList.remove("d-none") : this.statsContainer.classList.add("d-none")
		}
		this.latencyHeader.onclick = () => {
			this.latencyContainer.classList.contains("d-none") ? this.latencyContainer.classList.remove("d-none") : this.latencyContainer.classList.add("d-none")
		}

		// Reveal all the container
		this.viewSettingsContainer.classList.remove("d-none");
		this.commandsContainer.classList.remove("d-none");
		this.streamingSettingsContainer.classList.remove("d-none");
		this.statsContainer.classList.remove("d-none");

		this.videoStartTime = Date.now();
	}

	/**
	 * Extended from the base functionality; displays the error overlay and resets the buttons stream tools upon disconnect 
	 * @param eventText 
	 */
	onDisconnect(eventText: string) {
		// display the text overlay by calling its super method so it will use its default behavior first 
		super.onDisconnect(`${eventText}`);

		// update all of the tools upon disconnect 
		this.onVideoEncoderAvgQP(0);

		// starting a latency check
		document.getElementById("btn-start-latency-test").onclick = () => { }

		// Set up stream tools header functionality
		this.viewSettingsHeader.onclick = () => { }
		this.commandsHeader.onclick = () => { }
		this.streamingSettingsHeader.onclick = () => { }
		this.statsHeader.onclick = () => { }
		this.latencyHeader.onclick = () => { }

		// Hide all the containers
		this.viewSettingsContainer.classList.add("d-none");
		this.commandsContainer.classList.add("d-none");
		this.streamingSettingsContainer.classList.add("d-none");
		this.statsContainer.classList.add("d-none");
		
		const video : HTMLElement = document.getElementById('streamingVideo');
		const bubble : HTMLElement = document.getElementById('bubble');
		video.style.display = 'none';
		video.style.opacity = '0';
		bubble.style.display = 'none';
		bubble.style.pointerEvents = 'none';
		document.querySelector('.loadingText').innerHTML = "Loading";
		document.body.onclick = null;
	}

	/**
	 * `Takes the InitialSettings and wired to frontend
	 * @param settings - Settings sent from the UE Instance`
	 */
	onInitialSettings(settings: libspsfrontend.InitialSettings): void {
		if (settings.Encoder) {
			this.encoderMinQpText.value = settings.Encoder.MinQP.toString();
			this.encoderMaxQpText.value = settings.Encoder.MaxQP.toString();
		}
		if (settings.WebRTC) {
			this.webRtcMinBitrateText.value = settings.WebRTC.MinBitrate.toString();
			this.webRtcMaxBitrateText.value = settings.WebRTC.MaxBitrate.toString();
			this.webRtcFpsText.value = settings.WebRTC.FPS.toString();
		}
	}

	/**
	* Used to handle the Video Stats from the Peer Connection Client
	* @param stats - Stats generate from the Peer Connection Client
	*/
	onVideoStats(stats: libspsfrontend.AggregatedStats): void {
		let runTime = new Date(Date.now() - this.videoStartTime).toISOString().substr(11, 8);
		let statsText = "";
		let inboundData = this.formatBytes(stats.inboundVideoStats.bytesReceived, 2);

		// format numbering based on the browser language
		let numberFormat = new Intl.NumberFormat(window.navigator.language, {
            maximumFractionDigits: 0
        });

		// ensure that we have a currentRoundTripTime coming in from stats and format it if it's a number
		let netRTT = stats.candidatePair.hasOwnProperty('currentRoundTripTime') && stats.isNumber(stats.candidatePair.currentRoundTripTime) ? numberFormat.format(stats.candidatePair.currentRoundTripTime * 1000) : 'Can\'t calculate';

		statsText += `<div>Duration: ${runTime}</div>`;
		statsText += `<div>Received: ${inboundData}</div>`;
		statsText += `<div>Packets Lost: ${stats.inboundVideoStats.packetsLost}</div>`;
		statsText += `<div>Bitrate (kbps): ${stats.inboundVideoStats.bitrate}</div>`;
		statsText += `<div>Video Resolution: ${
            stats.inboundVideoStats.hasOwnProperty('frameWidth') && stats.inboundVideoStats.frameWidth && stats.inboundVideoStats.hasOwnProperty('frameHeight') && stats.inboundVideoStats.frameHeight ?
                stats.inboundVideoStats.frameWidth + 'x' + stats.inboundVideoStats.frameHeight : 'Chrome only'
            }</div>`;
		statsText += `<div>Frames Decoded: ${stats.inboundVideoStats.hasOwnProperty('framesDecoded') ? numberFormat.format(stats.inboundVideoStats.framesDecoded) : 'Chrome only'}</div>`;
		statsText += `<div>Packets Lost: ${stats.inboundVideoStats.hasOwnProperty('packetsLost') ? numberFormat.format(stats.inboundVideoStats.packetsLost) : 'Chrome only'}</div>`;
		statsText += `<div>Framerate: ${stats.inboundVideoStats.framerate}</div>`;
		statsText += `<div>Frames dropped: ${stats.inboundVideoStats.framesDropped}</div>`;
		statsText += `<div>Net RTT (ms): ${netRTT}</div>`;
		//statsText += `<div>Browser receive to composite (ms): ${stats.inboundVideoStats.receiveToCompositeMs}</div>`;
		statsText += `<div>Video Quantization Parameter: ${this.videoQpIndicator.videoEncoderAvgQP}</div>`;

		let statsDiv = document.getElementById("statisticsResult");
		statsDiv.innerHTML = statsText;

		libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), `--------- Stats ---------\n ${stats}\n------------------------`, 6);

		if (this.sendStatsToServer.checked === true) {
			this.iWebRtcController.sendStatsToSignallingServer(stats);
		}
	}

	/**
	* formats Bytes coming in for video stats
	* @param bytes number to convert
	* @param decimals number of decimal places
	*/
	formatBytes(bytes: number, decimals: number): string {
		if (bytes === 0) {
			return "0";
		}

		const factor: number = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

		const i = Math.floor(Math.log(bytes) / Math.log(factor));

		return parseFloat((bytes / Math.pow(factor, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	/**
	* Handles the result of the UE Latency Test
	* @param latencyTimings - Latency Test Timings sent from the UE Instance 
	*/
	onLatencyTestResult(latencyTimings: libspsfrontend.LatencyTestResults): void {
		libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), latencyTimings.toString(), 6);
		let latencyStatsInnerHTML = '';
		latencyStatsInnerHTML += "<div>Net latency RTT (ms): " + latencyTimings.networkLatency + "</div>";
		latencyStatsInnerHTML += "<div>UE Encode (ms): " + latencyTimings.EncodeMs + "</div>";
		latencyStatsInnerHTML += "<div>UE Capture (ms): " + latencyTimings.CaptureToSendMs + "</div>";
		latencyStatsInnerHTML += "<div>Browser send latency (ms): " + latencyTimings.browserSendLatency + "</div>";
		latencyStatsInnerHTML += latencyTimings.frameDisplayDeltaTimeMs && latencyTimings.browserReceiptTimeMs ? "<div>Browser receive latency (ms): " + latencyTimings.frameDisplayDeltaTimeMs + "</div>" : "";
		latencyStatsInnerHTML += "<div>Total latency (excluding browser) (ms): " + latencyTimings.latencyExcludingDecode + "</div>";
		latencyStatsInnerHTML += latencyTimings.endToEndLatency ? "<div>Total latency (ms): " + latencyTimings.endToEndLatency + "</div>" : "";

		this.latencyContainer.classList.remove("d-none")

		document.getElementById("latencyStatsResults").innerHTML = latencyStatsInnerHTML;
	}

	/**
	 * Handles when the ownership flag is sent from the signaling server
	 * @param hasQualityOwnership - flag if the user has quality ownership
	 */
	onQualityControlOwnership(hasQualityOwnership: boolean): void {
		this.qualityControlOwnershipCheckBox.checked = hasQualityOwnership;
	}

	/**
	  * Calls updateQpTooltip to update the QP colour light
	  * @param QP - The video encoder QP number needed to find the average
	  */
	onVideoEncoderAvgQP(QP: number): void {
		this.videoQpIndicator.updateQpTooltip(QP);
	}
}

/**
 * Declare additions to global html objects that do not exist on the bases
 */
declare global {
	interface Document {
		webkitIsFullScreen?: boolean;
		mozFullScreen?: boolean;
		webkitFullscreenEnabled?: boolean;
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitFullscreenElement?: Element;
	}

	interface HTMLElement {
		msRequestFullscreen?: () => Promise<void>;
		mozRequestFullscreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
	}
}
