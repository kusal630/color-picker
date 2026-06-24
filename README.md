# color-picker

# Color Scheme Generator

A simple web app that generates beautiful color palettes using a GET request to a color scheme API. Users can choose a base color, select a scheme mode, set how many colors they want, and fetch a matching color scheme instantly. [web:3][web:9]

## Features

- Fetches color palettes from an external API using the GET method. [web:3][web:9]
- Select a base color to generate a matching scheme. [web:3]
- Choose different scheme modes such as monochrome, analogic, triad, and more. [web:3]
- Set the number of colors you want in the generated palette. [web:9]
- Displays the generated colors in a clean and simple UI.
- Great for designers, developers, and anyone working with color combinations.

## Demo

Add your live project link here:

[Live Demo](#)

## Tech Stack

- HTML
- CSS
- JavaScript
- Fetch API
- Color Scheme API ([The Color API](https://www.thecolorapi.com)) [web:3]

## How It Works

The app sends a GET request to the color API with:
- A base color
- A selected scheme mode
- A color count

Example API request: [web:9]

```js
fetch(`https://www.thecolorapi.com/scheme?hex=0047AB&mode=analogic&count=5`)
  .then(response => response.json())
  .then(data => console.log(data))
```

The API then returns a set of colors based on the selected options, which are rendered in the UI. [web:3][web:9]

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/color-scheme-generator.git
```

2. Open the project folder:

```bash
cd color-scheme-generator
```

3. Open `index.html` in your browser  
or run it using a local development server such as VS Code Live Server.

## Usage

1. Pick a base color.
2. Select the scheme mode you want.
3. Enter or choose the number of colors.
4. Click the generate button.
5. View the fetched color palette on the screen.

## Supported Scheme Modes

Depending on the API, common modes include: [web:3]

- Monochrome
- Monochrome-dark
- Monochrome-light
- Analogic
- Complement
- Analogic-complement
- Triad
- Quad

## Project Structure

```bash
color-scheme-generator/
│── index.html
│── index.css
│── index.js
```

## Future Improvements

- Copy hex code on click
- Save favorite palettes
- Add light/dark UI theme
- Export palettes
- Add gradient preview

## What I Learned

This project helped me practice:
- Working with APIs using the GET method
- Using the Fetch API in JavaScript
- Handling JSON data
- Updating the DOM dynamically
- Building an interactive frontend project

## License

This project is open source and available under the MIT License.