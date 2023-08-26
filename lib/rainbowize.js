const { rainbowizeInput } = require("./utils/input");

/**
 * Represents the main application that orchestrates the rainbowize functionality.
 * This class handles the interaction between the CommandProcessor, ConfigManager, and rainbowizeInput.
 * @class Application
 */
class Application {
	/**
	 * Creates an instance of Application.
	 * @constructor
	 * @param {CommandProcessor} commandProcessor - An instance of the CommandProcessor class.
	 * @param {ConfigManager} configManager - An instance of the ConfigManager class.
	 */
	constructor(commandProcessor, configManager) {
		/**
		 * The CommandProcessor instance used for processing command-line arguments and input.
		 * @type {CommandProcessor}
		 */
		this.commandProcessor = commandProcessor;

		/**
		 * The ConfigManager instance used for loading configuration settings.
		 * @type {ConfigManager}
		 */
		this.configManager = configManager;
	}

	/**
	 * Runs the rainbowize application.
	 * This method coordinates the execution of the rainbowize process.
	 * @async
	 * @function run
	 */
	async run() {
		// Check if the input is from a TTY and provide user instructions if needed
		this.commandProcessor.handleTTYCheck();

		// Parse command-line arguments
		const parsedArgs = this.commandProcessor.parseArguments();

		// Load configuration settings
		const config = this.configManager.loadConfig();

		// Extract relevant settings from the configuration
		const { customScheme, defaultBold, defaultItalic } = config;

		// Create a reader for input
		const reader = this.commandProcessor.createInputReader();

		// Determine color scheme, bold, and italic settings based on arguments or defaults
		const scheme = parsedArgs.scheme || customScheme;
		const bold = parsedArgs.bold || defaultBold;
		const italic = parsedArgs.italic || defaultItalic;

		// Invoke the rainbowizeInput function to process and display colorized input
		await rainbowizeInput(reader, scheme, bold, italic);
	}
}

module.exports = { Application };
