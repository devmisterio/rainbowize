# Rainbowize
Rainbowize is a command-line utility that allows you to add colorful and text effects to input text, creating a rainbow-like visual effect. It provides options to choose different color schemes and apply bold or italic effects to the text. The utility reads input from stdin and outputs the formatted text to stdout.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Color Schemes](#available-color-schemes)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation
To use Rainbowize, you need to have Node.js installed on your machine. If you haven't already, you can download and install it from the [official Node.js website](https://nodejs.org/).
1. Open your terminal or command prompt.
2. Run the following command to install **Rainbowize** globally:

```sh
npm install -g rainbowize
```

This will make the **rainbowize** command available globally in your terminal.

Now you're ready to use **Rainbowize** for colorful and text effect transformations!

## Usage
Rainbowize CLI is designed to work with pipes. Here's the basic usage:
```sh
<cmd> | rainbowize [options]
```

**Options:**
 - **-s**, **--scheme <scheme>**: Choose a custom color scheme for rainbowizing. Available options are listed in the [Available Color Schemes](#available-color-schemes) section.
 - **-b**, **--bold**: Apply bold text effect.
 - **-i**, **--italic**: Apply italic text effect.
 - **-h**, **--help**: Show usage information.

## Available Color Schemes
Rainbowize CLI provides the following custom color schemes to choose from:
- **angura**
- **bohemia**
- **ruri**

## Examples
1. Basic usage with default settings:
```sh
echo "Hello, Rainbowize!" | rainbowize
```

2. Applying bold effect and using a specific color scheme:
```sh
echo "Colorful and bold!" | rainbowize -b -s angura
```

3. Using an input file with appyling italic effect:
```sh
cat input.txt | rainbowize -i
```

## Contributing
Contributions are welcome! If you find a bug or have an idea for improvement, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

## License
This project is licensed under the GNU GPL. See the [LICENSE](LICENSE) file for details.